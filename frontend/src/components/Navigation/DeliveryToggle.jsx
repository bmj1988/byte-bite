import { useState } from "react"
import "./Navigation.css"

const DeliveryToggle = () => {
    const [toggle, setToggle] = useState('delivery')

    return (
        <div className='deliveryToggle'>
            <div className={toggle === 'delivery' ? 'toggleOptionOn' : 'toggleOptionOff'} onClick={() => setToggle('delivery')}>
            {`Delivery`}
            </div>
            <div className={toggle === 'pickup' ? 'toggleOptionOn' : 'toggleOptionOff'} onClick={() => setToggle('pickup')}>
            {'Pickup'}
            </div>
        </div>
    )
}

export default DeliveryToggle
