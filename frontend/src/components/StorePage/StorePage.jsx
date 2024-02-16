import { useEffect, useState } from 'react'
import '../MainPage/Main.css'
import { thunkRestaurantByName } from '../../redux/restaurants'
import { useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../Spinner'

const StorePage = () => {
    const { name } = useParams();
    const [restaurantDetailsLoaded, setrestaurantDetailsLoaded] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        const thunkSender = async () => {
            await dispatch(thunkRestaurantByName(name))
        }
        thunkSender()
        setrestaurantDetailsLoaded(true)
    }, [dispatch])

    const restaurantDetails = useSelector((state) => state.restaurants[name])
    console.log(restaurantDetails)
    if (!restaurantDetailsLoaded) {
        return (
            <Spinner />
        )
    }

    return (
        <div>
            {/* {restaurantDetails.header && <div>
                <img src={restaurantDetails.header} className="storePageHeader" />
            </div>} */}
            <div className="storePageName">
                {restaurantDetails.name}
            </div>
            <div class="ratingDistanceDiv">
                <span>{restaurantDetails.starRating}</span>
                <span>{restaurantDetails?.distance}</span>
            </div>
            <div className="storePageButtonDiv">
                {/* <SeeSimilarButton /> */}
                {/* <GroupOrderButton/>
                <ScheduleButton/> */}
                {/* <DeliveryOrPickupButton /> */}
            </div>
            <div className="storePageReviews">
                <div className="reviewHeader">
                    <h3>From Customers</h3>
                    <span>Reviews from people who've ordered here</span>
                </div>
                <div className="reviewScrollbar">
                    {/* { restaurantDetails.reviews && restaurantDetails.reviews.map((review) => {
                    return (
                        <ReviewCell review=review/>
                    )
                })} */}
                </div>
            </div>
            <div className="MenuItemsScroller">
                {/* {restaurantDetails.menuItems && restaurantDetails.menuItems.map((menuItem) => {
                return (
                    <MenuItemCell item=menuItem/>
                )
            })} */}

            </div>


        </div>
    )
}

export default StorePage
