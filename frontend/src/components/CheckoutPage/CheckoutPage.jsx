import { useLoaderData } from "react-router-dom"
import LogoDiv from "../Navigation/LogoDiv"
import ProfileBars from "../Navigation/ProfileBars"
import { FaBolt, FaCalendarDay, FaCreditCard, FaMapMarkerAlt, FaShoppingBag, FaTag, FaUser } from "react-icons/fa";
import RestaurantHeader from "./RestaurantHeader";
import DeliveryDetailsForm from "./DeliveryDetailsForm";
import './checkout.css'
import OrderTotal from "./OrderTotal/OrderTotal";

const CheckoutPage = () => {
    const loader = useLoaderData();
    const order = loader.order
    const items = loader.items
    if (!loader?.order) return <div></div>

    return (
        <div className="checkoutMain">
            <nav className="checkout">
                <ProfileBars />
                <LogoDiv />
            </nav>
            <div style={{display: 'flex', gap: '20px'}}>
            <div name="delivery" className="deliveryMain">
            <RestaurantHeader image={order.restaurant.image} name={order.restaurant.name} />
            <DeliveryDetailsForm order={order} items={items}/>
            </div>
            <OrderTotal order={order} price={Number(order.price)} />
            </div>
        </div>
    )
}

export default CheckoutPage
