import { useState } from 'react'
import AddToOrderButton from './AddToOrderButton'
import './MIM.css'
import QuantityDropdown from './QuantityDropDown'
import SeeDetailsButton from './SeeDetailsButton'

const MenuItemModalInfo = ({ item }) => {
    const [quantity, setQuantity] = useState(1)

    return (
        <div className="menuItemModalInfo">
            <div>
                <h1>{item.name}</h1>
                <h2>{`$${item.price}.00`}</h2>
                <p>{item.description}</p>
            </div>
            <QuantityDropdown menu_item_id={item.id} quantity={quantity} setQuantity={setQuantity}/>
            <AddToOrderButton quantity={quantity}/>
            <SeeDetailsButton />
        </div>
    )
}

export default MenuItemModalInfo
