import './StorePage.css'
import { FaStar } from 'react-icons/fa'
const RatingDistanceDiv = ({ restaurantDetails }) => {

    const reviews = restaurantDetails?.Reviews;
    const avgStarRating = reviews.length ? reviews?.reduce((acc, val) => acc + val.stars, 0, )/parseInt(restaurantDetails?.numReviews) : 'NEW'

    return (<div className="ratingDistanceDiv">
        <span>{avgStarRating}</span>
        <FaStar style={{ fontSize: '12px', marginRight: '5px' }} />
        <span style={{ color: 'gray', fontSize: '14px' }}>{`(${restaurantDetails.numReviews})`}</span>
        <span>{restaurantDetails?.distance}</span>
    </div>)
}
export default RatingDistanceDiv
