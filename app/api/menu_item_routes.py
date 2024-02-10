from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import MenuItem, Restaurant, db
from app.forms import MenuItemForm

menu_item_routes = Blueprint('menu_item', __name__)

@menu_item_routes.route('/<int:restaurant_id>')
def get_menu_items_by_restaurant(restaurant_id):
    restaurant = db.session.query(MenuItem).filter_by(restaurant_id=restaurant_id).all()

    if not restaurant:
        return {
            "message": "restaurant couldn't be found"
            }
    lst = list()
    dic = {"MenuItems": lst}
    for menu_item in restaurant:
        entry = menu_item.to_dict()
        lst.append(entry)

    return dic

@menu_item_routes.route('/<int:restaurant_id>/new', methods=['POST'])
@login_required
def post_new_menu_item_to_restaurant(restaurant_id):
    form = MenuItemForm()
    response = {}
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        new_menu_item = MenuItem(
            name=data['name'],
            price=data['price'],
            image=data['image'],
            description=data['description'],
            restaurant_id=restaurant_id,
        )
        db.session.add(new_menu_item)
        db.session.commit()
        return new_menu_item.to_dict()
    response['formErrors'] = form.errors
    return response, 400
