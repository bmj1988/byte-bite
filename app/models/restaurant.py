from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import column_property
from sqlalchemy import select, func


class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.Text, nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('restaurants.id')), nullable=False)

    restaurant = db.relationship('Restaurant', back_populates="reviews")
    user = db.relationship('User', back_populates="reviews")

class Restaurant(db.Model):
    __tablename__ = 'restaurants'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False, unique=True)
    address = db.Column(db.String(255), nullable=False, unique=True)
    city = db.Column(db.String(40), nullable=False)
    state = db.Column(db.String(20), nullable=False)
    image = db.Column(db.String(255), nullable=False)
    lat = db.Column(db.Float, nullable=False)
    lng = db.Column(db.Float, nullable=False)
    delivery = db.Column(db.Boolean, nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('categories.id')), nullable=False)
    star_rating = column_property(
        select(func.avg(Review.id))
        .where(Review.user_id == id)
        .correlate_except(Review)
        .scalar_subquery()
    )

    menu = db.relationship('MenuItem', back_populates="restaurant")
    reviews = db.relationship('Review', back_populates="restaurant")
    owner = db.relationship('User')
    category = db.relationship('Category')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'delivery': self.delivery,
            'categoryId': self.category_id,
            'starRating': self.star_rating,
            'ownerId': self.owner_id,
            'owner': self.owner.to_dict(),
            'MenuItems': [x.to_dict() for x in self.menu]
        }
