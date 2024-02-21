import { useLoaderData, useLocation } from "react-router-dom";
import DetailsEdit from "../CheckoutPage/DetailsWithEditDiv";
import { FaChevronRight } from "react-icons/fa";
import { useDispatch } from "react-redux";

const OrderHistoryPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const orders = useLoaderData();
    console.log(orders)
    const firstTen = orders.orders.slice(0, 10)
    console.log(firstTen)

    const deleteOrder = async (orderId) => {
        const response = await fetch(`/api/orders/${orderId}`, {
            method: 'DELETE'
        })
        if (response.ok) {
            const result = await response.json()
            window.location.reload()
        }
    }

    return (
        <div>
            {firstTen.map((order) => {
                return (<DetailsEdit key={order.id} icon={<FaChevronRight />} bold={order.restaurant.name} sub={order.id} button={{ text: "Delete from history" }} clicker={() => deleteOrder(order.id)}/>)
            })}
        </div>
    )
}

export default OrderHistoryPage
