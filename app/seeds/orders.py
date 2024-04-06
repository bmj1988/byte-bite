from app.models import db, Order, environment, SCHEMA
from sqlalchemy.sql import text
from random import randint, choice, uniform

drivers = ["Ted", "Angie", "Jerry", "Terry", "Gerrod", "Brian", "Daniel"]


def seed_orders():
    order_1 = Order(
        user_id=2, restaurant_id=1, status="Out for Delivery", driver="Ted", price=15.00
    )
    order_2 = Order(
        user_id=3, restaurant_id=2, status="Being Prepared", driver="Angie", price=28.00
    )
    order_3 = Order(
        user_id=3, restaurant_id=3, status="Delivered", driver="Jerry", price=55.00
    )

    db.session.add_all([order_1, order_2, order_3])
    orders = []
    for i in range(12):
        for user_id in range(1, 6):
            user_id = user_id
            restaurant_id = randint(1, 50)
            status = "Delivered"
            driver = choice(drivers)
            price = round(uniform(16, 45), 2)
            newOrder = Order(
                user_id=user_id,
                restaurant_id=restaurant_id,
                status=status,
                driver=driver,
                price=price
            )
            orders.append(newOrder)
    print(orders)
    db.session.add_all(orders)
    db.session.commit()

def undo_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM orders"))

    db.session.commit()
