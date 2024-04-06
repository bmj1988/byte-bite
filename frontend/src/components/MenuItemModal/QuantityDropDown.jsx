import { useEffect, useRef, useState } from "react"
import { FaAngleDown } from "react-icons/fa"
import { useCartContext } from "../../context/ShoppingCartContext";
import RemoveLi from "./RemoveLi";
import { useDispatch, useSelector } from "react-redux";
import { orderItemsArray, thunkAddToOrder } from "../../redux/orders";

const QuantityDropdown = ({ menu_item_id }) => {
    const dispatch = useDispatch()
    const ulRef = useRef(null);
    const [showQuantityList, setShowQuantityList] = useState(false)
    const {setItemQuantity } = useCartContext();
    const order = useSelector((state) => state.orders.current)
    const orderItems = useSelector(orderItemsArray)
    const recordedItem = orderItems.find((foundItem) => foundItem.id === menu_item_id)
    const oldQuantity = recordedItem?.quantity
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        if (oldQuantity) {
            setQuantity(Number(oldQuantity))
            setItemQuantity(oldQuantity)
        }
        else {
            setQuantity(1)
            setItemQuantity(1)
        }
    }, [oldQuantity, setItemQuantity, setQuantity])

    useEffect(() => {
        if (!showQuantityList) return;
        const closeList = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowQuantityList(false);
            }
        };

        document.addEventListener("click", closeList);

        return () => document.removeEventListener("click", closeList)
    }, [showQuantityList]);


    const quantities = [...Array(21).keys()].slice(1)

    const clicker = () => {
        setShowQuantityList(!showQuantityList)
    }



    const quantClicker = async (number) => {
        setQuantity(number)
        setItemQuantity(number)
        if (oldQuantity) {
            const addToOrder = {
                order_id: order.id,
                menu_item_id,
                quantity: number,
            }

            await dispatch(thunkAddToOrder(addToOrder))
        }
        setShowQuantityList(!showQuantityList)
        return
    }

    return (
        <div ref={ulRef} style={{ width: 'fit-content', height: 'fit-content' }}>
            <div className="quantityButton" onClick={clicker}>
                <label>{quantity}</label><FaAngleDown />
            </div>
            <div className={showQuantityList ? "" : "hidden"}>
                <ul className="numberDropDown">
                    <RemoveLi menu_item_id={menu_item_id} />
                    {quantities.map((number) => {
                        return (<li key={number} style={{ cursor: 'pointer' }} onClick={() => quantClicker(number)}>{number}</li>)
                    })}
                </ul>
            </div>
        </div>)
}

export default QuantityDropdown
