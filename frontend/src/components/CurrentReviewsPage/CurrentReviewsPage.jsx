import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { reviewsArray, thunkUsersReviews } from "../../redux/reviews";
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
  }, [dispatch])

  const reviews = useSelector(reviewsArray)

  if (!reviews) {
    return <Spinner />
  }

  return (
    <>
      <div className="reviews">
        {!reviews.length && <h2 className="textmark">You have no reviews.</h2>}
        {reviews.length > 0 && reviews.map((review) => {
          return (
            <>
              <div className="review-box">
                <CurrentReviewBox review={review} key={review.id} />
                <div className="review-buttons">
                  < OpenModalButton className="review-modal-button"
                  modalComponent={<DeleteReviewModal id={review.id}/>}
                  buttonText="Delete" />
                  < OpenModalButton className="review-modal-button"
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
