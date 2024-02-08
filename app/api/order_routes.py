from flask import Blueprint
from app.models import Order, db

order_routes = Blueprint('order', __name__)
