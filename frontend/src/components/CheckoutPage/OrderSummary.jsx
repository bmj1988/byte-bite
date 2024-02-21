import { FaPlus } from "react-icons/fa"
import DetailsEdit from "./DetailsWithEditDiv"
import './checkout.css'
import { useNavigate } from "react-router-dom"

const OrderSummary = ({ items, restaurantName }) => {
    const navigate = useNavigate()

    const clicker = () => {
        navigate(`/store/${restaurantName}`)
    }

    return (
        <div className="deliveryDetailsMain borderRadBodDiv">
            <div className="detailsExterior">
                <h2 className="textmark">Order summary</h2>
                <div className="seeSimilar" onClick={() => clicker()}>
                    <FaPlus style={{marginRight: '3px', textSize: '10px'}}/>
                    <p>Add items</p>
                </div>

            </div>
            <div name="summaryDiv">
                <p className="textmark">{`${items.length} ${items.length > 1 ? "items" : "item"}`}</p>
                {items.map((item) => {
                    return (<div key={item.id}>
                        <div className="slightBreak"></div>
                        <DetailsEdit icon={<p className="integerOrder">{item.quantity}</p>} bold={item.name} surcharge={item.price}/>

                    </div>)
                })}
            </div>

        </div>
    )
}

export default OrderSummary
