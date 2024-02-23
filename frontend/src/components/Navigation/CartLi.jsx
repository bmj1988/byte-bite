const CartLi = ({item}) => {
    const [total, setTotal] = useState(0)

    return (<div key={item.id}>
        <li>
            <div className="cartListLi">
                <div className="cartListLi gap">
                    <QuantityDropdown menu_item_id={item.id} />
                    <p>{item.name}</p>
                </div>
                <div>
                    {`$${item.price}.00`}
                </div>
            </div>
        </li>
    </div>)
}
export default CartLi
