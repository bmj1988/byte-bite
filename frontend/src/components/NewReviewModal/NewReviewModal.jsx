import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { useModal } from '../../context/Modal'
import { thunkNewReview } from '../../redux/reviews'
import StarRatings from 'react-star-ratings'
import './NewReviewModal.css'

function NewReviewModal({restaurant_id, restaurantName}) {
  const { closeModal } = useModal()
  const dispatch = useDispatch()

  const [review, setReview] = useState('')
  const [stars, setStars] = useState(0)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewDetails = {
      review,
      stars,
      restaurant_id
    }

    const res = await dispatch(thunkNewReview(reviewDetails))
    
      closeModal()
    
    }


  return (
    <div className='review-modal'>
    <h2 className='review-h2'>Update Review</h2>
    <form className='new-review-form' onSubmit={handleSubmit}>
        <div className='review-container'>
        <textarea className='review-textarea' 
        value={review} onChange={(e) => setReview(e.target.value)} 
        rows={4} cols={38}/>
          <StarRatings 
          rating={stars}
          starRatedColor='black'
          changeRating={(newRating) => setStars(newRating)}
          numberOfStars={5}
          name='rating'
          starDimension='45px'
          starSpacing='5px'
          starHoverColor='gold'/>
        </div>
      <button className="new-review-button" type='submit'>Review {restaurantName}</button>
    </form>
    </div>
  )
}

export default NewReviewModal;