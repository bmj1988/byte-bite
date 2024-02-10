from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, SubmitField
from wtforms.validators import DataRequired, Length

class RestaurantForm(FlaskForm):
  name = StringField("Name", validators=[DataRequired(), Length(max=40)])
  address = StringField("Address", validators=[DataRequired(), Length(max=255)])
  city = StringField("City", validators=[DataRequired(), Length(max=40)])
  state = StringField("State", validators=[DataRequired(), Length(max=20)])
  image = StringField("Image", validators=[DataRequired(), Length(max=255)])
  lat = IntegerField("Latitude", validators=[DataRequired()])
  lng = IntegerField("Longitude", validators=[DataRequired()])
  delivery = BooleanField("Delivery", validators=[DataRequired()])
  category_id = IntegerField("Category ID", validators=[DataRequired()])
  submit = SubmitField("Submit")