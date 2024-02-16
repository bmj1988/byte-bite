import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { restaurantByName, thunkRestaurantById } from "../../redux/restaurants";
import { thunkRestaurantsReviews } from "../../redux/reviews";

const StorePage = () => {
  const dispatch = useDispatch();
  const { name } = useParams();

  const restaurant = useSelector((state) => restaurantByName(state, name))
  console.log(restaurant.id, "******")
  const id = restaurant.id

  useEffect(() => {
    dispatch(thunkRestaurantById(name))
    dispatch(thunkRestaurantsReviews(id))
  }, [dispatch, name, id])

  return (
    <>
      <h2>StorePage</h2>
      <img src={restaurant.image}/>
      <div>{restaurant.name}</div>
      <div>{restaurant.address}</div>
      <div>{restaurant.city}</div>
      <div>{restaurant.state}</div>
    </>
  )
}

export default StorePage