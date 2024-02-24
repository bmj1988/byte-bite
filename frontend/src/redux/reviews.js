import { createSelector } from "reselect";
import { thunkRestaurantById } from "./restaurants";

///ACTION TYPES

const LOAD_REVIEWS = 'reviews/load'
const DELETE_REVIEW = 'reviews/delete'
const UPDATE_REVIEW = 'reviews/update'

///ACTION CREATORS

const loadReviews = (reviews) => {
  return {
    type: LOAD_REVIEWS,
    payload: reviews
  }
}

const deleteReview = (id) => {
  return {
    type: DELETE_REVIEW,
    payload: id
  }
}

const updateReview = (review) => {
  return {
    type: UPDATE_REVIEW,
    payload: review
  }
}

///THUNKS

export const thunkUsersReviews = () => async (dispatch) => {
  const res = await fetch('/api/reviews/current')
  if (res.ok) {
    const reviews = await res.json();
    await dispatch(loadReviews(reviews))
    return reviews
  } else {
    const error = res.json()
    return error
  }
}

export const thunkRestaurantsReviews = (id) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${id}`)
  if (res.ok) {
    const reviews = await res.json();
    dispatch(loadReviews(reviews))
    return reviews
  } else {
    const error = res.json()
    return error
  }
}

export const thunkDeleteReview = (review_id) => async (dispatch) => {
  const res  = await fetch(`/api/reviews/${review_id}`, {
    method: "DELETE"
  })
  if (res.ok) {
    await dispatch(deleteReview(review_id))
    return {"msg": "Review successfully deleted"}
  } else {
    const error = await res.json()
    return error
  }
}

export const thunkNewReview = (reviewDetails) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${reviewDetails.restaurant_id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reviewDetails)
  })
  if (res.ok) {
    const newReview = await res.json()
    dispatch(thunkRestaurantById(reviewDetails.restaurant_id))
  } else {
    const error = res.json()
    return error
  }
}

export const thunkUpdateReview = (reviewDetails) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${reviewDetails.restaurant_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reviewDetails)
  })
  if (res.ok) {
    const newReview = await res.json()
    dispatch(updateReview(newReview))
  } else {
    const error = res.json()
    return error
  }
}

// export const thunkPaginatedReviews = (restaurantId) => async (dispatch) => {
//   const response = await fetch(`/api/reviews/${restaurantId}/scroller`)
//   if (response.ok) {

//   }
// }

///SELECTORS

export const reviewsArray = createSelector((state) => state.reviews, (reviews) => {
  return Object.values(reviews)
})

///REDUCER

export const reviewsReducer = (state = {}, action) => {
  let reviewState = { ...state }
  switch (action.type) {
    case LOAD_REVIEWS: {
      reviewState = {};
      action.payload.reviews.forEach((review) => {
        reviewState[review.id] = review
      })
      return reviewState
    }
    case UPDATE_REVIEW: {
      const updatedReview = action.payload;
      return {
        ...reviewState,
        [updatedReview.id]: updatedReview
      }
    }
    case DELETE_REVIEW: {
      delete reviewState[action.payload]
      return reviewState
    }
    default: {
      return reviewState
    }
  }
}
