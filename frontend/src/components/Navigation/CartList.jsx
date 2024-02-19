import { useSelector } from "react-redux"
import { orderInfo, orderItemsArray } from "../../redux/orders"
import GroupByOrderButton from '../StorePage/GroupByOrderButton'
import QuantityDropdown from '../MenuItemModal/QuantityDropDown'
import { FaTimes } from "react-icons/fa"
import { useModal } from "../../context/Modal"

const CartList = () => {
    const order = useSelector(orderInfo)
    const items = useSelector(orderItemsArray)
    const { closeModal } = useModal();

    if (!order || !items) return (<></>)

    return (
        <div className="cartList">
            <FaTimes style={{ fontSize: '20px' }} onClick={() => closeModal()} />
            <h1 className="cartListName">{`${order.restaurant.name} (${order.restaurant.address})`}</h1>
            <GroupByOrderButton />
            <ul>
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
                                        {`$${item.price}.00`}
                                    </div>
                                </div>
                            </li>
                        </div>
                    )
                })}
            </ul>
            <div className="addToOrderButton">
                {`Go to checkout • $${order.price}.00`}
            </div>
        </div>
    )
}
export default CartList
