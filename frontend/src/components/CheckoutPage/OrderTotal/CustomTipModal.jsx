import ModalCloseX from "../../Icons/ModalCloseX"

const CustomTip = ({ setTip, closeModal }) => {

    return (<div>
        <div className="detailsExterior">
            <ModalCloseX />
        </div>
        <div className="deliveryDetailsModal">
            <h2 className="textmark">Custom Tip Amount</h2>
            <input type="number" placeholder="0" onChange={() => setTip(e.target.value)} />
            <div className="addToOrderButton" onClick={() => closeModal()}>
                {`Use custom tip amount`}
            </div>
        </div>
    </div>)
}

export default CustomTip;
