/// ACTIONS

import { createSelector } from "reselect"

const LOAD_ORDER = 'orders/load'
const DELETE_ORDER = 'orders/delete'

/// ACTION CREATORS

const loadOrder = (newOrder) => {
    return {
        type: LOAD_ORDER,
        payload: newOrder
    }
}

const deleteOrder = () => {
    return {
        type: DELETE_ORDER
    }
}

/// THUNKS

export const thunkGetCurrentOrder = () => async (dispatch) => {
    const response = await fetch('/api/orders/current')
    if (response.ok) {
        const currentOrder = await response.json()
        dispatch(loadOrder(currentOrder))
        return currentOrder
    }
    else {
        const error = await response.json()
        console.log(error)
        return error
    }
}

export const thunkStartOrder = (newOrder) => async (dispatch) => {
    const response = await fetch('/api/orders/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newOrder)
    })
    if (response.ok) {
        const newOrder = await response.json()
        dispatch(loadOrder(newOrder))
        return newOrder
    }
    else {
        const error = await response.json()
        console.log(error)
        return error
    }
}

export const thunkAddToOrder = (addition) => async (dispatch) => {
    const response = await fetch(`/api/orders/${addition.order_id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(addition)
    })
    if (response.ok) {
        const orderUpdate = await response.json()
        dispatch(loadOrder(orderUpdate))
        return orderUpdate
    }
    else {
        const error = await response.json()
        console.log(error)
        return error
    }
}

export const thunkRemoveFromOrder = (removal) => async (dispatch) => {
    const response = await fetch(`/api/orders/${removal.order_id}/remove`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(removal)
    })
    if (response.ok) {
        const orderUpdate = await response.json()
        dispatch(loadOrder(orderUpdate))
        return orderUpdate
    }
    else {
        const error = await response.json()
        console.log(error)
        return error
    }
}

export const thunkPlaceOrder = (order) => async (dispatch) => {
    const response = await fetch(`api/orders/${order.id}/status`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    })
    if (response.ok) {
        const order = await response.json()
        dispatch(loadOrder(order))
        return order
    }
    else {
        const error = await response.json()
        console.log(error)
        return error
    }
}

export const thunkDeleteOrder = (orderId) => async (dispatch) => {
    const response = await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        dispatch(deleteOrder())
    }
    else {
        const error = await response.json()
        console.log(error)
        return error
    }
}

/// SELECTORS

export const orderItemsArray = createSelector((state) => state.orders, (orders) => {
    if (orders?.current?.items) {
        return Object.values(orders?.current?.items)
    }
    else return []

})

export const orderInfo = createSelector((state) => state.orders, (orders) => {
    if (orders?.current) {
        return orders.current
    }
    else return null
})


/// REDUCER

export const ordersReducer = (state = {}, action) => {
    let orderState = { ...state }
    switch (action.type) {
        case LOAD_ORDER: {
            orderState['current'] = action.payload.order
            const items = {}
            action.payload.items.map((item) => {
                items[item.id] = item
            })
            orderState.current.items = items
            return orderState
        }
        case DELETE_ORDER: {
            orderState['current'] = null
            return orderState
        }
        default: {
            return orderState
        }
    }
}
