from .db import db, environment, SCHEMA, add_prefix_for_prod

class MenuItem(db.Model):
    __tablename__ = 'menu_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    price = db.Column(db.Float(2), nullable=False)
    image = db.Column(db.String)
    description = db.Column(db.Text)
    restaurant_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('restaurants.id')))
    restaurant = db.relationship("Restaurant", back_populates="menu")

    def to_dict(self):
        return{
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'description': self.description,
            'image': self.image,
            'restaurantId': self.restaurant_id
        }
