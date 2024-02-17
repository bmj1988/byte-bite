import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkMyRestaurants, restaurantsArray } from "../../redux/restaurants";
import Spinner from "../Spinner";
import RestaurantTile from "../MainPage/RestaurantTile";
import CategoryScroller from "../MainPage/CategoryScroller"

const CurrentRestaurantsPage = () => {
  const [loaded, setLoaded] = useState(false)
  const dispatch = useDispatch();
  const restaurants = useSelector(restaurantsArray)

  useEffect(() => {
    dispatch(thunkMyRestaurants()).then(() => setLoaded(true))
  }, [dispatch])

  if (!loaded) {
    return (
      <Spinner/>
    )
  }

  return (
    <>
    <CategoryScroller />
    <div className="main_page_primary">
    {restaurants.map((restaurant) => {
        return (
          <>
            <RestaurantTile restaurantInfo={restaurant} key={restaurant.id}/>
            <div className="my-restaurant-buttons">
              <button>Update</button>
              <button>Delete</button>
              <button>Menu</button>
            </div>
          </>
        )
    })}
    </div>
    </>
)
}

export default CurrentRestaurantsPage;