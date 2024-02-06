from app.models import db, Order, environment, SCHEMA
from sqlalchemy.sql import text

def seed_orders():
    order_1 = Order(
        customer=2, restaurant_id=1, status="Out for Delivery", driver="Ted", price="15.00"
    )
    order_2 = Order(
        customer=3, restaurant_id=2, status="Being Prepared", driver="Angie", price="28.00"
    )
    order_3 = Order(
        customer=3, restaurant_id=3, status="Delivered", driver="Jerry", price="55.00"
    )

    db.session.add_all([order_1, order_2, order_3])
    db.session.commit()

def undo_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM orders"))

    db.session.commit()
