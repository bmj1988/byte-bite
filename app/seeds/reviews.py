from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    review_1 = Review(
        user_id=2, stars="4", review="great place i love the food", restaurant_id=1
    )
    review_2 = Review(
        user_id=3, stars="2", review="bad place i hate the food", restaurant_id=2
    )
    review_3 = Review(
        user_id=1, stars="3", review="i just love leaving reviews", restaurant_id=3
    )

    db.session.add_all([review_1, review_2, review_3])
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
