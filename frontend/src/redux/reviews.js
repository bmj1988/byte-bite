import { createSelector } from "reselect";

///ACTION TYPES

const LOAD_REVIEWS = 'reviews/load'
const DELETE_REVIEW = 'reviews/delete'

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

///THUNKS

export const thunkUsersReviews = () => async (dispatch) => {
  const res = await fetch('/api/reviews/current')
  if (res.ok) {
    const reviews = await res.json();
    dispatch(loadReviews(reviews))
    return reviews
  } else {
    const error = res.json()
    console.log(error)
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
    console.log(error)
    return error
  }
}

export const thunkDeleteReview = (id) => async (dispatch) => {
  const res  = await fetch(`/api/reviews/${id}`, {
    method: "DELETE"
  })
  if (res.ok) {
    dispatch(deleteReview(id))
    return {"msg": "Review successfully deleted"}
  } else {
    const error = res.json()
    console.log(error)
    return error
  }
}

export const thunkNewReview = (reviewDetails) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${reviewDetails.id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reviewDetails)
  })
  if (res.ok) {
    const newReview = await res.json()
    dispatch(loadReviews(newReview))
    return newReview
  } else {
    const error = res.json()
    console.log(error)
    return error
  }
}

export const thunkUpdateReview = (reviewDetails) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${reviewDetails.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reviewDetails)
  })
  if (res.ok) {
    const newReview = await res.json()
    dispatch(loadReviews(newReview))
    return newReview
  } else {
    const error = res.json()
    console.log(error)
    return error
  }
}

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
    case DELETE_REVIEW: {
      delete reviewState[action.payload]
      return reviewState
    }
    default: {
      return reviewState
    }
  }
}