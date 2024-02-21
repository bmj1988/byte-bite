import { useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import { thunkUsersReviews } from "../../redux/reviews";
import { thunkAllRestaurants } from "../../redux/restaurants";
import { useLoaderData } from "react-router-dom";
import DeleteReviewModal from "./DeleteReviewModal";
import OpenModalButton from '../OpenModalButton'
import CurrentReviewBox from "./CurrentReviewsBox";
import UpdateReviewModal from "./UpdateReviewModal";
import Spinner from "../Spinner";
import './CurrentReviewsPage.css' 

const CurrentReviewsPage = () => {
  const dispatch = useDispatch();
  const [rev2, setRev2] = useState([])

  const data = useLoaderData()
  const reviews = data.reviews ? data.reviews : []
  console.log(data, '*****LOADERDATA');

  useEffect(() => {
    dispatch(thunkUsersReviews())
    dispatch(thunkAllRestaurants())
  }, [dispatch])

  useEffect(() => {
    setRev2(reviews)
  }, [rev2])

  if (!reviews) {
    return <Spinner />
  }

  return (
    <>
      <div className="reviews">
        {rev2.map((review) => {
          return (
            <>
              <div className="review-box">
                <CurrentReviewBox review={review} key={review.id} />
                <div className="review-buttons">
                  < OpenModalButton className="review-modal-button"
                  modalComponent={<DeleteReviewModal restaurant_id={review.restaurant_id} rev2={rev2} setRev2={setRev2} id={review.id}/>}
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