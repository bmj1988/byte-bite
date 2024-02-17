import MenuItemTile from "./MenuItemTile"

const MenuItems = ({ menuItemsArray }) => {


    return (
        <div className="storePageMenuItems">
            {menuItemsArray?.map((item) => {
                return (
                    <MenuItemTile item={item} key={item.id} />
                )
            })}
        </div>
    )
}

export default MenuItems
