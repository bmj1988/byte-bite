import { useEffect, useRef, useState } from "react"
import { FaAngleDown } from "react-icons/fa"
import { useCartContext } from "../../context/ShoppingCartContext";
const QuantityDropdown = () => {
    const ulRef = useRef(null);
    const [showQuantityList, setShowQuantityList] = useState(false)
    const { quantity, setQuantity, cart } = useCartContext();

    useEffect(() => {
        if (!showQuantityList) return;
        const closeList = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowQuantityList(false);
            }
        };

        document.addEventListener("click", closeList);

        return () => document.removeEventListener("click", closeList)
    }, [showQuantityList]);


    const quantities = [...Array(20).keys()]

    const clicker = (e) => {
        setShowQuantityList(!showQuantityList)
        console.log('im being clicked', showQuantityList)
    }

    const quantClicker = (number) => {
        setQuantity(number)
    }

    return (
        <div ref={ulRef} style={{ width: 'fit-content', height: 'fit-content' }}>
            <div className="quantityButton" onClick={clicker}>
                <label>{quantity}</label><FaAngleDown />
            </div>
            <div className={showQuantityList ? "" : "hidden"}>
                <ul className="numberDropDown">
                    {quantities.map((number) => {
                        return (<li key={number} style={{ cursor: 'pointer' }} onClick={() => quantClicker(number)}>{number}</li>)
                    })}
                </ul>
            </div>
        </div>)
}

export default QuantityDropdown
