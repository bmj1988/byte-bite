import { useEffect } from 'react'
import { useCartContext } from '../../context/ShoppingCartContext'
import AddToOrderButton from './AddToOrderButton'
import './MIM.css'
import QuantityDropdown from './QuantityDropDown'
import SeeDetailsButton from './SeeDetailsButton'

const MenuItemModalInfo = ({ item }) => {
    const { menuItemId, setMenuItemId, setPrice } = useCartContext()
    useEffect(() => {
        setMenuItemId(item.id)
        setPrice(item.price)
    }, [])
    return (
        <div className="menuItemModalInfo">
            <div>
                <h1>{item.name}</h1>
                <h2>{`$${item.price}.00`}</h2>
                <p>{item.description}</p>
            </div>
            <QuantityDropdown />
            <AddToOrderButton />
            <SeeDetailsButton />
        </div>
    )
}

export default MenuItemModalInfo
