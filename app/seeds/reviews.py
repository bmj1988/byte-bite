from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from random import randint

from faker import Faker
fake = Faker()

def seed_reviews():
    review_1 = Review(
        user_id=2, stars=4, review="great place i love the food", restaurant_id=1
    )
    review_2 = Review(
        user_id=3, stars=2, review="bad place i hate the food", restaurant_id=2
    )
    review_3 = Review(
        user_id=1, stars=3, review="i just love leaving reviews", restaurant_id=3
    )
    db.session.add_all([review_1, review_2, review_3])
    reviews = []
    for i in range(3): #value in range = number of reviews per restaurant
        for restaurant_id in range(1, 103):
            stars = randint(1, 5)
            user_id = randint(1, 9)
            review = fake.text()
            newReview = Review(
                user_id=user_id,
                stars=stars,
                review=review,
                restaurant_id=restaurant_id)
            reviews.append(newReview)
    print(reviews)
    db.session.add_all(reviews)
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
