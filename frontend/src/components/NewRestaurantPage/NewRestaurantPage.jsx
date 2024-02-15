import { useState } from "react"
import { useDispatch } from "react-redux"
import { thunkNewRestaurant } from "../../redux/restaurants"

const NewRestaurantPage = () => {
  const dispatch = useDispatch()

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
    
    dispatch(thunkNewRestaurant(restaurantDetails))
  }

  return (
    <>
      <h2>Create New Restaurant</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required/>
          {errors && errors.name && <div className="error">{errors.name}</div>}
        </div>

        <div>
          <label>Address</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" required/>
          {errors && errors.address && <div className="error">{errors.address}</div>}
        </div>

        <div>
          <label>City</label>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" required/>
          {errors && errors.city && <div className="error">{errors.city}</div>}
        </div>

        <div>
          <label>State</label>
          <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="State" required/>
          {errors && errors.state && <div className="error">{errors.state}</div>}
        </div>

        <div>
          <label>Image</label>
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image" required/>
          {errors && errors.image && <div className="error">{errors.image}</div>}
        </div>

        <div>
          <label>Delivery</label>
          <input type="checkbox" value={delivery} onChange={(e) => setDelivery(e.target.checked)}/>
        </div>

        <div>
          <label>Category ID</label>
          <input type="number" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} placeholder="Category ID" required/>
        </div>

        <button type="submit">Create Restaurant</button>
      </form>
    </>
  )
}

export default NewRestaurantPage;