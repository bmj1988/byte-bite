from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, FloatField
from wtforms.validators import DataRequired, Length, NumberRange, URL

class MenuItemForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired(), Length(max=40)])
    price= FloatField("Price", validators=[DataRequired(), NumberRange(min=1)])
    image= StringField("Image", validators=[DataRequired(), Length(max=255), URL()])
    description= StringField("Description", validators=[DataRequired(), Length(max=255)])
    submit = SubmitField("Submit")
