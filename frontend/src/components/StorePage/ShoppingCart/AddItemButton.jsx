import { FaPlus } from "react-icons/fa"
import './cart.css'
import { useDispatch } from "react-redux"
import { useModal } from "../../../context/Modal"

const NavigateToItemModal = ({ modalComponent }) => {
    const { setModalContent } = useModal()
    const openModal = async () => {
        console.log('CLICK')
        setModalContent(modalComponent);
    }

    return (
        <div className="shoppingCartAddButton" onClick={() => openModal()}>
            <FaPlus />
        </div>
    )
}

export default NavigateToItemModal
