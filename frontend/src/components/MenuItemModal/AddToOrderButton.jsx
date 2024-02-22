import { useDispatch, useSelector } from "react-redux"
import './MIM.css'
import { useCartContext } from "../../context/ShoppingCartContext";
import { orderItemsArray, thunkAddToOrder, thunkStartOrder } from "../../redux/orders";
import { useModal } from "../../context/Modal";

const AddToOrderButton = () => {
    const cart = useSelector(orderItemsArray)
    const order = useSelector((state) => state.orders?.current)
    const { menuItemId, price, restaurantId, itemQuantity } = useCartContext()
    const { closeModal } = useModal()
    const dispatch = useDispatch();
    const total = Number(price) * itemQuantity
    const clicker = async () => {
        if (cart.length < 1) {
            const newOrder = {
                menu_item_id: menuItemId,
                quantity,
                restaurant_id: restaurantId,
                status: "Open",
                driver: "",
                price: total,
            }
            console.log(newOrder)
            await dispatch(thunkStartOrder(newOrder))
        }
        else {
            const addToOrder = {
                order_id: order.id,
                menu_item_id: menuItemId,
                quantity: itemQuantity
            }

            await dispatch(thunkAddToOrder(addToOrder))
        }
        closeModal();
    }

    return (
        <div className="addToOrderButton" onClick={() => clicker()}>
            {`Add ${itemQuantity} to order • $${total}.00`}
        </div>
    )
}
export default AddToOrderButton
