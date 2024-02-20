const DeliveryOption = ({ icon, bold, sub, button, surcharge }) => {

    return (
        <div className="detailsExterior grayBorder border-radius">
            <div className="detailsInterior restaurantHeader ">
                {icon}
                <div>
                    <p className="bold">{bold}</p>
                    {sub && <p style={{fontWeight:"400"}}>{sub}</p>}
                </div>
            </div>
            {surcharge && <p>{`+ $${surcharge}`}</p>}
        </div>
    )
}

export default DeliveryOption
