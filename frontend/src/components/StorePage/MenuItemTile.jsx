const MenuItemTile = ({item}) => {
    return (
        <div className="menuItemTile">
            <img src={item.image} className="menuItemTileImage"/>
            <div>
                <p className="menuItemName">{item.name}</p>
                <p className="menuItemPrice">{`$${item.price}.00`}</p>
            </div>
        </div>
    )
}

export default MenuItemTile
