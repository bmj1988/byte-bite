import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { restaurantByName, thunkRestaurantById } from "../../redux/restaurants";

const StorePage = () => {
  const dispatch = useDispatch();
  const { name } = useParams();

  const restaurant = useSelector((state) => restaurantByName(state, name))

  useEffect(() => {
    dispatch(thunkRestaurantById(name))
  }, [dispatch])

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