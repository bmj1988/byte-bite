import { useEffect, useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { orderItemsArray, thunkGetCurrentOrder } from '../../redux/orders'
import CartList from './CartList'

const ShoppingCart = () => {
    const dispatch = useDispatch()
    const cart = useSelector(orderItemsArray)
    const [numItems, setNumItems] = useState(0)
    const [openCart, setOpenCart] = useState(false)

    useEffect(() => {
        dispatch(thunkGetCurrentOrder())
    }, [])

    useEffect(() => {
        const reduce = cart.reduce((acc, val) => acc + val.quantity, 0,)
        setNumItems(reduce)
    }, [cart])

    const clicker = () => {
        setOpenCart(!openCart)
    }
    return (
        <div>
            <div className='shoppingCart' onClick={() => clicker()}>
                <FaShoppingCart style={{ marginRight: '5px', fontSize: '16px' }} />
                <div style={{ fontWeight: 'bold' }}>
                    {`Cart • ${numItems}`}
                </div>
            </div>
            {openCart && <CartList func={() => setOpenCart(false)}/>}
        </div>
    )
}

export default ShoppingCart
