import { useEffect } from 'react'
import './StorePage.css'
import { restaurantByName, thunkRestaurantByName } from '../../redux/restaurants'
import { reviewsArray } from '../../redux/reviews'
import { useParams } from 'react-router-dom'
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

const StorePage = () => {
    const { name } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const thunkSender = async () => {
            await dispatch(thunkRestaurantByName(name))
        }
        thunkSender()
    }, [dispatch, name])

    const restaurantDetails = useSelector((state) => restaurantByName(state, name))
    const currentUser = useSelector((state) => state.session.user)
    const reviews = useSelector(reviewsArray)

    const owner = currentUser?.id === restaurantDetails?.ownerId
    const reviewed = reviews && reviews.filter(review => review.user_id === currentUser.id)

    if (!restaurantDetails) {
        return (
            <Spinner />
        )
    }

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
                    {!owner && reviewed.length === 0 && <OpenModalButton 
                    modalComponent={<NewReviewModal restaurant_id={restaurantDetails.id} restaurantName={restaurantDetails.name}/>}
                    buttonText="Leave your review" 
                    />}
                    </div>
                </div>
                <div className="reviewScrollbar">
                    <PaginatedReviewScroller reviews={reviews} />
                </div>
            </div>
            <h2>Menu items</h2>
            <MenuItems menuItemsArray={restaurantDetails.MenuItems} />

        </div>
    )
}

export default StorePage
