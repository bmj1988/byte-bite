from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import Review, Restaurant, db
from ..forms import ReviewForm

review_routes = Blueprint('review', __name__)

# get reviews by restaurant_id
@review_routes.route('/<int:restaurant_id>')
def reviews_by_rest(restaurant_id):
  reviews_by_restaurant = db.session.query(Review).filter_by(restaurant_id=restaurant_id).all()
  if not reviews_by_restaurant:
    return {"message": "Restaurant couldn't be found"}
  lst = list()
  dic = {"reviews": lst}
  for review in reviews_by_restaurant:
    rev_entry = review.to_dict()
    lst.append(rev_entry)
  return dic

# get reviews by current user
@review_routes.route('/current')
@login_required
def reviews_by_user():
  reviews_by_user_id = db.session.query(Review).filter_by(user_id=current_user.id).all()
  if not reviews_by_user_id:
    return {"message": "Current user does not have any reviews"}
  lst = list()
  dic = {"reviews": lst}
  for review in reviews_by_user_id:
    rev_entry = review.to_dict()
    lst.append(rev_entry)
  return dic

# create a new review by restaurant_id
@review_routes.route('/<int:restaurant_id>', methods=['POST'])
@login_required
def post_review_by_user(restaurant_id):
  form = ReviewForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  restaurant = Restaurant.query.filter_by(id=restaurant_id).first()
  already_reviewed = Review.query.filter_by(user_id=current_user.id, restaurant_id=restaurant_id).first()

  if not restaurant:
    return {'message': 'Restaurant could not be found'}
  
  if already_reviewed:
    return {'message': 'User already submitted review for this restaurant'}

  if form.validate_on_submit():
    data = form.data

    new_review = Review(
      review=data['review'],
      stars=data['stars'],
      user_id=current_user.id,
      restaurant_id=restaurant_id
    )
    db.session.add(new_review)
    db.session.commit()
    return new_review.to_dict(), 201

