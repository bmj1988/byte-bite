import { useLocation, useSearchParams } from "react-router-dom"
import RestaurantTile from "../components/MainPage/RestaurantTile";
import { useEffect } from "react";
import { restaurantsArray, thunkSearchRestaurants } from "../redux/restaurants";
import { useDispatch, useSelector } from "react-redux";

const SearchPage = () => {
    const dispatch = useDispatch();
    const url = new URL(window.location.href)
    useEffect(() => {
        dispatch(thunkSearchRestaurants(url.search))
    }, [])

    const searched = useSelector(restaurantsArray)

    return (
        <div className="textmark searchMain">
            <h1>Search results</h1>

            <div className="main_page_primary">
                {searched.length > 0 && searched.map((rest) => {
                    return (
                        <RestaurantTile restaurantInfo={rest} />
                    )
                })}
                {searched.length < 1 && <div>
                    <h3>No restaurants were found that matched your search.</h3>
                </div>}
            </div>
        </div>
    )


}

export default SearchPage;
