import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { menuItemsArray, thunkRestaurantById } from "../../redux/restaurants";
import CategoryScroller from "../MainPage/CategoryScroller";
import Spinner from "../Spinner";
import MenuItemModal from "../MenuItemModal/MenuItemModal";
import { useParams } from "react-router-dom";



const CurrentMenuItemsPage = ({ id }) => {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(thunkRestaurantById(id)).then(() => setLoaded(true));
    }, [dispatch, id]);

    const menu_items = useSelector((state) => menuItemsArray(state, id));
    console.log(menu_items);

    if (!loaded) {
        return (
            <Spinner />
        );
    }

    return (
        <>
            {menu_items.map((menu_item) => {
                return (
                    <>
                        <div className="menu_item_info">
                            <h2>{menu_item.name}</h2>
                            <p>{menu_item.image}</p>
                            <p>{menu_item.description}</p>
                            <p>${menu_item.price}</p>
                            <button>Update</button>
                            <button>Delete</button>
                        </div>

                    </>
                );
            })}
            <div>
                <button>Add Item</button>
            </div>
        </>
    );

};

export default CurrentMenuItemsPage;
