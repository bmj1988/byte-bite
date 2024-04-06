import { FaClock, FaMapMarkerAlt } from 'react-icons/fa'
import DetailsEdit from '../../CheckoutPage/DetailsWithEditDiv'
import ModalCloseX from '../../Icons/ModalCloseX'
import './option.css'
import { useCartContext } from '../../../context/ShoppingCartContext'
import { useModal } from '../../../context/Modal'
import DeliveryInput from './DeliveryInput'

const DeliveryDetailModal = () => {
    const { stAddress, setStAddress, deliveryTime, locality, city} = useCartContext()
    const { setModalContent, closeModal } = useModal();

    const addressClicker = () => {
        setModalContent(<DeliveryInput func={setModalContent} setStAddress={setStAddress}/>)
    }

    const deliveryTimeClicker = () => {
        alert('Feature coming soon!')
    }

    return (< div >
        <div className="detailsExterior">
            <ModalCloseX />
        </div>
        <div className='deliveryDetailsModal'>
            <h1 className='textmark'>Delivery Details</h1>
            <DetailsEdit icon={<FaMapMarkerAlt />} bold={stAddress} sub={city ? `${city}, ${locality}` : ''} button={{ text: "Change" }} clicker={addressClicker} />
            <div className='slightBreak'></div>
            <DetailsEdit icon={<FaClock />} bold={deliveryTime} button={{ text: "Schedule" }} clicker={deliveryTimeClicker}/>
            <div className='addToOrderButton' onClick={() => closeModal()}>
                {'Done'}
            </div>
        </div>
    </div >)
}

export default DeliveryDetailModal
