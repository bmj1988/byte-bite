import { useEffect } from 'react'
import './StorePage.css'
import { restaurantByName, thunkRestaurantByName } from '../../redux/restaurants'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../Spinner'
import MenuItems from './MenuItems'
import SeeSimilarButton from './SeeSimilarButton'
import GroupOrderButton from './GroupByOrderButton'
import ScheduleButton from './ScheduleButton'
import DeliveryOrPickupButton from './DeliveryOrPickupButton'
import PaginatedReviewScroller from './PaginatedReviewScroller'
import RatingDistanceDiv from './RatingDistanceDiv'

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

    console.log(`!!!!`, restaurantDetails)
    if (!restaurantDetails) {
        return (
            <Spinner />
        )
    }

    const reviews = restaurantDetails.Reviews

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
