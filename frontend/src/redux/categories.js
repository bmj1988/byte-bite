import { createSelector } from 'reselect'


///ACTION TYPES

const LOAD_CATEGORIES = 'categories/load'


///ACTION CREATORS


const loadCategories = (categories) => {
    return {
        type: LOAD_CATEGORIES,
        payload: categories
    }
}

/// THUNKS

export const thunkCategories = () => async (dispatch) => {
    const response = await fetch("/api/categories")
    if (response.ok) {
        const allCategories = await response.json();
        dispatch(loadCategories(allCategories))
        return allCategories
    }
    else {
        const error = response
        return error
    }
}

/// SELECTORS

export const categoriesArray = createSelector((state) => state.categories, (categories) => {
    return Object.values(categories)
})

/// REDUCER


export const categoryReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_CATEGORIES: {
            let categoryState = { ...state };
            action.payload.categories.forEach((category) => {
                categoryState[category.id] = category
            })
            return categoryState
        }
        default: {
            return state
        }
    }
}
