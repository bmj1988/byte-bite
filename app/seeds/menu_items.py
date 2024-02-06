from app.models import db, MenuItem, environment, SCHEMA
from sqlalchemy.sql import text

def seed_menu_items():
    burger = MenuItem(
        name="Big Mac", price="5.00", description="Two all beef patties with special sauce", restaurant_id=1
    )
    fries = MenuItem(
        name="Large Fry", price="2.00", description="delicious fries", restaurant_id=1
    )
    shake = MenuItem(
        name="Chocolate Shake", price="3.00", description="Thick milk shake", restaurant_id=1
    )
    pad_thai = MenuItem(
        name="Pad Thai", price="15.00", description="Delicious pad thai with peanut curry", restaurant_id=2
    )
    thai_tea = MenuItem(
        name="Thai Iced Tea", price="5.00", description="Caffeine Warning!", restaurant_id=2
    )
    steak_burrito = MenuItem(
        name="Steak Burrito", price="12.00", description="Filling burrito", restaurant_id=3
    )

    db.session.add_all([burger, fries, shake, pad_thai, thai_tea, steak_burrito])
    db.session.commit()

def undo_menu_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.menu_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM menu_items"))

    db.session.commit()
