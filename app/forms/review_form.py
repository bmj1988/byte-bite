from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired

class ReviewForm(FlaskForm):
  review = StringField("Review", validators=[DataRequired()])
  stars = IntegerField("Stars", validators=[DataRequired()])
  submit = SubmitField("Submit")