import { useEffect, useState } from "react"
import LineItem from "./LineItem"
import '../checkout.css'
import PlaceOrderButton from "./PlaceOrderButton"
import AddATip from "./AddATipDiv"
import { tipCalculator } from "../../../utils/tipCalculator"


const OrderTotal = ({ order, price }) => {
    const [total, setTotal] = useState(price)
    const [tip, setTip] = useState(tipCalculator(total, 3, .25))
    const [deliveryFee, setDeliveryFee] = useState((price * .1))
    const [taxes, setTaxes] = useState(price * .2)

    useEffect(() => {
        let newTotal = (Number(price) + Number(tip) + Number(deliveryFee) + Number(taxes))
        setTotal(newTotal.toFixed(2))
    }, [order, tip, deliveryFee, taxes])

    return (
        <div className="orderTotalMain textmark">
            <PlaceOrderButton order={order} total={total} />
            <div className="orderTotalStats">
                <h2>Order total</h2>
                <LineItem text={'Subtotal'} amount={price} />
                <LineItem text={'Delivery Fee'} amount={deliveryFee} />
                <LineItem text={'Taxes & Other Fees'} amount={taxes} />
                <div className="slightBreak"></div>
                <AddATip total={price} tip={tip} setTip={setTip} />
                <div className="slightBreak"></div>
                <div className="detailsExterior">
                    <h2>Total</h2>
                    <h2>${total}</h2>
                </div>
                <p className="textmark smallText">{`Prices may be lower in store.`}</p>
                <p className="textmark smallText">{`If you're not around when the delivery person arrives, they'll leave your order at the door. By placing your order, you agree to take full responsibility for it once it's delivered. Orders containing alcohol or other restricted items may not be eligible for leave at door and will be returned to the store if you are not available.`}</p>
                <p className="textmark smallText">{`Estimated pricing: We'll put a hold on your card for up to $6.81. If any changes are made to your order to account for things like replacements or the actual weight of items, they will be reflected in the final charge on your receipt.`}</p>
            </div>
        </div>
    )
}
export default OrderTotal
