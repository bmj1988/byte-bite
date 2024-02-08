from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, SubmitField
from wtforms.validators import DataRequired, Length, ValidationError
from app.models import Restaurant

def name_exists(form, field):
  # Checking if restaurant name already exists
  new_name = field.data
  existing_name = Restaurant.query.filter(Restaurant.name == new_name).first()
  if existing_name:
    raise ValidationError('Restaurant name must be unique')
  
def address_exists(form, field):
  # Checking if restaurant address already exists
  new_add = field.data
  existing_add = Restaurant.query.filter(Restaurant.address == new_add).first()
  if existing_add:
    raise ValidationError('Restaurant address must be unique')


class RestaurantForm(FlaskForm):
  name = StringField("Name", validators=[DataRequired(), Length(max=40), name_exists])
  address = StringField("Address", validators=[DataRequired(), Length(max=255), address_exists])
  city = StringField("City", validators=[DataRequired(), Length(max=40)])
  state = StringField("State", validators=[DataRequired(), Length(max=20)])
  image = StringField("Image", validators=[DataRequired(), Length(max=255)])
  lat = IntegerField("Latitude", validators=[DataRequired()])
  lng = IntegerField("Longitude", validators=[DataRequired()])
  delivery = BooleanField("Delivery", validators=[DataRequired()])
  category_id = IntegerField("Category ID", validators=[DataRequired()])
  submit = SubmitField("Submit")