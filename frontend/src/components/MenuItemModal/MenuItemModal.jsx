import { useModal } from "../../context/Modal"
import MenuItemModalInfo from "./MenuItemModalInfo"
import { FaExternalLinkAlt, FaTimes } from "react-icons/fa"

const MenuItemModal = ({ item }) => {
    const { closeModal } = useModal()
    return (
        <div className="menuItemModalWrapper">
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: "20px" }}>
                <FaTimes onClick={() => closeModal()}/>
                <FaExternalLinkAlt onClick={() => alert('Feature coming soon!')}/>
            </div>
            <div className="menuItemModalMain">
                <div>
                    <img src={item.image} className="menuItemModalImg" />
                </div>
                <div>
                    <MenuItemModalInfo item={item} />
                </div>
            </div>
        </div>
    )

}

export default MenuItemModal
