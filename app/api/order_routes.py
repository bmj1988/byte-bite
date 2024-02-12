from flask import Blueprint
from app.models import Order, db, order_items
from app.forms.order import OrderForm
from sqlalchemy import insert

order_routes = Blueprint('order', __name__)


@order_routes.route('/current')
def current_order(order_id):
    order = db.get_or_404(Order, order_id)
    return order.to_dict()


@order_routes.route('/start', methods=['POST'])
def start_order():
    form = OrderForm()
    if form.validate_on_submit():
        new_order = Order()
        form.populate_obj(new_order)
        db.session.add(new_order)
        db.session.commit()
        return new_order.to_dict()
    return 400

@order_routes.route('/order', methods=['POST'])
def order_submit(order):
    order_items_to_add = order.menu_items
    for item in order_items:
        db.session.execute(db.insert(order_items).values(order_id=item.order_id, menu_item_id=item.menu_order_id))
    new_order = db.get_or_404(Order, order.id)
    new_order.status = "RECEIVED"
    db.session.commit()
    return new_order.to_dict()

@order_routes.route('/status_update', methods=['POST'])
def order_status_update(order_info):
    order_to_update = db.get_or_404(Order, order_info.id)
    order_to_update.status = order_info.status
    db.session.commit()
    return order_to_update.to_dict()
