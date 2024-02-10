from flask import Blueprint
from flask_login import current_user, login_required
from app.models import Review, db

review_routes = Blueprint('review', __name__)

# get reviews by restaurant_id
@review_routes.route('/<int:restaurant_id>')
def reviews_by_rest(restaurant_id):
  reviews_by_restaurant = db.session.query(Review).filter_by(restaurant_id=restaurant_id).all()

  if not reviews_by_restaurant:
    return {'message': "Restaurant couldn't be found"}

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
    return {'message': 'Current user does not have any reviews'}
  
  lst = list()
  dic = {"reviews": lst}
  for review in reviews_by_user_id:
    rev_entry = review.to_dict()
    lst.append(rev_entry)

  return dic