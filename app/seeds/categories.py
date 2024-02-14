from app.models import db, Category, environment, SCHEMA
from sqlalchemy.sql import text

def seed_categories():
    thai = Category(
        name="Thai"
    )
    fast_food = Category(
        name="Fast Food"
    )
    mexican = Category(
        name="Mexican"
    )
    poke = Category(
        name="Poke"
    )
    chinese = Category(
        name="Chinese"
    )
    indian = Category(
        name="Indian"
    )
    sushi = Category(
        name="Sushi"
    )
    wings = Category(
        name="Wings"
    )
    alcohol = Category(
        name="Alcohol"
    )
    pizza = Category(
        name="Pizza"
    )
    italian = Category(
        name="Italian"
    )
    greek = Category(
        name="Greek"
    )
    breakfast = Category(
        name="Breakfast"
    )
    ice_cream = Category(
        name="Ice Cream"
    )
    vegan = Category(
        name="Vegan"
    )


    db.session.add_all([pizza, italian, greek, breakfast, ice_cream, vegan, thai, fast_food, mexican, poke, chinese, indian, sushi, wings, alcohol])
    db.session.commit()

def undo_categories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM categories"))

    db.session.commit()
