from app.models import db, Category, environment, SCHEMA
from sqlalchemy.sql import text

def seed_categories():
    thai = Category(
        name="Thai",
        image="/FRONTENDICONthai-food.png"
    )
    fast_food = Category(
        name="Fast Food",
        image="/FRONTENDICONfast-food.png"
    )
    mexican = Category(
        name="Mexican",
        image="/FRONTENDICONmexican-food.png"
    )
    poke = Category(
        name="Poke",
        image="/FRONTENDICONpoke.png"
    )
    chinese = Category(
        name="Chinese",
        image="/FRONTENDICONchinese-food.png"
    )
    indian = Category(
        name="Indian",
        image="/FRONTENDICONindian-food.png"
    )
    sushi = Category(
        name="Sushi",
        image="/FRONTENDICONsushi.png"
    )
    wings = Category(
        name="Wings",
        image="/FRONTENDICONfried-chicken.png"
    )
    alcohol = Category(
        name="Alcohol",
        image="/FRONTENDICONalcohol.png"
    )
    pizza = Category(
        name="Pizza",
        image="/FRONTENDICONpizza.png"
    )
    italian = Category(
        name="Italian",
        image="/FRONTENDICONspaghetti.png"
    )
    greek = Category(
        name="Greek",
        image="/FRONTENDICONgreek.png"
    )
    breakfast = Category(
        name="Breakfast",
        image="/FRONTENDICONbreakfast.png"
    )
    ice_cream = Category(
        name="Ice Cream",
        image="/FRONTENDICONice-cream.png"
    )
    vegan = Category(
        name="Vegan",
        image="/FRONTENDICONvegan.png"
    )


    db.session.add_all([pizza, italian, greek, breakfast, ice_cream, vegan, thai, fast_food, mexican, poke, chinese, indian, sushi, wings, alcohol])
    db.session.commit()

def undo_categories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM categories"))

    db.session.commit()
