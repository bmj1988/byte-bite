import { FaMapMarkerAlt } from "react-icons/fa"
import ModalCloseX from "../../Icons/ModalCloseX"
import DeliveryDetailModal from "./DeliveryDetailsModal"

const DeliveryInput = ({func, setStAddress}) => {

    return (
        < div >
            <div className="detailsExterior">
                <ModalCloseX />
            </div>
            <div className='deliveryDetailsModal'>
                <h1 className='textmark'>Deliver to</h1>
                <div className="addressInput">
                    <FaMapMarkerAlt className="x" />
                    <input type='text' placeholder="Enter delivery address" className="newAddressInput" onChange={(e) => setStAddress(e.target.value)}/>
                </div>

                <div className='addToOrderButton' onClick={() => func(<DeliveryDetailModal/>)}>
                    {'Done'}
                </div>
            </div>
        </div >
    )
}
export default DeliveryInput
