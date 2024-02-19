import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useModal } from '../../context/Modal'
import { thunkUpdateReview, reviewsArray } from '../../redux/reviews'
import './UpdateReviewModal.css'

function UpdateReviewModal({restaurant_id}) {
  const { closeModal } = useModal()
  const dispatch = useDispatch()

  const [review, setReview] = useState('')
  const [stars, setStars] = useState(0)

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

    dispatch(thunkUpdateReview(reviewDetails))
    closeModal()
  }

  return (
    <div className='update-modal'>
    <h2 className='update-h2'>Update Review</h2>
    <form onSubmit={handleSubmit}>
      <label> Review 
        <input type='text' value={review} onChange={(e) => setReview(e.target.value)}/>
        <input type='number' value={stars} onChange={(e) => setStars(e.target.value)} />
      </label>
      <button className="update-review-button" type='submit'>Submit Change</button>
    </form>
    </div>
  )
}

export default UpdateReviewModal;