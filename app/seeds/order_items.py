from app.models import db, order_items, environment, SCHEMA
from sqlalchemy.sql import text

def seed_order_items():
    oi_1 = order_items(
        order_id=1, menu_item_id=2
    )
    oi_2 = order_items(
        order_id=3, menu_item_id=1
    )
    oi_3 = order_items(
        order_id=2, menu_item_id=4
    )
