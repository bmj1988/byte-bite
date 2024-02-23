import { createSelector } from 'reselect';


///ACTION TYPES

const LOAD_RESTAURANTS = 'restaurants/load';
const LOAD_RESTAURANT_DETAILS = 'restaurants/details';
const DELETE_RESTAURANT = 'restaurant/delete';
const LOAD_MENU_ITEMS = 'restaurant/menu_items';
const ADD_NEW_MENU_ITEM = 'restaurants/menu_item/new';
///ACTION CREATORS


const loadRestaurants = (restaurants) => {
    return {
        type: LOAD_RESTAURANTS,
        payload: restaurants
    };
};

const loadRestaurantDetails = (details) => {
    return {
        type: LOAD_RESTAURANT_DETAILS,
        payload: details
    };
};

const deleteRestaurant = (id) => {
    return {
        type: DELETE_RESTAURANT,
        payload: id
    };
};

const loadMenuItems = (menu_items, restaurantId) => {
    return {
        type: LOAD_MENU_ITEMS,
        payload: { menu_items, restaurantId }
    };
};

const addMenuItem = (restaurant) => {
    return {
        type: ADD_NEW_MENU_ITEM,
        payload: restaurant
    };
};

/// THUNKS
export const thunkRestaurantById = (id) => async (dispatch) => {
    const response = await fetch(`/api/restaurants/${id}`);
    if (response.ok) {
        const restaurant_details = await response.json();
        dispatch(loadRestaurantDetails(restaurant_details));
    }
    else {
        const error = await response.json();
        console.log(error);
        return error;
    }
};

export const thunkAllRestaurants = () => async (dispatch) => {
    const response = await fetch("/api/restaurants/delivery");
    if (response.ok) {
        const allRestaurants = await response.json();
        dispatch(loadRestaurants(allRestaurants));
        return allRestaurants;
    }
    else {
        console.log(`RESPONSE`, response);
    }
};

export const thunkMyRestaurants = () => async (dispatch) => {
    const response = await fetch("/api/restaurants/current");
    if (response.ok) {
        const myRestaurants = await response.json();
        dispatch(loadRestaurants(myRestaurants));
        return myRestaurants;
    } else {
        const error = response;
        return { 'error': error };
    }
};

export const thunkRestaurantByName = (name) => async (dispatch) => {
    const response = await fetch(`/api/restaurants/${name}`);
    if (response.ok) {
        const restaurant_details = await response.json();
        dispatch(loadRestaurantDetails(restaurant_details));
    }
    else {
        const error = await response.json();
        console.log(error);
        return error;
    }
};

export const thunkNewRestaurant = (restaurantDetails) => async (dispatch) => {
    const response = await fetch("/api/restaurants/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(restaurantDetails)
    });
    if (response.ok) {
        const newRestaurant = await response.json();
        dispatch(loadRestaurantDetails(newRestaurant));
        return newRestaurant;
    } else {
        const error = response.json();
        console.log(error);
        return error;
    }
};

export const thunkUpdateRestaurant = (restaurantDetails) => async (dispatch) => {
    const response = await fetch(`/api/restaurants/${restaurantDetails.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(restaurantDetails)
    });
    if (response.ok) {
        const updatedRestaurant = await response.json();
        dispatch(loadRestaurantDetails(updatedRestaurant));
    }
    else {
        const error = response.json();
        return error;
    }


};

export const thunkDeleteRestaurant = (id) => async (dispatch) => {
    const response = await fetch(`/api/restaurants/${id}`, {
        method: "DELETE"
    });
    if (response.ok) {
        dispatch(deleteRestaurant(id));
        return { "msg": "Successfully Deleted" };
    }
    else {
        const error = response.json();
        console.log(error);
        return error;

    }
};

/// MENU ITEMS THUNKS
export const thunkGetMenuItemsByRestaurantId = (restaurantId) => async (dispatch) => {
    const response = await fetch(`/api/menu_items/${restaurantId}`);
    if (response.ok) {
        const menu_items = await response.json();
        dispatch(loadMenuItems(menu_items, restaurantId));
    }
    else {
        const error = await response.json();
        console.log(error);
        return error;
    }
};

export const thunkAddMenuItem = (menuItem, currentRestaurant) => async (dispatch) => {
    const response = await fetch(`/api/menu_items/${menuItem.restaurant_id}/new`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(menuItem)
    });
    if (response.ok) {
        const menuItemFromServer = await response.json();
        const updatedRestaurant = {
            ...currentRestaurant,
            MenuItems: currentRestaurant.MenuItems.concat(menuItemFromServer),
        };
        dispatch(addMenuItem(updatedRestaurant));
        return menuItemFromServer;
    }
    else {
        const error = await response.json();
        console.log('ADD MENU ITEM THUNK', error);
        throw error;
    }
};

export const thunkDeleteMenuItem = (menuItem, currentRestaurant) => async (dispatch) => {
    const response = await fetch(`/api/menu_items/delete/${menuItem.id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(loadRestaurantDetails(currentRestaurant));
    }
    else {
        const error = await response.json();
        console.log('DELETE MENU ITEM THUNK', error);
        return error;
    }
};

export const thunkUpdateMenuItem = (menuItem, currentRestaurant) => async (dispatch) => {
    const response = await fetch(`/api/menu_items/edit/${menuItem.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(menuItem)
    });
    if (response.ok) {
        dispatch(loadRestaurantDetails(currentRestaurant));
    }
    else {
        const error = await response.json();
        console.log('UPDATE MENU ITEM THUNK', error);
        throw error;
    }
};



/// SELECTORS

export const restaurantsArray = createSelector((state) => state.restaurants, (restaurants) => {
    return Object.values(restaurants);
});

export const menuItemsArray = createSelector(
    (state) => state.restaurants,
    (state, id) => id,
    (restaurants, id) => {
        const restaurant = restaurants[id];
        if (!restaurant) return [];

        return restaurant.MenuItems;
    }

);

export const restaurantByName = createSelector(
    (state) => state.restaurants,
    (_, name) => name,
    (restaurants, name) => {
        return Object.values(restaurants).find(restaurant => restaurant.name === name);
    });

export const restaurantById = createSelector(
    (state) => state.restaurants,
    (_, id) => id,
    (restaurants, id) => {
        return Object.values(restaurants).find(restaurant => restaurant.id === id);
    });

/// REDUCER


export const restaurantsReducer = (state = {}, action) => {
    let restaurantState = { ...state };
    switch (action.type) {
        case LOAD_RESTAURANTS: {
            restaurantState = {};
            action.payload.restaurants.forEach((restaurant) => {
                restaurantState[restaurant.id] = restaurant;
            });
            return restaurantState;
        }
        case LOAD_RESTAURANT_DETAILS: {
            restaurantState[action.payload.id] = action.payload;
            return restaurantState;
        }
        case DELETE_RESTAURANT: {
            delete restaurantState[action.payload];
            return restaurantState;
        }
        case LOAD_MENU_ITEMS: {
            restaurantState[action.payload.restaurantId].MenuItems = action.payload.menu_items;
            return restaurantState;
        }
        case ADD_NEW_MENU_ITEM: {
            restaurantState[action.payload.id] = action.payload;
            return restaurantState;
        }

        default: {
            return restaurantState;
        }
    }
};
