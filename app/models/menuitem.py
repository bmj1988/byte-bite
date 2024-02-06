from .db import db, environment, SCHEMA

class MenuItem(db.Model):
    __tablename__ = 'menu_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    price = db.Column(db.Float(scale=2), nullable=False)
    image = db.Column(db.String)
    description = db.Column(db.Text)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'))

    restaurant = db.relationship("Restaurant", back_populates="menu")
