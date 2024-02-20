import { FaBolt, FaCalendarDay, FaCreditCard, FaMapMarkerAlt, FaShoppingBag, FaTag, FaUser } from "react-icons/fa"
import DetailsEdit from "./DetailsWithEditDiv"
import DeliveryOption from "./DeliveryOptions"
import OrderSummary from "./OrderSummary"

const DeliveryDetailsForm = ({ order, items }) => {
    let address = order?.address || "123 Fake St" /// STAND INS UNTIL I CAN GET THE DB CHANGED TO GIVE US THESE VALUES
    let state = order?.state || "NY"
    let city = order?.city || "New York"

    return (
        <>
            <div className="deliveryDetailsMain borderRadTopDiv">
                <h2 className="textmark">{`Delivery details`}</h2>
                <DetailsEdit name="address" icon={<FaMapMarkerAlt className="icon" />} bold={address} sub={`${city}, ${state}`} button={{ text: "Edit" }} />
                <div className="slightBreak"></div>
                <DetailsEdit name="instructions" icon={<FaUser className="icon" />} bold={"Meet me at my door"} sub={`Add delivery instructions`} button={{ text: "Edit" }} />
            </div>
            <div className="breaker"></div>
            <div className="deliveryDetailsMain">
                <div className="restaurantHeader deliveryOptions">
                    <h2 className="textmark">{`Delivery estimate`}</h2>
                    <DeliveryOption name="priority" icon={<FaBolt style={{ fontSize: '20px', color: 'green' }} />} bold={'Priority'} sub={`${order?.minTime || "10"}-${order?.maxTime || '25 min • Delivery directly to you'}`} surcharge={order?.prioritySurcharge || 2} />
                    <DeliveryOption name="priority" icon={<FaShoppingBag className="icon" />} bold={'Standard'} sub={`${order?.minTime || "15"}-${order?.maxTime || '30 min'}`} />
                    <DeliveryOption name="schedule" icon={<FaCalendarDay className="icon" />} bold={'Schedule'} sub={'Select a time'} />
                </div>
            </div>
            <div className="breaker"></div>
            <div className="deliveryDetailsMain">
                <h2 className="textmark">{`Payment`}</h2>
                <DetailsEdit name="card" icon={<FaCreditCard className="icon" />} bold={"Credit Card"} sub={`${order?.user?.cardOnFile || "+ Visa ••••1234"}`} button={{ text: "Edit" }} />
                <div className="slightBreak"></div>
                <DetailsEdit name="instructions" icon={<FaTag className="icon" />} bold={"Add promo code"} button={{ text: "Add" }} />
            </div>
            <div className="breaker"></div>
            <OrderSummary items={items} />
        </>

        // const paymentDetails = {
        //     header: "Payment",
        //     items: [
        //         {
        //             icon: <FaCreditCard />,
        //             bold: "Credit Card",
        //             sub: `${order?.user?.cardOnFile || "+ Visa ••••1234"}`, /// COULD CAUSE A PROBLEM, IF ERRORS PULL INTO {${}  || ""}
        //             button: {text: 'Edit'},
        //             surcharge: null
        //         },
        //         {
        //             icon: <FaTag />,
        //             bold: "Add promo code",
        //             sub: null,
        //             button: null,
        //             surcharge: null
        //         },
        //     ]
        // }
    )
}
export default DeliveryDetailsForm
