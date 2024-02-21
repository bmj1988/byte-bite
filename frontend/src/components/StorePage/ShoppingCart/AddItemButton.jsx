import { FaPlus } from "react-icons/fa"
import './cart.css'
import { useModal } from "../../../context/Modal"

const NavigateToItemModal = ({ modalComponent }) => {
    const { setModalContent, hideAddButton } = useModal()
    const openModal = async () => {
        console.log('CLICK')
        setModalContent(modalComponent);
    }

    return (
        <>
        { !hideAddButton &&
        <div className="shoppingCartAddButton" onClick={() => openModal()}>
            <FaPlus />
        </div>
        }
        </>
    )
}

export default NavigateToItemModal
