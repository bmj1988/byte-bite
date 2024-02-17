import { useModal } from '../../context/Modal'
import { useDispatch } from 'react-redux'
import { thunkDeleteRestaurant } from '../../redux/restaurants'

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
    <h2>Confirm Delete</h2>
    <label>Are you sure you want to delete this restaurant?
      <div>
        <button onClick={(e) => confirmDelete(id, e)}>Yes (Delete {name})</button>
        <button>No (Keep {name})</button>
      </div>
    </label>
    </>
  )
}

export default DeleteRestaurantModal;