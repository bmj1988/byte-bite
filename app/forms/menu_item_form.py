from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, FloatField
from wtforms.validators import DataRequired, Length

class MenuItemForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired(), Length(max=40)])
    price= FloatField("Price", validators=[DataRequired()])
    image= StringField("Image", validators=[DataRequired(), Length(max=255)])
    description= StringField("Description", validators=[DataRequired(), Length(max=255)])
    submit = SubmitField("Submit")
