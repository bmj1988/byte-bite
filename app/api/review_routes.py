from flask import Blueprint
from app.models import Review, db

review_routes = Blueprint('review', __name__)

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