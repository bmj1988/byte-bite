const DeliveryOption = ({ icon, bold, sub, black, surcharge, clicker }) => {

    const click = () => {
        if (clicker) {
            clicker()
        }
        return
    }

    return (
        <div className={black ? "detailsExterior blackBorder border-radius" : "detailsExterior grayBorder border-radius"} onClick={() => click()}>
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
