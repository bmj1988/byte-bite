from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Restaurant, Category, db
from app.forms import RestaurantForm

restaurant_routes = Blueprint('restaurant', __name__)

@restaurant_routes.route('/')
def search():
    searchstring = request.args.get('search')
    print(request.data)
    name = f'%{searchstring}%'
    searched_restaurants = None
    if searchstring.isnumeric():
        print('THIS IS CATEGORY')
        searched_restaurants = db.session.query(Restaurant).filter(Restaurant.category_id == int(searchstring))
    else:
        print("THIS IS NAME")
        searched_restaurants = db.session.query(Restaurant).filter(Restaurant.name.ilike(name))
    lst = list()
    dic = {"restaurants": lst}
    for restaurant in searched_restaurants:
            rest_entry = restaurant.to_dict_main_page()
            rest_entry['Reviews'] = [review.to_dict() for review in restaurant.reviews]
            rest_entry['numReviews'] = len(rest_entry['Reviews'])
            lst.append(rest_entry)
    return dic

@restaurant_routes.route('/delivery')
def home():
    req_page = request.args.get('page')
    all_restaurants = Restaurant.query.paginate(page=int(req_page), per_page=12, count=True)
    lst = list()
    for restaurant in all_restaurants.items:
        if restaurant.delivery:
            rest_entry = restaurant.to_dict_main_page()
            rest_entry['Reviews'] = [review.to_dict() for review in restaurant.reviews]
            rest_entry['numReviews'] = len(rest_entry['Reviews'])
            lst.append(rest_entry)

    return {"restaurants": lst, "total": all_restaurants.total}

@restaurant_routes.route('/current')
@login_required
def current_user_restaurants():
    my_restaurants = db.session.query(Restaurant).filter(Restaurant.owner_id == current_user.id).all()
    lst = list()
    dic = {"restaurants": lst}
    for restaurant in my_restaurants:
        rest_entry = restaurant.to_dict()
        lst.append(rest_entry)
    return dic, 200

@restaurant_routes.route('/new', methods=['POST'])
@login_required
def new():
    form = RestaurantForm()
    response = {}
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data

        existing_name = db.session.query(Restaurant).filter_by(name=data['name']).first()
        existing_add = db.session.query(Restaurant).filter_by(address=data['address']).first()

        if existing_name:
            form.name.errors.append('Restaurant name already exists')

        if existing_add:
            form.address.errors.append('Restaurant address already exists')

        if not existing_add and not existing_name:
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
            return new_restaurant.to_dict(), 201
    errors = {}
    for field, error in form.errors.items():
        errors[field] = error[0]
    return {'error': errors}, 400

@restaurant_routes.route('/<int:id>')
def get_restaurant_by_id(id):
    restaurant = db.get_or_404(Restaurant, id)
    return restaurant.to_dict()

@restaurant_routes.route('/<string:name>')
def get_restaurant_details(name):
    restaurant = db.session.query(Restaurant).filter_by(name=name).first()
    if not restaurant:
        return {'ERROR': 'RESTAURANT NOT FOUND'}, 404
    return restaurant.to_dict()

@restaurant_routes.route('/<int:restaurant_id>', methods=['PUT'])
@login_required
def edit(restaurant_id):
    target = db.session.query(Restaurant).get(restaurant_id)

    if target is None:
        return {'message': 'Restaurant not found'}, 404

    if target.owner_id is not current_user.id:
        return {'message': 'Forbidden'}, 403

    form = RestaurantForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data

        existing_name = db.session.query(Restaurant).filter(Restaurant.name == data['name'], Restaurant.id != restaurant_id).first()
        existing_add = db.session.query(Restaurant).filter(Restaurant.address == data['address'], Restaurant.id != restaurant_id).first()

        if existing_name:
            form.name.errors.append('Restaurant name already exists')

        if existing_add:
            form.address.errors.append('Restaurant address already exists')

        if not existing_add and not existing_name:
            target.name = data['name']
            target.address = data['address']
            target.city = data['city']
            target.state = data['state']
            target.image = data['image']
            target.lat = data['lat']
            target.lng = data['lng']
            target.delivery = data['delivery']
            target.category_id = data['category_id']
            db.session.commit()
            return target.to_dict()
    return form.errors, 401

@restaurant_routes.route('/<int:restaurant_id>', methods=['DELETE'])
@login_required
def delete(restaurant_id):
    target = db.get_or_404(Restaurant, restaurant_id)

    if target.owner_id is not current_user.id:
        return {'message': 'Forbidden'}, 403

    db.session.delete(target)
    db.session.commit()

    return {'message': 'Restaurant deleted successfully'}, 200
