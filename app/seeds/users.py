from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text

from faker import Faker;
fake = Faker()

# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        email='demo@aa.io', password='password', first_name="Mike", last_name="Williams")
    marnie = User(
        email='marnie@aa.io', password='password', first_name="Marnie", last_name="Millstone")
    bobbie = User(
        email='bobbie@aa.io', password='password', first_name="Bobbie", last_name="Roberts")

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    for i in range(6):
        fake_user = User(
            email= fake.email(),
            password= 'password',
            first_name= fake.first_name(),
            last_name= fake.last_name()
        )
        db.session.add(fake_user)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
