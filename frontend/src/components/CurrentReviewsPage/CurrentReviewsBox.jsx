import { useSelector } from "react-redux"
import { restaurantById } from "../../redux/restaurants";
import { FaStar } from "react-icons/fa"
import { useNavigate } from "react-router-dom";
import icons from '../StorePage/utils/iconsForReviewBox'
import colors from '../StorePage/utils/colorsForReviewBox'
import Spinner from "../Spinner";
import './CurrentReviewsBox.css'

const CurrentReviewBox = ({ review }) => {
  const navigate = useNavigate()
  const randomIconIndex = Math.floor(Math.random() * icons.length);
  const randomIcon = icons[randomIconIndex]
  const color = colors[Math.floor(Math.random() * colors.length)]

  const id = review.restaurant_id
  const reviewedRestaurant = useSelector((state) => restaurantById(state, id))

  if (!reviewedRestaurant) {
    return (
      <Spinner />
    )
  }

  return (
    <div className="current-reviewBox">
      <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
        <div style={{ display: 'flex', background: color, borderRadius: '50%', justifyContent: 'center', alignItems: 'center', padding: '6px', marginRight: '5px' }}>
          {randomIcon} 
          
        </div>
        <button className="currentReviewBoxName" onClick={() => navigate(`/store/${reviewedRestaurant.name}`)}>{reviewedRestaurant.name}</button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <p className="reviewBoxText">{`${review.review}`}</p>
      <div className="review-stars">{review.stars}<FaStar style={{ fontSize: '12', color: 'black' }} /></div>
      </div>
    </div>
  )
}

export default CurrentReviewBox;