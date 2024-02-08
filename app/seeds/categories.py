from app.models import db, Category, environment, SCHEMA
from sqlalchemy.sql import text

def seed_categories():
    thai = Category(
        name="Thai"
    )
    fast_food = Category(
        name="Fast Food"
    )
    burritos = Category(
        name="Burritos"
    )
    poke = Category(
        name="Poke"
    )
    chinese = Category(
        name="Chinese"
    )

    db.session.add_all([thai, fast_food, burritos, poke, chinese])
    db.session.commit()

def undo_categories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM categories"))

    db.session.commit()
