import { useModal } from "../../context/Modal"
import { FaTimes } from "react-icons/fa"
import './icons.css'

const ModalCloseX = () => {
    const {closeModal} = useModal()

    return (
        <FaTimes className="xIcon" onClick={() => closeModal()} />
    )
}
export default ModalCloseX
