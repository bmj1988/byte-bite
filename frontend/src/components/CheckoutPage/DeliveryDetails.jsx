import DetailsEdit from "./DetailsWithEditDiv"

const DeliveryDetails = ({ header, items }) => {

    return (
        <div className="deliveryDetailsMain">
            <h1>{header}</h1>
            {items.map((item) => <DetailsEdit icon={item.icon} bold={item.bold} sub={item.sub} button={item.button} surcharge={item.surcharge} />)}
        </div>
    )
}

export default DeliveryDetails
