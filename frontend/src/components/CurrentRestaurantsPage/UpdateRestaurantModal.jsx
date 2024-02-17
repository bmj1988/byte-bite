import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from '../../context/Modal'
import { thunkUpdateRestaurant, restaurantByName } from "../../redux/restaurants";
import './UpdateRestaurantsModal.css'

const UpdateRestaurantModal = ({restaurantName}) => {
  const dispatch = useDispatch()
  const { closeModal } = useModal()

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [image, setImage] = useState('')
  const [delivery, setDelivery] = useState(true)
  const [categoryId, setCategoryId] = useState('')

  const restaurant = useSelector((state) => restaurantByName(state, restaurantName))

  useEffect(() => {
    if (restaurant) {
      setName(restaurant.name)
      setAddress(restaurant.address)
      setCity(restaurant.city)
      setState(restaurant.state)
      setImage(restaurant.image)
      setDelivery(restaurant.delivery)
      setCategoryId(restaurant.categoryId)
    }
  }, [restaurant])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const restaurantDetails = {
      id: restaurant.id,
      name,
      address,
      city,
      state,
      image,
      lat: 90,
      lng: 90,
      delivery,
      category_id: categoryId
    }

    dispatch(thunkUpdateRestaurant(restaurantDetails))
    closeModal()
  }

  return (
    <>
    <div className="update-restaurant-modal">
      <h2 className="update-res-h2">Update Restaurant</h2>
      <form className="update-restaurant-form" onSubmit={handleSubmit}>
        <div>
          <label className="update-restaurant-label">Name</label>
          <input className="update-restaurant-input" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required/>
        </div>

        <div>
          <label className="update-restaurant-label">Address</label>
          <input className="update-restaurant-input" type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" required/>
        </div>

        <div>
          <label className="update-restaurant-label">City</label>
          <input className="update-restaurant-input" type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" required/>
        </div>

        <div>
          <label className="update-restaurant-label">State</label>
          <input className="update-restaurant-input" type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="State" required/>
        </div>

        <div>
          <label className="update-restaurant-label">Image</label>
          <input className="update-restaurant-input" type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image" required/>
        </div>

        <div>
          <label className="update-restaurant-label">Delivery</label>
          <input className="update-restaurant-input" type="checkbox" value={delivery} onChange={(e) => setDelivery(e.target.checked)}/>
        </div>

        <div>
          <label className="update-restaurant-label">Category ID</label>
          <input className="update-restaurant-input" type="number" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} placeholder="Category ID" required/>
        </div>

        <button className="update-restaurant-button" type="submit">Update {restaurantName}</button>
      </form>
    </div>
    </>
  )
}

export default UpdateRestaurantModal;