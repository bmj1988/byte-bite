import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import DetailsEdit from "../CheckoutPage/DetailsWithEditDiv";
import { FaChevronRight } from "react-icons/fa";

const OrderHistoryPage = () => {
    const navigate = useNavigate();
    const orders = useLoaderData();
    const firstTen = orders.orders.slice(0, 10)

    // const deleteOrder = async (orderId) => {
    //     const response = await fetch(`/api/orders/${orderId}`, {
    //         method: 'DELETE'
    //     })
    //     if (response.ok) {
    //         const result = await response.json()
    //         window.location.reload()
    //     }
    // }

    const reorder = async (order) => {
        const response = await fetch('/api/orders/reorder', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(order)
        })
        if (response.ok) navigate('/checkout')
        else {
            const err = await response.json();
            console.log(err)
        }
    }

    return (
        <div>
            {firstTen.map((order) => {
                return (<DetailsEdit key={order.id} icon={<FaChevronRight />} bold={order.restaurant.name} sub={`$${(order.price).toFixed(2)}`} button={{ text: "Reorder" }} clicker={() => reorder(order)} />)
            })}
        </div>
    )
}

export default OrderHistoryPage
