from flask import Blueprint
from app.models import Review, db

review_routes = Blueprint('review', __name__)
