import { useNavigate } from "react-router-dom"

const RestaurantTile = ({ restaurantInfo }) => {

    const navigate = useNavigate();
    const handleClick = async () => {
        navigate(`/store/${restaurantInfo.name}`, {state: { name: restaurantInfo.name}})
    }

    const reviews = restaurantInfo?.Reviews
    const avgStarRating = reviews?.length > 0 ?
    Math.round((reviews.reduce((acc, val) => acc + val.stars, 0) / reviews.length) * 10) / 10 :
    0;


    return (
        <div className="restaurant_div" onClick={handleClick}>
            <img className="restaurant_image" src={restaurantInfo.image} />
            <div className="restaurant_details">
                <p className="restaurant_name">{`${restaurantInfo.name} (${restaurantInfo.address})`}</p>
                <div className="restaurant_rating">
                    {avgStarRating > 0 && <div className="ratingText">{avgStarRating}</div>}
                    {!avgStarRating && <div className="ratingText">{'NEW'}</div>}
                </div>
            </div>
        </div>
    )
}

export default RestaurantTile
