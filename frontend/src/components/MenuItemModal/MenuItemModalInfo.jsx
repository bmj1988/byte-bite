const MenuItemModalInfo = ({item}) => {
    return (
        <div style={{background: 'white'}}>
            <h1>{item.name}</h1>
            <h3>{item.price}</h3>
            <p>{item.description}</p>
            {/* <QuantityDropdown/>
            <AddToOrderButton/>
            <SeeDetailsButton/> */}
        </div>
    )
}

export default MenuItemModalInfo
