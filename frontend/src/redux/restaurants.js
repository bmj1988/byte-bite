import { createSelector } from 'reselect'


///ACTION TYPES

const LOAD_RESTAURANTS = 'restaurants/load'
const LOAD_RESTAURANT_DETAILS = 'restaurants/details'
const DELETE_RESTAURANT = 'restaurant/delete'



///ACTION CREATORS


const loadRestaurants = (restaurants) => {
    return {
        type: LOAD_RESTAURANTS,
        payload: restaurants
    }
}

const loadRestaurantDetails = (details) => {
    return {
        type: LOAD_RESTAURANT_DETAILS,
        payload: details
    }
}

const deleteRestaurant = (id) => {
    return {
        type: DELETE_RESTAURANT,
        payload: id
    }
}


/// THUNKS

export const thunkAllRestaurants = () => async (dispatch) => {
    const response = await fetch("/api/restaurants/delivery")
    if (response.ok) {
        const allRestaurants = await response.json();
        dispatch(loadRestaurants(allRestaurants))
        return allRestaurants
    }
    else {
        console.log(`RESPONSE`, response)
    }
}

export const thunkRestaurantById = (name) => async (dispatch) => {
    const response = await fetch(`/api/restaurants/${name}`)
    if (response.ok) {
        const restaurant_details = await response.json()
        dispatch(loadRestaurantDetails(restaurant_details))
    }
    else {
        const error = response.json()
        console.log(error)
        return error
    }
}

export const thunkNewRestaurant = (restaurantDetails) => async (dispatch) => {
    const response = await fetch("/api/restaurants/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(restaurantDetails)
    })
    if (response.ok) {
        const newRestaurant = await response.json()
        dispatch(loadRestaurantDetails(newRestaurant))
        return newRestaurant
    }
}

export const thunkUpdateRestaurant = (restaurantDetails) => async (dispatch) => {
    const response = await fetch(`/api/restaurants/${restaurantDetails.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(restaurantDetails)
    })
    if (response.ok) {
        const updatedRestaurant = await response.json()
        dispatch(loadRestaurantDetails(updatedRestaurant))
    }
    else {
        const error = response.json()
        console.log(error)
        return error
    }


}

export const thunkDeleteRestaurant = (id) => async (dispatch) => {
    const response = await fetch(`/api/restaurants/${id}`, {
        method: "DELETE"
    })
    if (response.ok) {
        dispatch(deleteRestaurant(id))
        return { "msg": "Successfully Deleted" }
    }
    else {
        const error = response.json()
        console.log(error)
        return error

    }
}

/// SELECTORS

export const restaurantsArray = createSelector((state) => state.restaurants, (restaurants) => {
    return Object.values(restaurants)
})

export const restaurantByName = createSelector(
    (state) => state.restaurants, 
    (_, name) => name,
    (restaurants, name) => {
        return Object.values(restaurants).find(restaurant => restaurant.name === name)
    })

/// REDUCER


export const restaurantsReducer = (state = {}, action) => {
    let restaurantState = { ...state }
    switch (action.type) {
        case LOAD_RESTAURANTS: {
            restaurantState = {};
            action.payload.restaurants.forEach((restaurant) => {
                restaurantState[restaurant.id] = restaurant
            })
            return restaurantState
        }
        case LOAD_RESTAURANT_DETAILS: {
            restaurantState[action.payload.id] = action.payload
            return restaurantState
        }
        case DELETE_RESTAURANT: {
            delete restaurantState[action.payload]
            return restaurantState
        }
        default: {
            return restaurantState
        }
    }
}
