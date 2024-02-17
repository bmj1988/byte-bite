import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { thunkUsersReviews, reviewsArray } from "../../redux/reviews";
import DeleteReviewModal from "./DeleteReviewModal";
import OpenModalButton from '../OpenModalButton'
import ReviewBox from "../StorePage/ReviewBox";
import './CurrentReviewsPage.css' 
import UpdateReviewModal from "./UpdateReviewModal";

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
                  < OpenModalButton 
                  modalComponent={<DeleteReviewModal restaurant_id={review.restaurant_id}/>}
                  buttonText="Delete" />
                  < OpenModalButton 
                  modalComponent={ <UpdateReviewModal restaurant_id={review.restaurant_id} />}
                  buttonText="Update"
                  />
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