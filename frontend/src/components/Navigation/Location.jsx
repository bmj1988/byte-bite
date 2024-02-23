import { useState } from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { useCartContext } from '../../context/ShoppingCartContext'
import { useModal } from '../../context/Modal'
import DeliveryDetailModal from './OptionModals/DeliveryDetailsModal'

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
    const {stAddress, setStAddress, deliveryTime, setDeliveryTime} = useCartContext()
    const {setModalContent} = useModal()

    const clicker = () => {
        setModalContent(<DeliveryDetailModal/>)
    }

    return (
        <div className='deliveryLocation' onClick={() => clicker()}>
            <FaMapMarkerAlt style={{marginRight: '5px'}}/>
            <div id='locationInput' className='locationItem'>
                {stAddress}
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
