import { useState } from "react"
import '../checkout.css'
import {tipCalculator} from "../../../utils/tipCalculator";
const AddATip = ({ total, tip, setTip }) => {
    const [toggle, setToggle] = useState('tip2')
    const [tipInput, setTipInput] = useState(false)


    return (
        <div>
            <div className="detailsExterior">
                <h4>Add a tip</h4>
                <h4> ${tip}</h4>
            </div>
            <p>100% of your tip goes to your courier. Tips are based on your order total of ${total.toFixed(2)} before any discounts or promotions.</p>
            <div className="tipButtons bottomMargin">
                <div className={toggle === "tip1" ? "seeSimilarClicked" : "seeSimilar"} onClick={(e) => {
                    e.preventDefault()
                    setToggle("tip1")
                    setTipInput(false)
                    setTip(tipCalculator(total, 2, .2))
                }}>
                    {`$${tipCalculator(total, 2, .2)}`}
                </div>
                <div className={toggle === "tip2" ? "seeSimilarClicked" : "seeSimilar"} onClick={(e) => {
                    e.preventDefault()
                    setToggle("tip2")
                    setTipInput(false)
                    setTip(tipCalculator(total, 3, .25))
                }}>
                    {`$${tipCalculator(total, 3, .25)}`}
                </div>
                <div className={toggle === "tip3" ? "seeSimilarClicked" : "seeSimilar"} onClick={(e) => {
                    e.preventDefault()
                    setToggle("tip3")
                    setTipInput(false)
                    setTip(tipCalculator(total, 4, .3))
                }}>
                    {`$${tipCalculator(total, 4, .3)}`}
                </div>
                <div className={toggle === "tip4" ? "seeSimilarClicked" : "seeSimilar"} onClick={(e) => {
                    e.preventDefault()
                    setToggle("tip4")
                    setTipInput(false)
                    setTip(tipCalculator(total, 5, .35))
                }}>
                    {`$${tipCalculator(total, 5, .35)}`}
                </div>
                <div className={toggle === "tip5" ? "seeSimilarClicked" : "seeSimilar"} onClick={() => {
                    setToggle("tip5")
                    setTipInput(true)
                }}>
                    {`Other`}
                </div>
                {tipInput && <input className="tipInput" type="number" min={0} onChange={(e) => {
                    const tipNum = Number(e.target.value).toFixed(2)
                    setTip(tipNum)
                }}/>}
            </div>

        </div>
    )

}

export default AddATip
