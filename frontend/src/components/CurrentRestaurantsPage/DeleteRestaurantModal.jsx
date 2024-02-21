import { useModal } from '../../context/Modal'
import { useDispatch } from 'react-redux'
import { thunkDeleteRestaurant } from '../../redux/restaurants'
import './DeleteRestaurantModal.css'

function DeleteRestaurantModal({id, name}) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  function confirmDelete(id, e) {
    e.preventDefault();
    return dispatch(thunkDeleteRestaurant(id))
    .then(closeModal)
  }

  return (
    <>
    <div className='delete-restaurant-modal'>
    <h2 className='delete-restaurant-h2'>Confirm Delete</h2>
    <label className='delete-restaurant-label'>Are you sure you want to delete this restaurant?
      <div>
        <button className="delete-restaurant-button" onClick={(e) => confirmDelete(id, e)}>Yes (Delete {name})</button>
        <button className='keep-restaurant' onClick={closeModal}>No (Keep {name})</button>
      </div>
    </label>
    </div>
    </>
  )
}

export default DeleteRestaurantModal;