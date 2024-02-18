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
    <div className='delete-modal'>
      <h2 className='confirm-delete'>Confirm Delete</h2>
      <label> Are you sure you want to delete this review?
        <div>
          <button className="yes-delete" onClick={(e) => confirmDelete(restaurant_id, e)}>Yes (Delete Review)</button>
          <button className="no-delete" onClick={closeModal}>No (Keep Review)</button>
        </div>
      </label>
    </div>
  )
}

export default DeleteReviewModal