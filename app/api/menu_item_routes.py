from flask import Blueprint
from app.models import MenuItem, db

menu_item_routes = Blueprint('menu_item', __name__)
