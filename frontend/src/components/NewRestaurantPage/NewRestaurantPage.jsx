import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkNewRestaurant } from "../../redux/restaurants"
import { categoriesArray, thunkCategories } from "../../redux/categories";
import { useNavigate } from "react-router-dom";
import Select from "react-select"
import './NewRestaurantPage.css'

const NewRestaurantPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const categories = useSelector(categoriesArray)

  const [errors, setErrors] = useState({}) 

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [image, setImage] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)

  useEffect(() => {
    dispatch(thunkCategories())
  }, [dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({})

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

    const restaurantDetails = {
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
    
    const res = await dispatch(thunkNewRestaurant(restaurantDetails))

    if (res.error) {
      setErrors(prevErrors => ({
        ...prevErrors,
        ...(res.error.name && { name: 'Error: Invalid name' }),
        ...(res.error.address && { address: 'Error: Invalid address' }),
        ...(res.error.city && { city: 'Error: Invalid city' }),
        ...(res.error.image && { image: 'Error: Invalid URL' })
      }));
    } else {
      setErrors({})
      navigate(`/store/${name}`)
    }
    
  }

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
    singleValue : (provided, state) => ({
      ...provided,
      color: "#333",
      fontFamily: 'Rubik, sans-serif',
    })
  }

  const options = categories.map((category) => ({
    value: category.id,
    label: (
      <div style={{ display: "flex", alignItems: "center" }} className="categories-map">
        <img src={category.image} alt={category.id} style={{ marginRight: 10, width: 30, height: 30}}/>
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

  return (
    <>
      <h2 className="new-restaurant-h2">Create New Restaurant</h2>
      <form className="new-restaurant-form" onSubmit={handleSubmit}>
        <div>
          <label className="new-restaurant-label">Name</label>
          <input className="new-restaurant-input" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required maxLength={40}/>
          {errors && errors.name && <div className="error">{errors.name}</div>}
        </div>

        <div>
          <label className="new-restaurant-label">Address</label>
          <input className="new-restaurant-input" type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" required maxLength={255}/>
          {errors && errors.address && <div className="error">{errors.address}</div>}
        </div>

        <div>
          <label className="new-restaurant-label">City</label>
          <input className="new-restaurant-input" type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" required maxLength={40}/>
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
          <label className="new-restaurant-label">Image</label>
          <input className="new-restaurant-input" type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image" required maxLength={255}/>
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

        <button className="new-restaurant-submit" type="submit">Create Restaurant</button>
      </form>
    </>
  )
}

export default NewRestaurantPage;