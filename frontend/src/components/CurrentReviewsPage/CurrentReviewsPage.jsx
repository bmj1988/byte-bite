import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { thunkUsersReviews, reviewsArray } from "../../redux/reviews";
import { thunkAllRestaurants } from "../../redux/restaurants";
import DeleteReviewModal from "./DeleteReviewModal";
import OpenModalButton from '../OpenModalButton'
import CurrentReviewBox from "./CurrentReviewsBox";
import UpdateReviewModal from "./UpdateReviewModal";
import Spinner from "../Spinner";
import './CurrentReviewsPage.css' 

const CurrentReviewsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkUsersReviews())
    dispatch(thunkAllRestaurants())
  }, [dispatch])

  const reviews = useSelector(reviewsArray)

  if (!reviews) {
    return <Spinner />
  }

  return (
    <>
      <div className="reviews">
        {reviews.map((review) => {
          return (
            <>
              <div className="review-box">
                <CurrentReviewBox review={review} key={review.id} />
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