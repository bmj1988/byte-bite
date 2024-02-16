import { useDispatch, useSelector } from "react-redux"
import './CurrentReviewsPage.css'
import { useEffect } from "react";
import { thunkUsersReviews, reviewsArray } from "../../redux/reviews";

const CurrentReviewsPage = () => {
const dispatch = useDispatch();

const reviews = useSelector(reviewsArray)

useEffect(() => {
  dispatch(thunkUsersReviews())
}, [dispatch])

  return (
    <>
      <h2>Your Reviews</h2>
      <div>
        {reviews.map((review) => {
          return (
            <>
            <div>{review.review}</div>
            <div>{review.stars}</div>
            </>
          )
        })}
      </div>
    </>
  )
}

export default CurrentReviewsPage