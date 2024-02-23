import { FaRegTrashAlt } from "react-icons/fa"
import { thunkDeleteOrder } from "../../redux/orders"
import { useDispatch } from "react-redux"

const ClearCart = ({toggle, orderId}) => {
    const dispatch = useDispatch()

    const clearCart = async () => {
        await dispatch(thunkDeleteOrder(orderId))
        toggle()
    }

    return (
        <FaRegTrashAlt className="xIcon redIcon" onClick={() => clearCart()} />
    )
}

export default ClearCart
