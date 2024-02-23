from flask import Blueprint
from app.models import Category, db

category_routes = Blueprint('category', __name__)

# GET ALL CATEGORIES '/api/categories/'
@category_routes.route('/')
def get_categories():
  categories = db.session.query(Category).all()
  lst = list()
  dic = {'categories': lst}
  for cat in categories:
    cat_entry = cat.to_dict()
    lst.append(cat_entry)
  return dic