from .db import db, environment, SCHEMA, add_prefix_for_prod

order_items = db.Table('order_items',
    db.Column('order_id', db.Integer, db.ForeignKey('orders.id'), primary_key=True),
    db.Column('menu_item_id', db.Integer, db.ForeignKey('menu_items.id'), primary_key=True))


class Order(db.Model):
    __tablename__ = 'orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('restaurants.id')), nullable=False)
    status = db.Column(db.String(25), nullable=False)
    driver = db.Column(db.String(25), nullable=False)
    price = db.Column(db.Float(2), nullable=False, default=0.00)

    restaurant = db.relationship('Restaurant')
    items = db.relationship('MenuItem', secondary=order_items, lazy=False)
    user = db.relationship('User', back_populates="orders")

    @property
    def total(self):
        return self.price


    def add_price_of_item(self, price_of_item):
        self.price += price_of_item
        return self.price


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'status': self.status,
            'driver': self.driver,
            'price': self.price,
            'items': self.items,
            'restaurant': self.restaurant
        }
