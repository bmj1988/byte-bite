import { useDispatch } from "react-redux"
import './MIM.css'
import { useCartContext } from "../../context/ShoppingCartContext";

const AddToOrderButton = () => {
    const {menuItemId, price, quantity} = useCartContext()
    const dispatch = useDispatch();

    const clicker = () => {
        dispatch(thunkStart)
    }

    return (
        <div className="addToOrderButton">
            {`Add ${quantity} to order • $${Number(price) * quantity}.00`}
        </div>
    )
}
export default AddToOrderButton
