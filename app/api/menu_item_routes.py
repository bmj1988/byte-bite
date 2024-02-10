from flask import Blueprint
from app.models import MenuItem, Restaurant, db

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
