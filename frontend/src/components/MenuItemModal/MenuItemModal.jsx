import MenuItemModalInfo from "./MenuItemModalInfo"

const MenuItemModal = ({item}) => {

    return (

        <div className="menuItemModalMain">
            <div>
                <img src={item.image} className="menuItemModalImg"/>
            </div>
            <div>
                <MenuItemModalInfo item={item}/>
            </div>
        </div>
    )

}

export default MenuItemModal
