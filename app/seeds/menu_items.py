from app.models import db, MenuItem, environment, SCHEMA
from sqlalchemy.sql import text

def seed_menu_items():
    burger = MenuItem(
        name="Big Mac", price=5.00, description="Two all beef patties with special sauce", image="https://bmj1988-api-pics.s3.amazonaws.com/foodpics/fastfood4.png", restaurant_id=1
    )
    fries = MenuItem(
        name="Large Fry", price=2.00, description="delicious fries", image="https://bmj1988-api-pics.s3.amazonaws.com/foodpics/fries1.png", restaurant_id=1
    )
    shake = MenuItem(
        name="Beverage", price=3.00, description="mmmm delicious beverage", image="https://bmj1988-api-pics.s3.amazonaws.com/foodpics/iceTea.png", restaurant_id=1
    )
    other_burger = MenuItem(
        name="Mac's Famous Upside Down Burger", price=8.00, description="This burger is twisted", image="https://bmj1988-api-pics.s3.amazonaws.com/foodpics/fastfood2.png", restaurant_id=1
    )
    deluxe_burger = MenuItem(
        name="Greaseburger", price=15.00, description="Stops your heart or your money back", image="https://bmj1988-api-pics.s3.amazonaws.com/foodpics/burger1.png", restaurant_id=1
    )
    mcds = [burger, fries, shake, other_burger, deluxe_burger]
    db.session.add_all(mcds)

    pad_thai = MenuItem(
        name="All Dishes", price=20.00, description="Our famous 9 entree appetizer", image="https://bmj1988-api-pics.s3.amazonaws.com/foodpics/foodpics6.png", restaurant_id=2
    )
    thai_tea = MenuItem(
        name="Thai Iced Tea", price=5.00, description="Caffeine Warning!", image="https://bmj1988-api-pics.s3.amazonaws.com/foodpics/iceTea2.png", restaurant_id=2
    )

    thai=[pad_thai, thai_tea]
    db.session.add_all(thai)

    item_1 = MenuItem(
        name="Fresh Plate", price=7.00, description="Extra fresh", image="https://bmj1988-api-pics.s3.amazonaws.com/foodpics/foodpics2.png", restaurant_id=3
    )
    item_2 = MenuItem(
        name="Fresh Box", price=9.00, description="Fresh overload", image="https://bmj1988-api-pics.s3.amazonaws.com/foodpics/foodpics.png", restaurant_id=3
    )
    item_3 = MenuItem(
        name="Fresh Drink", price=5.00, description="Its so fresh that its cool", image="https://bmj1988-api-pics.s3.amazonaws.com/foodpics/iceTea2.png", restaurant_id=3
    )

    slots = [item_1, item_2, item_3]

    db.session.add_all(slots)

    item_1 = MenuItem(
        name="Poke Bowl", price=7.00, description="Don't poke it eat it", image="https://bmj1988-api-pics.s3.amazonaws.com/foodpics/entree.png", restaurant_id=4
    )
    item_2 = MenuItem(
        name="Poke Mega Bowl", price=11.00, description="Poke the bear", image="https://bmj1988-api-pics.s3.amazonaws.com/foodpics/bowlentree3.png", restaurant_id=4
    )
    item_3 = MenuItem(
        name="Famous Drink", price=5.00, description="Drink with notoriety", image="https://bmj1988-api-pics.s3.amazonaws.com/foodpics/iceTea2.png", restaurant_id=4
    )

    slots = [item_1, item_2, item_3]

    db.session.add_all(slots)

    item_1 = MenuItem(
        name="Vegan Platter", price=9.00, description="All the vegetables and seeds in our restaurant for one low price", image="https://bmj1988-api-pics.s3.amazonaws.com/foodpics/vegan2.png", restaurant_id=5
    )
    item_2 = MenuItem(
        name="Vegan Hotdog", price=9.00, description="Made of bread and twigs", image="https://bmj1988-api-pics.s3.amazonaws.com/foodpics/vegan3.png", restaurant_id=5
    )
    item_3 = MenuItem(
        name="Value meal", price=5.00, description="A vegan bowl with your choice of stuff", image="https://bmj1988-api-pics.s3.amazonaws.com/foodpics/vegan4.png", restaurant_id=5
    )

    slots = [item_1, item_2, item_3]

    db.session.add_all(slots)

    item_1 = MenuItem(
        name="Dumpling Platter", price=9.00, description="Dumplings and sauces", image="https://bmj1988-api-pics.s3.amazonaws.com/foodpics/chinese2.png", restaurant_id=6
    )
    item_2 = MenuItem(
        name="Feast of Dumplingtown", price=12.00, description="Famous dish this is why everyone around here has medical issues", image="https://bmj1988-api-pics.s3.amazonaws.com/foodpics/chinese3.png", restaurant_id=6
    )
    item_3 = MenuItem(
        name="Ice Tea", price=5.00, description="You'll never believe how good it tastes", image="https://bmj1988-api-pics.s3.amazonaws.com/foodpics/iceTea2.png", restaurant_id=6
    )

    slots = [item_1, item_2, item_3]

    db.session.add_all(slots)

    item_1 = MenuItem(
        name="Breakfast Plate", price=7.00, description="Full of your favorite breakfast staples", image="https://bmj1988-api-pics.s3.amazonaws.com/foodpics/breakfast1.png", restaurant_id=7
    )
    item_2 = MenuItem(
        name="Breakfast Platter", price=9.00, description="Delicious eggs and various beans and meats", image="https://bmj1988-api-pics.s3.amazonaws.com/foodpics/breakfast3.png", restaurant_id=7
    )
    item_3 = MenuItem(
        name="Intimate Breakfast with coffee", price=5.00, description="Served with several thousand compotes and jams", image="https://bmj1988-api-pics.s3.amazonaws.com/foodpics/breakfast4.png", restaurant_id=7
    )

    slots = [item_1, item_2, item_3]

    db.session.add_all(slots)

    item_1 = MenuItem(
        name="Sprinkleberry Cone", price=5.00, description="Cold n Creamy", image="https://bmj1988-api-pics.s3.amazonaws.com/foodpics/iceCream1.png", restaurant_id=8
    )
    item_2 = MenuItem(
        name="The Double Barrel", price=9.00, description="Four iced creams served at once", image="https://bmj1988-api-pics.s3.amazonaws.com/foodpics/iceCream6.png", restaurant_id=8
    )
    item_3 = MenuItem(
        name="Sorbet", price=3.00, description="Over one thousand varities chosen at random by one of our employees for you to eat", image="https://bmj1988-api-pics.s3.amazonaws.com/foodpics/iceCream4.png", restaurant_id=8
    )
    item_4 = MenuItem(
        name="Strobbery", price=3.00, description="Armed strobbery", image="https://bmj1988-api-pics.s3.amazonaws.com/foodpics/iceCream3.png", restaurant_id=8
    )
    item_5 = MenuItem(
        name="Even more ice cream", price=10.00, description="u scream i scream", image="https://bmj1988-api-pics.s3.amazonaws.com/foodpics/iceCream2.png", restaurant_id=8
    )


    slots = [item_1, item_2, item_3, item_4, item_5]


    item_1 = MenuItem(
        name="Pepperoni", price=5.00, description="Don't blame us midjourney picked the flavors", image="https://bmj1988-api-pics.s3.amazonaws.com/foodpics/pizza1.png", restaurant_id=9
    )
    item_2 = MenuItem(
        name="Colorful Pizza", price=11.00, description="All the colors of the pizza rainbow", image="https://bmj1988-api-pics.s3.amazonaws.com/foodpics/pizza2.png", restaurant_id=9
    )
    item_3 = MenuItem(
        name="Slice", price=3.00, description="Our famous new invention -- Pizza", image="https://bmj1988-api-pics.s3.amazonaws.com/foodpics/pizza4.png", restaurant_id=9
    )
    slots = [item_1, item_2, item_3]
    db.session.add_all(slots)

    item_1 = MenuItem(
        name="Kabobs", price=5.00, description="Skewered meats", image="https://bmj1988-api-pics.s3.amazonaws.com/foodpics/indian1.png", restaurant_id=10
    )
    item_2 = MenuItem(
        name="Naan platter", price=14.00, description="Delicious assortment of our favorites", image="https://bmj1988-api-pics.s3.amazonaws.com/foodpics/indian2.png", restaurant_id=10
    )
    item_3 = MenuItem(
        name="Famous Box", price=14.00, description="A box of good food just buy it", image="https://bmj1988-api-pics.s3.amazonaws.com/foodpics/indian3.png", restaurant_id=10
    )

    slots = [item_1, item_2, item_3]
    db.session.add_all(slots)

    item_1 = MenuItem(
        name="Sprinkleberry Cone", price=5.00, description="Cold n Creamy", image="https://bmj1988-api-pics.s3.amazonaws.com/foodpics/iceCream1.png", restaurant_id=8
    )
    item_2 = MenuItem(
        name="The Double Barrel", price=9.00, description="Four iced creams served at once", image="https://bmj1988-api-pics.s3.amazonaws.com/foodpics/iceCream6.png", restaurant_id=8
    )
    item_3 = MenuItem(
        name="Sorbet", price=3.00, description="Over one thousand varities chosen at random by one of our employees for you to eat", image="https://bmj1988-api-pics.s3.amazonaws.com/foodpics/iceCream4.png", restaurant_id=8
    )

    slots = [item_1, item_2, item_3]
    db.session.add_all(slots)

    item_1 = MenuItem(
        name="Sushi/Sashimi Combo Box", price=15.00, description="Delicious sushi", image="https://bmj1988-api-pics.s3.amazonaws.com/foodpics/sushi1.png", restaurant_id=11
    )
    item_2 = MenuItem(
        name="Rainbow Roll", price=9.00, description="Smothered in sauce", image="https://bmj1988-api-pics.s3.amazonaws.com/foodpics/sushi3.png", restaurant_id=11
    )
    item_3 = MenuItem(
        name="Assortment of Sushi", price=24.00, description="Mega Box", image="https://bmj1988-api-pics.s3.amazonaws.com/foodpics/sushi4.png", restaurant_id=11
    )

    slots = [item_1, item_2, item_3]
    db.session.add_all(slots)

    item_1 = MenuItem(
        name="Fancy Drinks", price=5.00, description="May or may not get you drunk depending on your preference", image="https://bmj1988-api-pics.s3.amazonaws.com/foodpics/fancyDrinks.png", restaurant_id=12
    )
    item_2 = MenuItem(
        name="Loaded cheese fries", price=9.00, description="Good for the soul but not for the heart, consume with caution", image="https://bmj1988-api-pics.s3.amazonaws.com/foodpics/loadedFries.png", restaurant_id=12
    )
    item_3 = MenuItem(
        name="Hospital combo", price=33.00, description="Eating all of this will make you legally deceased", image="https://bmj1988-api-pics.s3.amazonaws.com/foodpics/foodpics3.png", restaurant_id=12
    )

    slots = [item_1, item_2, item_3]
    db.session.add_all(slots)

    db.session.commit()

def undo_menu_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.menu_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM menu_items"))

    db.session.commit()
