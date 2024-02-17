import './StorePage.css'
import { FaStar } from 'react-icons/fa'
const RatingDistanceDiv = ({ restaurantDetails }) => {

    return (<div className="ratingDistanceDiv">
        <span>{`${restaurantDetails.starRating}`}</span>
        <FaStar style={{ fontSize: '12px', marginRight: '5px' }} />
        <span style={{ color: 'gray', fontSize: '14px' }}>{`(${restaurantDetails.numReviews})`}</span>
        <span>{restaurantDetails?.distance}</span>
    </div>)
}
export default RatingDistanceDiv
