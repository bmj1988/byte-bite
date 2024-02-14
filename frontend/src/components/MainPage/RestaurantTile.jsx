import { useNavigate } from "react-router-dom"

const RestaurantTile = ({ restaurantInfo }) => {

    const navigate = useNavigate();
    const handleClick = async () => {
        navigate(`/store/${restaurantInfo.name}`)
    }

    return (
        <div className="restaurant_div" onClick={handleClick}>
            <img className="restaurant_image" src={restaurantInfo.image} />
            <div className="restaurant_details">
                <p className="restaurant_name">{`${restaurantInfo.name} (${restaurantInfo.address})`}</p>
                <div className="restaurant_rating">
                    {restaurantInfo.starRating && <div className="ratingText">{restaurantInfo.starRating}</div>}
                    {!restaurantInfo.starRating && <div className="ratingText">{'NEW'}</div>}
                </div>
            </div>
        </div>
    )
}

export default RestaurantTile
