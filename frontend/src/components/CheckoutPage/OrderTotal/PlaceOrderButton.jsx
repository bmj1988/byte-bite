import { useDispatch } from 'react-redux'
import '../checkout.css'
import { useNavigate } from 'react-router-dom'
import { thunkPlaceOrder } from '../../../redux/orders'

const PlaceOrderButton = ({order, total}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const placeOrder = async () => {
        const orderToPlace = {
            id: order.id,
            status: "Received",
            price: total
        }
        console.log(orderToPlace)
        await dispatch(thunkPlaceOrder(orderToPlace))
        navigate('/')
    }

    return (
        <div className="addToOrderButton bottomMargin" onClick={() => placeOrder()}>
            {`Place order`}
        </div>
    )
}

export default PlaceOrderButton
