import { useModal } from "../../context/Modal";
import { orderItemsArray, thunkRemoveFromOrder } from "../../redux/orders";
import { useDispatch, useSelector } from "react-redux";

const RemoveLi = ({menu_item_id}) => {
    const dispatch = useDispatch()
    const order = useSelector((state) => state.orders?.current)
    const cart = useSelector(orderItemsArray)
    const recordedItem = cart.find((foundItem) => foundItem.id === menu_item_id)
    const { closeModal } = useModal();

    const remove = async (menu_item_id) => {
        const remover = {
            order_id: order.id,
            menu_item_id,
        }
        await dispatch(thunkRemoveFromOrder(remover))
        closeModal()
    }


    return (
        <>
            {recordedItem && <li key={'remove'} style={{ cursor: 'pointer' }} onClick={() => remove(menu_item_id)}> {"Remove"} </li>}
        </>
    )
}

export default RemoveLi
