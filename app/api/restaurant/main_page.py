from flask import Blueprint, jsonify
from app.models import Restaurant, db

restaurant_routes = Blueprint('restaurant', __name__)


@restaurant_routes.route('/delivery')
def home():
    all_restaurants = db.session.query(Restaurant).all()
    lst = list()
    dic = {"restaurants": lst}
    for restaurant in all_restaurants:
        rest_entry = restaurant.to_dict()
        lst.append(rest_entry)

    return dic
