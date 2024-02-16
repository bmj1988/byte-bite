from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import Review, Restaurant, db
from ..forms import ReviewForm

review_routes = Blueprint('review', __name__)

# GET REVIEWS BY RESTAURANT ID /api/reviews/restaurant_id
@review_routes.route('/<int:restaurant_id>')
def reviews_by_rest(restaurant_id):
  restaurant = db.session.query(Restaurant).get(restaurant_id)
  if not restaurant:
    return {"message": "Restaurant could not be found"}
  reviews_by_restaurant = db.session.query(Review).filter_by(restaurant_id=restaurant_id).all()
  if not reviews_by_restaurant:
    return {"message": "Restaurant has no reviews"}
  lst = list()
  dic = {"reviews": lst}
  for review in reviews_by_restaurant:
    rev_entry = review.to_dict()
    lst.append(rev_entry)
  return dic

# GET CURRENT USER'S REVIEWS /api/reviews/current
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

# CREATE NEW REVIEW /api/reviews/restaurant_id
@review_routes.route('/<int:restaurant_id>', methods=['POST'])
@login_required
def post_review_by_user(restaurant_id):
  form = ReviewForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  restaurant = db.session.query(Restaurant).get(restaurant_id)
  already_reviewed = db.session.query(Review).filter_by(user_id=current_user.id, restaurant_id=restaurant_id).first()

  if not restaurant:
    return {'message': 'Restaurant could not be found'}

  if already_reviewed:
    return {'message': 'User already submitted review for this restaurant'}

  if restaurant.owner_id == current_user.id:
    return {'message': 'Cannot review your own restaurant'}

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

# UPDATE REVIEW /api/reviews/restaurant_id
@review_routes.route('/<int:restaurant_id>', methods=['PUT'])
@login_required
def edit_review(restaurant_id):
  form = ReviewForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  target = db.session.query(Review).filter_by(restaurant_id=restaurant_id, user_id=current_user.id).first()

  if target is None:
    return {'message': 'User has not reviewed this restaurant'}

  if target.user_id is not current_user.id:
    return {'message': 'Forbidden'}

  if form.validate_on_submit():
    data = form.data
    target.review=data['review']
    target.stars=data['stars']

    db.session.commit()
    return target.to_dict()
  return form.errors, 401

# DELETE REVIEW /api/reviews/restaurant_id
@review_routes.route('/<int:restaurant_id>', methods=['DELETE'])
@login_required
def delete_review(restaurant_id):
  target = db.session.query(Review).filter_by(restaurant_id=restaurant_id, user_id=current_user.id).first()
  restaurant = db.session.query(Restaurant).get(restaurant_id)

  if restaurant is None:
    return {"message": "Restaurant couldn't be found"}

  if target is None:
    return {'message': 'Review not found'}, 404

  if target.user_id is not current_user.id:
    return {'message': 'Forbidden'}, 403

  db.session.delete(target)
  db.session.commit()
  return {'message': 'Review deleted successfully'}, 200

@review_routes.route('/<int:restaurant_id>/scroller')
def paginate_reviews(restaurant_id):
  review_scroller = db.paginate(db.select(Review).where(Review.restaurant_id == restaurant_id), page=1, per_page=3)
  paginated_by_3_reviews = list()
  if not review_scroller:
    return {"msg": "error"}
  else:
    for review in review_scroller:
      paginated_by_3_reviews.append(review.to_dict())
    return {"reviews": paginated_by_3_reviews}
