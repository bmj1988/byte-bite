from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField, SubmitField, L
from wtforms.validators import DataRequired, Length

dr = [DataRequired()]

class OrderForm(FlaskForm):
    user_id = IntegerField("User")
    restaurant_id = IntegerField("Restaurant", dr)
    status = StringField("Status", dr)
    driver = StringField("Driver")
    price = FloatField("Price")
    submit = SubmitField("Submit")
