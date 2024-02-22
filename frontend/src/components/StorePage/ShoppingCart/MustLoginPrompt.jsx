import ModalCloseX from "../../Icons/ModalCloseX"

const MustLogin = () => {
    return (
        <div>
        <div className="detailsExterior">
            <ModalCloseX/>
        </div>
        <div className="deliveryDetailsModal">
        <h2>{`You must login to place an order!`}</h2>
        </div>
        </div>
    )
}

export default MustLogin
