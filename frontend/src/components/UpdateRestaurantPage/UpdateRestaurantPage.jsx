import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { thunkRestaurantById, thunkUpdateRestaurant } from "../../redux/restaurants";
import Spinner from "../Spinner"

const UpdateRestaurantPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { restaurantId } = useParams()
  
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [image, setImage] = useState('')
  const [delivery, setDelivery] = useState(true)
  const [categoryId, setCategoryId] = useState('')
  
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const id = restaurantId
    dispatch(thunkRestaurantById(id)).then(() => setLoaded(true))
  }, [dispatch, restaurantId]) 

  if (!loaded) {
    return (
      <Spinner />
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const restaurantDetails = {
      id: restaurantId,
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
    navigate('/') //switch to restaurant page when built
  }

  return (
    <>
      <h2>Update Restaurant</h2>
      <div>{restaurantId}</div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required/>
        </div>

        <div>
          <label>Address</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" required/>
        </div>

        <div>
          <label>City</label>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" required/>
        </div>

        <div>
          <label>State</label>
          <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="State" required/>
        </div>

        <div>
          <label>Image</label>
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image" required/>
        </div>

        <div>
          <label>Delivery</label>
          <input type="checkbox" value={delivery} onChange={(e) => setDelivery(e.target.checked)}/>
        </div>

        <div>
          <label>Category ID</label>
          <input type="number" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} placeholder="Category ID" required/>
        </div>

        <button type="submit">Update restaurant.name (fix)</button>
      </form>
    </>
  )
}

export default UpdateRestaurantPage;