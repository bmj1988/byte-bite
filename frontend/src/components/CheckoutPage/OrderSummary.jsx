import { FaPlus } from "react-icons/fa"
import DetailsEdit from "./DetailsWithEditDiv"
import './checkout.css'

const OrderSummary = ({ items }) => {

    return (
        <div className="deliveryDetailsMain borderRadBodDiv">
            <div className="detailsExterior">
                <h2 className="textmark">Order summary</h2>
                <div className="seeSimilar">
                    <FaPlus style={{marginRight: '3px', textSize: '10px'}}/>
                    <p>Add items</p>
                </div>

            </div>
            <div name="summaryDiv">
                <p className="textmark">{`${items.length} ${items.length > 1 ? "items" : "item"}`}</p>
                <div className="slightBreak"></div>
                {items.map((item) => {
                    return (<div key={item.id}>
                        <DetailsEdit icon={<p className="integerOrder">{item.quantity}</p>} bold={item.name} surcharge={item.price} />
                        <div className="slightBreak"></div>
                    </div>)
                })}
            </div>

        </div>
    )
}

export default OrderSummary
