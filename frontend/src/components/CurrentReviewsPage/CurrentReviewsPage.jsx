import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { thunkUsersReviews, reviewsArray } from "../../redux/reviews";
import ReviewBox from "../StorePage/ReviewBox";
import './CurrentReviewsPage.css' 

const CurrentReviewsPage = () => {
const dispatch = useDispatch();

const reviews = useSelector(reviewsArray)

useEffect(() => {
  dispatch(thunkUsersReviews())
}, [dispatch])

  return (
    <>
      <div className="reviews">
        {reviews.map((review) => {
          return (
            <>
              <div className="review-box">
                <ReviewBox review={review} key={review.id} />
                <div className="review-buttons">
                  <button>DELETE</button>
                  <button>UPDATE</button>
                </div>
              </div>
            </>
          )
        })}
      </div>
    </>
  )
}

export default CurrentReviewsPage