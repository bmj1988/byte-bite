import { useEffect, useState } from 'react'
import { restaurantByName, thunkRestaurantByName } from '../../redux/restaurants'
import { reviewsArray, thunkRestaurantsReviews } from '../../redux/reviews'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import OpenModalButton from '../OpenModalButton'
import Spinner from '../Spinner'
import MenuItems from './MenuItems'
import SeeSimilarButton from './SeeSimilarButton'
import GroupOrderButton from './GroupByOrderButton'
import ScheduleButton from './ScheduleButton'
import DeliveryOrPickupButton from './DeliveryOrPickupButton'
import PaginatedReviewScroller from './PaginatedReviewScroller'
import RatingDistanceDiv from './RatingDistanceDiv'
import NewReviewModal from '../NewReviewModal/NewReviewModal'
import './StorePage.css'

const StorePage = () => {
    const { name } = useParams();
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const thunkSender = async () => {
            await dispatch(thunkRestaurantByName(name))
            setLoaded(true)
        }
        thunkSender()
    }, [dispatch, name])

    const restaurantDetails = useSelector((state) => restaurantByName(state, name))
    const currentUser = useSelector((state) => state.session.user)
    const reviews = restaurantDetails?.Reviews
    const owner = currentUser?.id === restaurantDetails?.ownerId
    const reviewed = reviews?.filter(review => review.user_id === currentUser?.id)

    if (!restaurantDetails && !loaded) {
        return (
            <Spinner />
        )
    }

    if (loaded && !restaurantDetails) {
        navigate('/404')
    }
console.log(loaded)
    return (
        <div className='storePageMainDiv'>
            {/* {restaurantDetails.header && <div>
                <img src={restaurantDetails.header} className="storePageHeader" />
            </div>} */}
            <div className="storePageName">
                {restaurantDetails.name}
            </div>
            <RatingDistanceDiv restaurantDetails={restaurantDetails} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="storePageButtonDiv">
                    <SeeSimilarButton />
                    <GroupOrderButton />
                    <ScheduleButton />
                </div>
                <DeliveryOrPickupButton />
            </div>
            <div className="storePageReviews">
                <div className="reviewHeader">
                    <h2>From customers</h2>
                    <span>Reviews from people who've ordered here</span>
                    <div className='review-button'>
                    {currentUser && !owner && reviewed?.length === 0 && <OpenModalButton
                    modalComponent={<NewReviewModal restaurant_id={restaurantDetails.id} restaurantName={restaurantDetails.name}/>}
                    buttonText="Leave a review"
                    />}
                    </div>
                </div>
                <div className="reviewScrollbar">
                    <PaginatedReviewScroller reviews={restaurantDetails.Reviews} />
                </div>
            </div>
            <h2>Menu items</h2>
            <MenuItems menuItemsArray={restaurantDetails.MenuItems} />

        </div>
    )
}

export default StorePage
