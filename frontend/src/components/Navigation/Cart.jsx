import { useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa'

const ShoppingCart = () => {
    const [numItems, setNumItems] = useState('0')
    return (
        <div className='shoppingCart'>
            <FaShoppingCart style={{marginRight: '5px', fontSize: '16px'}} />
            <div style={{fontWeight: 'bold'}}>
            {`Cart • ${numItems}`}
            </div>
        </div>
    )
}

export default ShoppingCart
