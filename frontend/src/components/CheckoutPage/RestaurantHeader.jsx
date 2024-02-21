const RestaurantHeader = ({image, name}) => {
    return (

        <div className="detailsInterior textmark restaurantHeader">
            <img src={image} className="restaurantHeaderImg"/>
            <h1>{name}</h1>
        </div>
    )
}

export default RestaurantHeader
