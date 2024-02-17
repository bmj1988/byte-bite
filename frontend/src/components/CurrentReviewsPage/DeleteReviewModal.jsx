import { useModal } from '../../context/Modal'
import { useDispatch } from 'react-redux'
import { thunkDeleteReview } from '../../redux/reviews'
import './DeleteReviewModal.css'

function DeleteReviewModal({restaurant_id}) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  function confirmDelete(restaurant_id, e) {
    e.preventDefault();
    return dispatch(thunkDeleteReview(restaurant_id))
    .then(closeModal)
  }

  return (
    <>
      <h2>Confirm Delete</h2>
      <label> Are you sure you want to delete this review?
        <div>
          <button onClick={(e) => confirmDelete(restaurant_id, e)}>Yes (Delete Review)</button>
          <button onClick={closeModal}>No (Keep Review)</button>
        </div>
      </label>
    </>
  )
}

export default DeleteReviewModal