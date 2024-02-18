import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { menuItemsArray, restaurantById, thunkRestaurantById, thunkUpdateMenuItem, thunkAddMenuItem, thunkDeleteMenuItem } from "../../redux/restaurants";
import Spinner from "../Spinner";



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
        // curr_restaurant.MenuItems[index] = menuItemsState[index];
        // if (!menuItemsState[index].restaurant_id) {
        //     dispatch(thunkUpdateMenuItem(menuItemsState[index], curr_restaurant));
        // } else {
        //     dispatch(thunkAddMenuItem(menuItemsState[index], curr_restaurant, index));
        // }
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

    const handleDelete = async (e, clickedMenuItem) => {
        e.preventDefault();
        const updatedRestaurant = { ...curr_restaurant, MenuItems: curr_restaurant.MenuItems.filter(menuItem => clickedMenuItem.id !== menuItem.id) };
        dispatch(thunkDeleteMenuItem(clickedMenuItem, updatedRestaurant))
            .then(() => setMenuItemsState(menuItemsState.filter(menuItem => clickedMenuItem.id !== menuItem.id)));
    };

    const addItemRow = () => {
        setMenuItemsState([...menuItemsState, {
            name: '',
            image: '',
            description: '',
            price: 0,
            restaurant_id: curr_restaurant.id
        }]);
    };


    if (!loaded) {
        return <Spinner />;
    }


    return (
        <>
            {menuItemsState.map((menu_item, index) => (
                <form onSubmit={(e) => handleSubmit(e, index)}>
                    <div className="menu_item_info" key={index}>
                        <label>Name
                            <input
                                type="text"
                                defaultValue={menu_item.name}
                                onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                                required
                            />
                        </label>
                        <label>Image URL</label>
                        <input
                            type="text"
                            defaultValue={menu_item.image}
                            onChange={(e) => handleInputChange(index, 'image', e.target.value)}
                        />
                        <label>Description</label>
                        <textarea
                            defaultValue={menu_item.description}
                            onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                            required
                        />
                        <label>Price</label>
                        <input
                            type="number"
                            defaultValue={menu_item.price}
                            onChange={(e) => handleInputChange(index, 'price', e.target.value)}
                            required
                        />
                        <button type="submit">Update</button>
                        <button onClick={(e) => handleDelete(e, menu_item)}>Delete</button>
                    </div>
                </form>
            ))}
            <div>
                <button onClick={() => addItemRow()}>Add Item</button>
            </div>
        </>
    );
};

export default CurrentMenuItemsPage;
