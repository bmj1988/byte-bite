import { useEffect, useState } from "react"
import { restaurantsArray, thunkAllRestaurants } from "../../redux/restaurants"
import { useDispatch, useSelector } from 'react-redux'
import Spinner from "../Spinner"
import RestaurantTile from "./RestaurantTile"

const MainPage = () => {
    const [loaded, setLoaded] = useState(false)
    const dispatch = useDispatch();
    const restaurants = useSelector(restaurantsArray)

    useEffect(() => {
        dispatch(thunkAllRestaurants()).then(() => setLoaded(true))
    }, [dispatch])

    if (!loaded) {
        return (
            <Spinner/>
        )
    }

    return (
        <div className="main_page_primary">
        {restaurants.map((restaurant) => {
            return (
                <RestaurantTile restaurantInfo={restaurant} key={restaurant.id}/>
            )
        })}
        </div>
    )
}

export default MainPage
