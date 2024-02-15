from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, SubmitField
from wtforms.validators import DataRequired, Length, ValidationError

class RestaurantForm(FlaskForm):
  def validate_length(form, field):
        max_length = getattr(form, f'{field.name}_length', None)
        if max_length and len(field.data) > max_length:
          return ValidationError(f'{field.label.text} must be {max_length} characters or fewer.')
        
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