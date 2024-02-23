import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkMyRestaurants, restaurantsArray } from "../../redux/restaurants";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import UpdateRestaurantModal from "./UpdateRestaurantModal";
import Spinner from "../Spinner";
import RestaurantTile from "../MainPage/RestaurantTile";
import CategoryScroller from "../MainPage/CategoryScroller";
import DeleteRestaurantModal from "./DeleteRestaurantModal";
import './CurrentRestaurantsPage.css';
import CurrentMenuItemsPage from "../CurrentMenuItemsPage/CurrentMenuItemsPage";
import { useNavigate } from "react-router-dom";

const CurrentRestaurantsPage = () => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const restaurants = useSelector(restaurantsArray);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(thunkMyRestaurants()).then(() => setLoaded(true));
  }, [dispatch]);

  if (!loaded) {
    return (
      <Spinner />
    );
  }

  const clicker = () => {
    navigate('/store/new')
  }

  return (
    <>
      {!restaurants.length && <div>
        <div className="noRestaurants">
        <h2 className="textmark">Looks like you have no restaurants!</h2>
        <div className="addToOrderButton restBut" onClick={() => clicker()}>
          <h3>Create a restaurant with ByteBite</h3>
        </div>
      </div>
      </div>
      }
      {restaurants.length > 0 &&
        <>
          <CategoryScroller />
          <div className="current_restaurants_container">
            {restaurants.map((restaurant) => {
              return (
                <div className="my-restaurant-tile">
                  <RestaurantTile restaurantInfo={restaurant} key={restaurant.id} />
                  <div className="my-restaurant-buttons">
                    <button className="restaurant-modal-button">
                      <OpenModalButton
                        modalComponent={<UpdateRestaurantModal restaurantName={restaurant.name} />}
                        buttonText="Update" />
                    </button>
                    <button className="restaurant-modal-button">
                      <OpenModalButton
                        modalComponent={<DeleteRestaurantModal id={restaurant.id} name={restaurant.name} />}
                        buttonText="Delete" />
                    </button>
                    <button className="restaurant-modal-button" >
                      <OpenModalButton
                        modalComponent={<CurrentMenuItemsPage id={restaurant.id} />}
                        buttonText="Menu" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      }
    </>
  );
};

export default CurrentRestaurantsPage;
