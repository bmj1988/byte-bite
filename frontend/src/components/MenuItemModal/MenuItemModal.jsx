import { useCartContext } from "../../context/ShoppingCartContext"
import MenuItemModalInfo from "./MenuItemModalInfo"
import { useEffect } from "react"
import ModalCloseX from "../Icons/ModalCloseX"
import ShareIcon from "../Icons/ShareIcon"

const MenuItemModal = ({ item }) => {
    const { setMenuItemId, setPrice, setRestaurantId } = useCartContext();


    useEffect(() => {
        setMenuItemId(item.id)
        setPrice(item.price)
        setRestaurantId(item.restaurantId)
    }, [item, setMenuItemId, setPrice, setRestaurantId])



    return (
        <div className="menuItemModalWrapper">
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: "20px" }}>
                <ModalCloseX />
                <ShareIcon />
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
