import { useState } from "react"

const DeliveryOrPickupButton = () => {

    const [toggle, setToggle] = useState('delivery')

    return (
        <div className='deliveryPickupPill'>
            <div className={toggle === 'delivery' ? 'toggleOptionOn largePill' : 'toggleOptionOff largePill'} onClick={() => {
                setToggle('delivery')
                alert('Feature coming soon!')
            }
            }>
                {`Delivery`}
            </div>
            <div className={toggle === 'pickup' ? 'toggleOptionOn largePill' : 'toggleOptionOff largePill'} onClick={() => {
                setToggle('pickup')
                alert('Feature coming soon')
            }
            }>
                {'Pickup'}
            </div>
        </div>
    )
}

export default DeliveryOrPickupButton
