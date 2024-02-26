import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from '../../context/Modal'
import { thunkUpdateRestaurant, restaurantByName } from "../../redux/restaurants";
import { categoriesArray } from "../../redux/categories";
import Select from "react-select";
import './UpdateRestaurantsModal.css'

const UpdateRestaurantModal = ({ restaurantName, restaurantId }) => {
  const dispatch = useDispatch()
  const { closeModal } = useModal()

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [image, setImage] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)

  const [errors, setErrors] = useState({}) 

  const categories = useSelector(categoriesArray)
  const restaurant = useSelector((state) => restaurantByName(state, restaurantName))

  useEffect(() => {
    if (restaurant) {
      setName(restaurant.name)
      setAddress(restaurant.address)
      setCity(restaurant.city)
      setState(restaurant.state)
      setImage(restaurant.image)

      const category = categories.find(category => category.id === restaurant.categoryId);
      if (category) {
        setSelectedCategory({
          value: restaurant.categoryId, label: (
            <div style={{ display: "flex", alignItems: "center" }} className="categories-map">
              <img src={category.image} alt={category.id} style={{ marginRight: 10, width: 30, height: 30 }} />
              {category.name}
            </div>
          )
        });
      }
    }
  }, [restaurant, categories])

  const customStyling = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px solid #ddd",
      padding: 10,
      display: "flex",
      alignItems: "center",
      alignSelf: "center",
      fontFamily: 'Rubik, sans-serif'
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: "#333",
      fontFamily: 'Rubik, sans-serif',
    })
  }

  const options = categories.map((category) => ({
    value: category.id,
    label: (
      <div style={{ display: "flex", alignItems: "center" }} className="categories-map">
        <img src={category.image} alt={category.id} style={{ marginRight: 10, width: 30, height: 30 }} />
        {category.name}
      </div>
    )
  }))

  const stateAbbreviations = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({})

    const restaurantDetails = {
      id: restaurantId,
      name,
      address,
      city,
      state,
      image,
      lat: 90,
      lng: 90,
      delivery: true,
      category_id: selectedCategory.value
    }

    const res = await dispatch(thunkUpdateRestaurant(restaurantDetails))

    const isValidUrl = /^https:\/\/.*$/.test(image) || /\.(png|jpe?g|gif)$/.test(image);
    if (!isValidUrl) {
      setErrors(prevErrors => ({
        ...prevErrors, 
        ...({image: 'Error: Please provide a valid image URL ending with .png, .jpeg, .jpg, or .gif'})
      }))
    }
    
    if (!selectedCategory) {
      setErrors(prevErrors => ({
        ...prevErrors, 
        ...({category: 'Error: Please select a category'})
      }))
    }

    if (!state) {
      setErrors(prevErrors => ({
        ...prevErrors, 
        ...({ state: 'Error Please select a state'})
      }))
    }
    
    if (res) {
      setErrors(prevErrors => ({
        ...prevErrors,
        ...(res.name && { name: 'Error: Invalid name' }),
        ...(res.address && { address: 'Error: Invalid address' }),
        ...(res.city && { city: 'Error: Invalid city' }),
        ...(res.image && { image: 'Error: Invalid image URL' }),
      }));
    } 

    if (res.ok) {
      setErrors({})
      closeModal()
    }
  }

  return (
    <>
      <div className="update-restaurant-modal">
        <h2 className="update-res-h2">Update {name}</h2>
        <form className="update-restaurant-form" onSubmit={handleSubmit}>
          <div>
            <label className="update-restaurant-label">Name</label>
            <input className="update-restaurant-input" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
            {errors && errors.name && <div className="error">{errors.name}</div>}
          </div>

          <div>
            <label className="update-restaurant-label">Address</label>
            <input className="update-restaurant-input" type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" required />
            {errors && errors.address && <div className="error">{errors.address}</div>}
          </div>

          <div>
            <label className="update-restaurant-label">City</label>
            <input className="update-restaurant-input" type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" required />
            {errors && errors.city && <div className="error">{errors.city}</div>}
          </div>

          <div>
          <label className="new-restaurant-label">State</label>
          <select className='new-restaurant-select' value={state} onChange={(e) => setState(e.target.value)}> 
            <option className='new-restaurant-option' value=''>Select</option>
            {stateAbbreviations.map(abbreviation => (
            <option key={abbreviation} value={abbreviation}>
              {abbreviation}
            </option>
            ))}
          </select>
          {errors && errors.state && <div className="error">{errors.state}</div>}
        </div>

          <div>
            <label className="update-restaurant-label">Image</label>
            <input className="update-restaurant-input" type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image" required />
            {errors && errors.image && <div className="error">{errors.image}</div>}
          </div>

          <div>
            <label className="new-restaurant-label">Category</label>
            <Select
              options={options}
              value={selectedCategory}
              onChange={setSelectedCategory}
              styles={customStyling}
              placeholder="Select a category"
            />
            {errors && errors.category && <div className="error">{errors.category}</div>}
          </div>

          <button className="update-restaurant-button" type="submit">Submit Changes</button>
          <button className="update-restaurant-cancel" onClick={closeModal}>Cancel</button>
        </form>
      </div>
    </>
  )
}

export default UpdateRestaurantModal;
