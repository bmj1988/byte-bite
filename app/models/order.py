from .db import db, environment, SCHEMA, add_prefix_for_prod

order_items = db.Table('order_items',
    db.Column('order_id', db.Integer, db.ForeignKey(add_prefix_for_prod('orders.id')), primary_key=True),
    db.Column('menu_item_id', db.Integer, db.ForeignKey(add_prefix_for_prod('menu_items.id')), primary_key=True),
    db.Column('quantity', db.Integer))


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
            'restaurant': {'name': self.restaurant.name, 'id': self.restaurant.id, 'address': self.restaurant.address, 'image': self.restaurant.image},
        }

    def items_array(self):
        items = [item.to_dict() for item in self.items]
        for item in items:
            print(item)
            order_item = db.session.query(order_items).filter_by(order_id=self.id, menu_item_id=item['id']).first()
            item['quantity'] = order_item.quantity
        return items
