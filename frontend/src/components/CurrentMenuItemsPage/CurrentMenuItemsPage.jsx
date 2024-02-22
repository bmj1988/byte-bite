import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { menuItemsArray, restaurantById, thunkRestaurantById, thunkUpdateMenuItem, thunkAddMenuItem, thunkDeleteMenuItem } from "../../redux/restaurants";
import Spinner from "../Spinner";
import './CurrentMenuItemsPage.css';
let draftCounter = 0;



const CurrentMenuItemsPage = ({ id }) => {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
    const [menuItemsState, setMenuItemsState] = useState([]);

    const menu_items = useSelector((state) => menuItemsArray(state, id));
    const curr_restaurant = useSelector((state) => restaurantById(state, id));


    useEffect(() => {
        if (menu_items) {
            const initialMenuItemsState = menu_items.map((menu_item) => ({
                id: menu_item.id,
                name: menu_item.name,
                image: menu_item.image,
                description: menu_item.description,
                price: menu_item.price,
            }));
            setMenuItemsState(initialMenuItemsState);
        }
        dispatch(thunkRestaurantById(id)).then(() => setLoaded(true));

    }, [dispatch]);


    const handleInputChange = (index, field, value) => {
        setMenuItemsState((prevMenuItemsState) => {
            const updatedMenuItemsState = [...prevMenuItemsState];
            updatedMenuItemsState[index] = {
                ...updatedMenuItemsState[index],
                [field]: value,
            };
            return updatedMenuItemsState;
        });
    };


    const handleSubmit = async (e, index) => {
        e.preventDefault();
        const menuItemThatWasUpdated = menuItemsState[index];
        const isNewMenuItem = !!menuItemThatWasUpdated.restaurant_id;
        if (!isNewMenuItem) {
            const updatedRestaurant = {
                ...curr_restaurant,
                MenuItems: curr_restaurant.MenuItems.map(curItem => {
                    if (curItem.id === menuItemThatWasUpdated.id) {
                        return menuItemThatWasUpdated;
                    }
                    return curItem;
                }),
            };
            dispatch(thunkUpdateMenuItem(menuItemThatWasUpdated, updatedRestaurant));
        } else {
            dispatch(thunkAddMenuItem(menuItemThatWasUpdated, curr_restaurant))
                .then((menuItemThatWasUpdated) => {
                    const updatedDraftItems = menuItemsState.map((curItem, i) => {
                        if (i === index) {
                            return menuItemThatWasUpdated;
                        }
                        return curItem;
                    });
                    setMenuItemsState(updatedDraftItems);
                });
        }
    };

    const handleDelete = async (e, clickedMenuItem, index) => {
        e.preventDefault();
        const isNewMenuItem = !!clickedMenuItem.restaurant_id;
        if (!isNewMenuItem) {
            const updatedRestaurant = { ...curr_restaurant, MenuItems: curr_restaurant.MenuItems.filter(menuItem => clickedMenuItem.id !== menuItem.id) };
            dispatch(thunkDeleteMenuItem(clickedMenuItem, updatedRestaurant))
                .then(() => setMenuItemsState(menuItemsState.filter(menuItem => clickedMenuItem.id !== menuItem.id)));
        } else {
            setMenuItemsState(menuItemsState.filter((menuItem, i) => i !== index));
        }
    };

    const addItemRow = () => {
        draftCounter += 1;
        setMenuItemsState([...menuItemsState, {
            name: '',
            image: '',
            description: '',
            price: 1,
            restaurant_id: curr_restaurant.id,
            draftCounter
        }]);
    };


    if (!loaded) {
        return <Spinner />;
    }


    return (
        <>
            <div className="wrap" style={{ 'max-height': '600px', 'overflow-y': 'auto' }}>
                {menuItemsState.map((menu_item, index) => (
                    <form onSubmit={(e) => handleSubmit(e, index)}>
                        <div className="menu_item_info" key={menu_item.draftCounter || menu_item.id}>
                            <div className="menu_item_box">
                                <label>Name</label>
                                <input
                                    type="text"
                                    defaultValue={menu_item.name}
                                    onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="menu_item_box">
                                <label>Image URL</label>
                                <input
                                    type="text"
                                    defaultValue={menu_item.image}
                                    onChange={(e) => handleInputChange(index, 'image', e.target.value)}
                                />
                            </div>
                            <div className="menu_item_box">
                                <label>Description</label>
                                <textarea
                                    defaultValue={menu_item.description}
                                    onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="menu_item_box">
                                <label>Price</label>
                                <input
                                    type="number"
                                    defaultValue={menu_item.price}
                                    onChange={(e) => handleInputChange(index, 'price', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="button_container">
                                <button className="menu_item_buttons" type="submit">Update</button>
                                <button className="menu_item_buttons" onClick={(e) => handleDelete(e, menu_item, index)}>Delete</button>
                            </div>
                        </div>
                    </form>
                ))}
                <div>
                    <button className="add_item_button" onClick={() => addItemRow()}>Add Item</button>
                </div>
            </div>
        </>
    );
};

export default CurrentMenuItemsPage;
