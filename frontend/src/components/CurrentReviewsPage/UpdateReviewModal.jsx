import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useModal } from '../../context/Modal'
import { thunkUpdateReview, reviewsArray } from '../../redux/reviews'
import StarRatings from 'react-star-ratings';
import './UpdateReviewModal.css'

function UpdateReviewModal({restaurant_id}) {
  const { closeModal } = useModal()
  const dispatch = useDispatch()

  const [review, setReview] = useState('')
  const [stars, setStars] = useState(0)

  const [errors, setErrors] = useState({})

  const reviews = useSelector(reviewsArray)
  const targetReview = reviews.find(review => review.restaurant_id == restaurant_id)
  
  useEffect(() => {
    if (targetReview) {
      setReview(targetReview.review)
      setStars(targetReview.stars)
    }
  }, [targetReview])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewDetails = {
      review,
      stars,
      restaurant_id
    }

    const res = await dispatch(thunkUpdateReview(reviewDetails))
    if (res) {
      setErrors({error: 'Review cannot be blank'})
    } else {
      closeModal()
    }
  }

  return (
    <div className='update-modal'>
    <h2 className='update-h2'>Update Review</h2>
    <form className='update-review-form' onSubmit={handleSubmit}>
        <div className='review-container'>
        <textarea className='review-textarea' 
        value={review} onChange={(e) => setReview(e.target.value)} 
        rows={4} cols={38}/>
          <StarRatings 
          rating={stars}
          starRatedColor='gold'
          changeRating={(newRating) => setStars(newRating)}
          numberOfStars={5}
          name='rating'
          starDimension='45px'
          starSpacing='5px'
          starHoverColor='gold'/>
          {errors && <div className='error'>{errors.error}</div>}
        </div>
      <button className="update-review-button" type='submit'>Submit Change</button>
    </form>
    </div>
  )
}

export default UpdateReviewModal;