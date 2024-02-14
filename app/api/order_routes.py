from flask import Blueprint, request
from app.models import Order, db, order_items, MenuItem
from flask_login import current_user, login_required

order_routes = Blueprint('order', __name__)

@order_routes.route('/')
@login_required
def get_all_orders():
    orders = db.session.query(Order).filter(Order.user_id == current_user.id).all()
    orders_list = list()
    for order in orders:
        order_pushed_to_list = order.to_dict()
    #     order_pushed_to_list['items'] = list()
    #     for item in order.items:
    #         item_added_to_order = item.to_dict()
    #         quantity = db.session.query(order_items).filter_by(order_id=order_pushed_to_list['id'], menu_item_id=item_added_to_order['id']).first()
    #         item_added_to_order['quantity'] = quantity['quantity']
    #         order_pushed_to_list['items'].append(item_added_to_order)
        orders_list.append(order_pushed_to_list)
    return {"orders": orders_list}


@order_routes.route('/<int:order_id>', methods=["GET"])
@login_required
def order_by_id(order_id):
    order = db.get_or_404(Order, order_id)
    order_dict = order.to_dict()
    order_dict['items'] = list()
    for item in order.items:
        item_dict = item.to_dict()
        quantity = db.session.query(order_items).filter_by(order_id=order_dict['id'], menu_item_id=item_dict['id']).first()
        item_dict['quantity'] = quantity['quantity']
        order_dict['items'].append(item_dict)
    return order_dict


@order_routes.route('/', methods=["POST"])
@login_required
def new_order():
    data = request.json
    menu_item_id = data['menu_item_id']

    order = Order(
        user_id = current_user.id,
        restaurant_id = data['restaurant_id'],
        status = data['status'],
        driver = data['driver'],
        price = data['price']
  )
    menu_item = db.get_or_404(MenuItem, menu_item_id)
    menu_item = menu_item.to_dict()
    menu_item['quantity'] = 1
    db.session.add(order)
    db.session.commit()
    db.session.execute(db.insert(order_items).values(order_id=order.id, menu_item_id=menu_item_id, quantity=1))
    db.session.commit()

    return {"order":order.to_dict(), "item": menu_item}


@order_routes.route('/<int:order_id>/add_item/<int:menu_item_id>', methods=['PATCH'])
@login_required
def add_item(order_id,menu_item_id):
    order = db.get_or_404(Order, order_id)
    for item in order.items:
        if item.id == menu_item_id:
            order_item = db.session.query(order_items).filter_by(order_id=order.id, menu_item_id=menu_item_id).first()
            quantity = order_item['quantity']
            db.session.execute(db.update(order_items).where(order_id == order.id).where(menu_item_id == menu_item_id).values(quantity=quantity+1))
            db.session.commit()
            print('AFTER', order_item.quantity)
            return {"order_id": order.id, "menu_item_id": menu_item_id, "quantity": order_item['quantity']}
    db.session.execute(db.insert(order_items).values(order_id=order_id, menu_item_id=menu_item_id, quantity=1))
    return {"order_id": order.id, "menu_item_id": menu_item_id, "quantity": 1}


@order_routes.route('/<int:order_id>/delete_item/<int:menu_item_id>', methods=['PATCH'])
@login_required
def delete_item(order_id, menu_item_id):
    print(order_id, menu_item_id)
    order = db.get_or_404(Order, order_id)
    for item in order.items:
        if item.id == menu_item_id:
            order_item = db.session.query(order_items).filter_by(order_id=order.id, menu_item_id=menu_item_id).first()
            if order_item['quantity'] > 1:
                db.session.execute(db.update(order_items).where(order_id == order.id).where(menu_item_id == menu_item_id).values(quantity=(order_item['quantity'] - 1)))
            else:
                db.session.delete(order_items)
            db.session.commit()
            return {"msg": "Successfully removed"}


@order_routes.route('/<int:order_id>', methods=['PATCH'])
@login_required
def order_status_update(order_id):
    data = request.json
    order_to_update = db.get_or_404(Order, order_id)
    order_to_update.status = data['status']
    db.session.commit()
    return order_to_update.to_dict()


@order_routes.route('/<int:order_id>', methods=['DELETE'])
@login_required
def delete_order(order_id):
    order_to_delete = db.get_or_404(Order, order_id)
    db.session.delete(order_to_delete)
    db.session.commit()
    return {"msg":"Successfully deleted"}, 200
