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
    const [errors, setErrors] = useState({});
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
            dispatch(thunkUpdateMenuItem(menuItemThatWasUpdated, updatedRestaurant))
                .then(setErrors({}))
                .catch((error) => {
                    setErrors({});
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        ...(error.name && { name: 'Name must be included' }),
                        ...(error.image && { name: 'Must include a valid URL' }),
                        ...(error.description && { description: 'Description must be included' }),
                        ...(error.price && { price: 'Price must be a valid integer above 0' })
                    }));
                });
        } else {
            dispatch(thunkAddMenuItem(menuItemThatWasUpdated, curr_restaurant))
                .then((menuItemThatWasUpdated) => {
                    const updatedDraftItems = menuItemsState.map((curItem, i) => {
                        if (i === index) {
                            setErrors({});
                            return menuItemThatWasUpdated;
                        }
                        setErrors({});
                        return curItem;
                    });

                    setMenuItemsState(updatedDraftItems);
                })
                .catch((error) => {
                    setErrors({});
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        ...(error.formErrors.name && { name: 'Name must be included' }),
                        ...(error.formErrors.image && { name: 'Must include a valid URL' }),
                        ...(error.formErrors.description && { description: 'Description must be included' }),
                        ...(error.formErrors.price && { price: 'Price must be a valid integer above 0' })
                    }));
                });
        }
    };

    const handleDelete = async (e, clickedMenuItem, index) => {
        e.preventDefault();
        setErrors({});
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
        setErrors({});
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
                                    className="update-menu-items-input"
                                    type="text"
                                    defaultValue={menu_item.name}
                                    onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                                    required
                                    maxLength={40}
                                />
                            </div>
                            <div className="menu_item_box">
                                <label>Image URL</label>
                                <input
                                    className="update-menu-items-input"
                                    type="text"
                                    defaultValue={menu_item.image}
                                    onChange={(e) => handleInputChange(index, 'image', e.target.value)}
                                />
                            </div>
                            <div className="menu_item_box">
                                <label>Description</label>
                                <input
                                    className="update-menu-items-input"
                                    defaultValue={menu_item.description}
                                    onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                                    required
                                    maxLength={255}
                                />
                            </div>
                            <div className="menu_item_box">
                                <label>Price</label>
                                <input
                                    className="update-menu-items-input"
                                    type="number"
                                    defaultValue={menu_item.price}
                                    onChange={(e) => handleInputChange(index, 'price', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="button_container">
                                <button className="menu_item_buttons" type="submit">Submit</button>
                                <button className="menu_item_buttons" onClick={(e) => handleDelete(e, menu_item, index)}>Delete</button>
                            </div>
                        </div>
                    </form>
                ))}
                {errors && errors.name && <div className="error">{errors.name}</div>}
                {errors && errors.description && <div className="error">{errors.description}</div>}
                {errors && errors.price && <div className="error">{errors.price}</div>}
                <div>
                    <button className="add_item_button" onClick={() => addItemRow()}>Add Item</button>
                </div>
                <p className="form-note">Please click submit to save changes</p>
            </div>
        </>
    );
};

export default CurrentMenuItemsPage;
