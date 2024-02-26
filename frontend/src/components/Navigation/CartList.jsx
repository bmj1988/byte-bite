import { useSelector } from "react-redux"
import { orderInfo, orderItemsArray } from "../../redux/orders"
import GroupByOrderButton from '../StorePage/GroupByOrderButton'
import QuantityDropdown from '../MenuItemModal/QuantityDropDown'
import { FaTimes } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import ClearCart from "../Icons/ClearCart"

const CartList = ({ func }) => {
    const order = useSelector(orderInfo)
    const items = useSelector(orderItemsArray)
    const navigate = useNavigate()
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const grandTotal = items.reduce((acc, val) => acc + (val.quantity * val.price), 0,)
        setTotal(grandTotal)
    }, [items])

    const checkout = () => {
        navigate('/checkout')
    }

    if (!order || !items) return (<></>)

    return (
        <div className="cartList">
            <FaTimes style={{ fontSize: '20px', cursor: 'pointer' }} onClick={() => func()} />
            <h1 className="cartListName">{`${order.restaurant.name} (${order.restaurant.address})`}</h1>
            <div className="detailsExterior">
                <GroupByOrderButton />
                <ClearCart toggle={func} orderId={order.id}/>
            </div>

            <ul style={{ listStyleType: "none", margin: '0px', padding: '5px 0px 0px 0px' }}>
                {items.map((item) => {
                    return (
                        <div key={item.id}>
                            <li>
                                <div className="cartListLi">
                                    <div className="cartListLi gap">
                                        <QuantityDropdown menu_item_id={item.id} />
                                        <p>{item.name}</p>
                                    </div>
                                    <div>
                                        {`$${(item.price * item.quantity)}.00`}
                                    </div>
                                </div>
                            </li>
                        </div>
                    )
                })}
            </ul>
            {items.length > 0 && <div className="addToOrderButton" onClick={() => checkout()}>
                {`Go to checkout • $${total}.00`}
            </div>}
        </div>
    )
}
export default CartList
