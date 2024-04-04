from faker import Faker;
from app.models import db, Restaurant, environment, SCHEMA
from sqlalchemy.sql import text
import random

fake = Faker()

images = ['https://bmj1988-api-pics.s3.amazonaws.com/foodpics/fastfood3.png', 'https://bmj1988-api-pics.s3.amazonaws.com/foodpics/foodpics7.png', 'https://bmj1988-api-pics.s3.amazonaws.com/foodpics/foodpics5.png',
            'https://bmj1988-api-pics.s3.amazonaws.com/foodpics/entree2.png', 'https://bmj1988-api-pics.s3.amazonaws.com/foodpics/chinese1.png', 'https://bmj1988-api-pics.s3.amazonaws.com/foodpics/breakfast2.png',
            'https://bmj1988-api-pics.s3.amazonaws.com/foodpics/iceCream5.png', 'https://bmj1988-api-pics.s3.amazonaws.com/foodpics/pizza3.png', 'https://bmj1988-api-pics.s3.amazonaws.com/foodpics/indian4.png', 
            'https://bmj1988-api-pics.s3.amazonaws.com/foodpics/sushi2.png', 'https://bmj1988-api-pics.s3.amazonaws.com/foodpics/foodpics2.png'] 

def generate_fake_restaurant(category_id):
    restaurant = {}
    restaurant['name'] = fake.company()
    restaurant['address'] = fake.street_address()
    restaurant['city'] = fake.city()
    restaurant['state'] = fake.state()
    restaurant['lat'] = fake.latitude()
    restaurant['lng'] = fake.longitude()
    restaurant['delivery'] = True
    restaurant['owner_id'] = random.randint(1, 6)
    # restaurant['category_id'] = random.randint(1, 15)
    restaurant['category_id'] = category_id
    restaurant['image'] = random.choice(images)
    # restaurant['image'] = f"https://picsum.photos/id/{random.randint(1, 200)}/288/130"
    return restaurant

def generate_fake_restaurants(num_restaurants):
    restaurants = []
    for _ in range(num_restaurants):
        restaurants.append(generate_fake_restaurant())
    return restaurants

def seed_restaurants():
    mcdonalds = Restaurant(
        name="McDonald's", address="123 Fake St", image='https://bmj1988-api-pics.s3.amazonaws.com/foodpics/fastfood3.png', city="New York City", state="NY", lat=35, lng=50, delivery=True, owner_id=1, category_id=2
    )
    thaiphoon = Restaurant(
        name="Thaiphoon", address="2011 S St NW", image='https://bmj1988-api-pics.s3.amazonaws.com/foodpics/foodpics7.png', city="Washington", state="DC", lat=35, lng=50, delivery=True, owner_id=2, category_id=1
    )
    fresh_eats = Restaurant(
        name="Fresh Eatz", address="8790 Fresh Blvd", image='https://bmj1988-api-pics.s3.amazonaws.com/foodpics/foodpics5.png', city="Bel Air", state="CA", lat=35, lng=50, delivery=True, owner_id=1, category_id=8
    )
    pokebowls = Restaurant(
        name="Aloha Poke Cafe", address="717 Veum Run", image='https://bmj1988-api-pics.s3.amazonaws.com/foodpics/entree2.png', city="South Ruthanne", state="NM", lat=35, lng=50, delivery=True, owner_id=3, category_id=4
    )
    vegan = Restaurant(
        name="Verdant Bites Cafe", address="48053 Gulgowski Ports", image='https://bmj1988-api-pics.s3.amazonaws.com/foodpics/vegan1.png', city="Farrellport", state="WV", lat=35, lng=50, delivery=True, owner_id=2, category_id=15
    )
    chinese = Restaurant(
        name="Dumpling City", address="5965 Glory Course", image='https://bmj1988-api-pics.s3.amazonaws.com/foodpics/chinese1.png', city="North Miyokoport", state="ID", lat=35, lng=50, delivery=True, owner_id=3, category_id=5
    )
    breakfast = Restaurant(
        name="The Breakfast Club", address="40915 Bok Wells", image='https://bmj1988-api-pics.s3.amazonaws.com/foodpics/breakfast2.png', city="Lake Monicatown", state="NC", lat=35, lng=50, delivery=True, owner_id=1, category_id=13
    )
    ice_cream = Restaurant(
        name="Cold Open", address="734 Maragaret Shoals", image='https://bmj1988-api-pics.s3.amazonaws.com/foodpics/iceCream5.png', city="Danchester", state="WY", lat=35, lng=50, delivery=True, owner_id=2, category_id=14
    )
    pizza = Restaurant(
        name="Square Root of Pie", address="250 Reynalda Walks", image='https://bmj1988-api-pics.s3.amazonaws.com/foodpics/pizza3.png', city="Rodrigoshire", state="NC", lat=35, lng=50, delivery=True, owner_id=3, category_id=10
    )
    indian = Restaurant(
        name="Saffron Symphony", address="8210 Ankunding Viaduct", image='https://bmj1988-api-pics.s3.amazonaws.com/foodpics/indian4.png', city="Hillsbury", state="MT", lat=35, lng=50, delivery=True, owner_id=1, category_id=6
    )
    sushi = Restaurant(
        name="The Raw Deal", address="215 Streitch Forge", image='https://bmj1988-api-pics.s3.amazonaws.com/foodpics/sushi2.png', city="Port Julius", state="ND", lat=35, lng=50, delivery=True, owner_id=2, category_id=7
    )
    daves = Restaurant(
        name="Dave's Food Place", address="1818 Gusikowski Cliff", image='https://bmj1988-api-pics.s3.amazonaws.com/foodpics/foodpics2.png', city="Damonside", state="AR", lat=35, lng=50, delivery=True, owner_id=3, category_id=9
    )

    db.session.add_all([mcdonalds, thaiphoon, fresh_eats, pokebowls, vegan, chinese, breakfast, ice_cream, indian, pizza, sushi, daves])
    for category_id in range(1, 16):
        for _ in range(12):
            fake_restaurant = generate_fake_restaurant(category_id)
            restaurant = Restaurant(**fake_restaurant)
            db.session.add(restaurant)
    db.session.commit()


def undo_restaurants():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.restaurants RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM restaurants"))

    db.session.commit()
