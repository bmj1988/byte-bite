from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import column_property
from sqlalchemy import select, func
from .review import Review

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
        select(func.avg(Review.stars))
        .where(Review.user_id == id)
        .correlate_except(Review)
        .scalar_subquery()
    )

    menu = db.relationship('MenuItem', back_populates="restaurant", cascade="all, delete")
    reviews = db.relationship('Review', back_populates="restaurant", cascade="all, delete")
    owner = db.relationship('User')
    category = db.relationship('Category')

    def to_dict(self):
        return {
            'id': self.id,
            'image': self.image,
            'name': self.name,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'delivery': self.delivery,
            'categoryId': self.category_id,
            'starRating': self.star_rating,
            'ownerId': self.owner_id,
            'owner': self.owner.to_dict(),
            'MenuItems': [x.to_dict() for x in self.menu],
            'Reviews': [x.to_dict() for x in self.reviews],
            'numReviews': len([x.to_dict() for x in self.reviews])
        }

    def to_dict_main_page(self):
        return {
            'id': self.id,
            'name': self.name,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'categoryId': self.category_id,
            'starRating': self.star_rating,
            'image': self.image
        }
