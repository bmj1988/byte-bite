import { useState } from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'

/// IF NOT LOGGED IN

/// locationInput should be blank until clicked, then should take whatever
/// address the user inputs

/// scheduleTimeInput should be Now until clicked, then should allow the user
/// to schedule a time to have the food delivered.

/// IF LOGGED IN

/// locationInput should default to user address in DB
/// scheduleTimeInput functions the same as when not logged in

/// On Click either one should  open Delivery Details modal
/// which allows you to change both attributes


const Location = () => {
    const [address, setAddress] = useState('Enter your address')
    const [deliveryTime, setDeliveryTime] = useState('Now')

    return (
        <div className='deliveryLocation'>
            <FaMapMarkerAlt style={{marginRight: '5px'}}/>
            <div id='locationInput' className='locationItem'>
                {address}
            </div>
            <div className='locationItem'>
                {'•'}
            </div>
            <div id='scheduleTimeInput' >
                {deliveryTime}
            </div>
        </div>
    )
}

export default Location
