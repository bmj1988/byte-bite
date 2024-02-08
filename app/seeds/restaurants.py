from app.models import db, Restaurant, environment, SCHEMA
from sqlalchemy.sql import text

def seed_restaurants():
    mcdonalds = Restaurant(
        name="McDonald's", address="123 Fake St", image='https://picsum.photos/', city="New York City", state="NY", lat="35", lng="50", delivery=True, owner_id=1, category_id=2
    )
    thaiphoon = Restaurant(
        name="Thaiphoon", address="2011 S St NW", image='https://picsum.photos/', city="Washington", state="DC", lat="35", lng="50", delivery=True, owner_id=2, category_id=1
    )
    chipotle = Restaurant(
        name="Chipotle", address="345 Real St", image='https://picsum.photos/', city="Los Angeles", state="CA", lat="35", lng="50", delivery=True, owner_id=1, category_id=3
    )

    db.session.add_all([mcdonalds, thaiphoon, chipotle])
    db.session.commit()

def undo_restaurants():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.restaurants RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM restaurants"))

    db.session.commit()
