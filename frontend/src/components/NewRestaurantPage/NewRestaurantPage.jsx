import { useState } from "react"
import { useDispatch } from "react-redux"
import { thunkNewRestaurant } from "../../redux/restaurants"
import { useNavigate } from "react-router-dom";
import './NewRestaurantPage.css'

const NewRestaurantPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [errors, setErrors] = useState({}) //need to figure this out

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [image, setImage] = useState('')
  const [delivery, setDelivery] = useState(true)
  const [categoryId, setCategoryId] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();

    const restaurantDetails = {
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
    
    await dispatch(thunkNewRestaurant(restaurantDetails))
    navigate(`store/${name}`)
  }

  return (
    <>
      <h2 className="new-restaurant-h2">Create New Restaurant</h2>
      <form className="new-restaurant-form" onSubmit={handleSubmit}>
        <div>
          <label className="new-restaurant-label">Name</label>
          <input className="new-restaurant-input" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required/>
          {errors && errors.name && <div className="error">{errors.name}</div>}
        </div>

        <div>
          <label className="new-restaurant-label">Address</label>
          <input className="new-restaurant-input" type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" required/>
          {errors && errors.address && <div className="error">{errors.address}</div>}
        </div>

        <div>
          <label className="new-restaurant-label">City</label>
          <input className="new-restaurant-input" type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" required/>
          {errors && errors.city && <div className="error">{errors.city}</div>}
        </div>

        <div>
          <label className="new-restaurant-label">State</label>
          <input className="new-restaurant-input" type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="State" required/>
          {errors && errors.state && <div className="error">{errors.state}</div>}
        </div>

        <div>
          <label className="new-restaurant-label">Image</label>
          <input className="new-restaurant-input" type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image" required/>
          {errors && errors.image && <div className="error">{errors.image}</div>}
        </div>

        <div>
          <label className="new-restaurant-label">Delivery</label>
          <input className="new-restaurant-input" type="checkbox" value={delivery} onChange={(e) => setDelivery(e.target.checked)}/>
        </div>

        <div>
          <label className="new-restaurant-label">Category ID</label>
          <input className="new-restaurant-input" type="number" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} placeholder="Category ID" required/>
        </div>

        <button className="new-restaurant-submit" type="submit">Create Restaurant</button>
      </form>
    </>
  )
}

export default NewRestaurantPage;