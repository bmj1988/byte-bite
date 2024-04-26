import { useEffect, useState } from "react"
import { restaurantsArray, thunkAllRestaurants } from "../../redux/restaurants"
import { useDispatch, useSelector } from 'react-redux'
import Spinner from "../Spinner"
import RestaurantTile from "./RestaurantTile"
import CategoryScroller from "./CategoryScroller"
import { FaArrowUp, FaArrowDown } from "react-icons/fa"
import MainPageBottomDiv from "./BottomDiv"
import BottomLine from "./BottomLine"

const MainPage = () => {
    const [loaded, setLoaded] = useState(false)
    const [page, setPage] = useState(1)
    const dispatch = useDispatch();
    const restaurants = useSelector(restaurantsArray)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        setLoaded(false)
        dispatch(thunkAllRestaurants(page)).then((total) => setTotal(total)).then(() => setLoaded(true))
    }, [dispatch, page])

    if (!loaded) {
        return (
            <Spinner />
        )
    }
    console.log(total)
    return (
        <>
            <CategoryScroller />
            <div className="arrowButtonWrapperDiv">
                <div className={page > 1 ? "arrowButtons" : "arrowButtonsUnavailable"} onClick={page > 1 ? () => setPage(page - 1) : null}>
                    <FaArrowUp />
                </div>
            </div>
            <div className="main_page_primary">
                {restaurants.map((restaurant) => {
                    return (
                        <RestaurantTile restaurantInfo={restaurant} key={restaurant.id} />
                    )
                })}
            </div>
            <div className="arrowButtonWrapperDiv">
                <div className={page * 12 < total ? "arrowButtons" : "arrowButtonsUnavailable"} onClick={page * 12 < total ? () => setPage(page + 1) : null}>
                    <FaArrowDown />
                </div>
            </div>
            <div className="mainBottomBreaker"></div>
            <MainPageBottomDiv />
            <BottomLine />
        </>
    )
}

export default MainPage
