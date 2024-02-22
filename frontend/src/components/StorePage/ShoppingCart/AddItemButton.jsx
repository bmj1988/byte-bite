import { FaPlus } from "react-icons/fa"
import './cart.css'
import { useModal } from "../../../context/Modal"
import { useSelector } from "react-redux"
import MustLogin from "./MustLoginPrompt"

const NavigateToItemModal = ({ modalComponent }) => {
    const { setModalContent, hideAddButton } = useModal()
    const user = useSelector((state) => state.session.user)
    const openModal = async () => {
        if (!user) {
            setModalContent(<MustLogin />)
        }
        else setModalContent(modalComponent);
    }

    return (
        <>
            {!hideAddButton &&
                <div className="shoppingCartAddButton" onClick={(e) => openModal(e)}>
                    <FaPlus />
                </div>
            }
        </>
    )
}

export default NavigateToItemModal
