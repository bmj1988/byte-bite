from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Restaurant, db
from app.forms import RestaurantForm

restaurant_routes = Blueprint('restaurant', __name__)


@restaurant_routes.route('/delivery')
def home():
    all_restaurants = db.session.query(Restaurant).filter(Restaurant.delivery).all()
    lst = list()
    dic = {"restaurants": lst}
    for restaurant in all_restaurants:
        rest_entry = restaurant.to_dict()
        lst.append(rest_entry)

    return dic

@restaurant_routes.route('/new', methods=['POST'])
@login_required
def new():
    form = RestaurantForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        new_restaurant = Restaurant(
            name=data['name'],
            address=data['address'],
            city=data['city'],
            state=data['state'],
            image=data['image'],
            lat=data['lat'],
            lng=data['lng'],
            delivery=data['delivery'],
            owner_id=current_user.id,
            category_id=data['category_id']
    )
        db.session.add(new_restaurant)
        db.session.commit()
        return new_restaurant.to_dict()
    return form.errors, 401

@restaurant_routes.route('/<string:name>')
def get_restaurant_details(name):
    restaurant = db.session.query(Restaurant).filter_by(name=name).first()

    if not restaurant:
        return {
            "message": "restaurant couldn't be found"
            }

    return restaurant.to_dict()
