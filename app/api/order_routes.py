from flask import Blueprint, request
from app.models import Order, db, order_items, MenuItem, User
from flask_login import current_user, login_required

order_routes = Blueprint('order', __name__)

@order_routes.route('/')
@login_required
def get_all_orders():
    orders = db.session.query(Order).filter(Order.user_id == current_user.id).all()
    orders_list = list()
    for order in orders:
        order_pushed_to_list = order.to_dict()
        order_pushed_to_list['items'] = order.items_array()
        orders_list.append(order_pushed_to_list)
    return {"orders": orders_list}

@order_routes.route('/current')
@login_required
def current_order():
    order = db.session.query(Order).filter_by(user_id=current_user.id, status= "Open").first()
    if not order:
        return {"404": "No order found"}, 404
    return ({"order": order.to_dict(), "items": order.items_array()})


@order_routes.route('/<int:order_id>', methods=["GET"])
def order_by_id(order_id):
    order = db.get_or_404(Order, order_id)
    order_dict = order.to_dict()
    order_dict['items'] = order.items_array()
    return order_dict


@order_routes.route('/', methods=["POST"])
@login_required
def new_order():
    delete_orders = db.session.query(Order).filter_by(user_id=current_user.id, status="Open").all()
    if delete_orders:
        for order in delete_orders:
            db.session.delete(order)
            db.session.commit()
    data = request.json
    menu_item_id = data['menu_item_id']
    quantity = data['quantity']

    order = Order(
        user_id = current_user.id,
        restaurant_id = data['restaurant_id'],
        status = data['status'],
        driver = data['driver'],
        price = data['price']
  )
    menu_item = db.get_or_404(MenuItem, menu_item_id)
    menu_item = menu_item.to_dict()
    menu_item['quantity'] = quantity
    db.session.add(order)
    db.session.commit()
    db.session.execute(db.insert(order_items).values(order_id=order.id, menu_item_id=menu_item_id, quantity=quantity))
    db.session.commit()

    return {"order":order.to_dict(), "items": [menu_item]}


@order_routes.route('/<int:order_id>', methods=['PATCH'])
@login_required
def add_item(order_id):
    order = db.get_or_404(Order, order_id)
    data=request.json
    menu_item_id=data['menu_item_id']
    quantity=data['quantity']
    for item in order.items:
        if item.id == menu_item_id:
            db.session.execute(db.update(order_items).where(order_items.c.order_id == order_id).where(order_items.c.menu_item_id == menu_item_id).values(quantity=quantity))
            db.session.commit()
            return {"order": order.to_dict(), "items": order.items_array()}
    db.session.execute(db.insert(order_items).values(order_id=order_id, menu_item_id=menu_item_id, quantity=quantity))
    db.session.commit()
    return {"order": order.to_dict(), "items": order.items_array()}


@order_routes.route('/<int:order_id>/remove', methods=['PATCH'])
@login_required
def delete_item(order_id):
    data = request.json
    menu_item_id = data['menu_item_id']
    order = db.get_or_404(Order, order_id)
    for item in order.items:
        if item.id == menu_item_id:
            db.session.execute(db.delete(order_items).where(order_items.c.order_id == order_id).where(order_items.c.menu_item_id == menu_item_id))
            db.session.commit()
            if len(order.items_array()) == 0:
                db.session.delete(order)
                return {"order": False, "items": []}, 201
            return {"order": order.to_dict(), "items": order.items_array()}


@order_routes.route('/<int:order_id>/status', methods=['PATCH'])
@login_required
def order_status_update(order_id):
    data = request.json
    order_to_update = db.get_or_404(Order, order_id)
    order_to_update.status = data['status']
    if data['price']:
        order_to_update.price = data['price']
    db.session.commit()
    return {"order": order_to_update.to_dict(), "items" : order_to_update.items_array()}


@order_routes.route('/<int:order_id>', methods=['DELETE'])
@login_required
def delete_order(order_id):
    order_to_delete = db.get_or_404(Order, order_id)
    db.session.delete(order_to_delete)
    db.session.commit()
    return {"msg":"Successfully deleted"}, 200
