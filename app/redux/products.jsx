import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

const INITIALIZE = 'INITIALIZE_PRODUCTS'
// const CREATE     = 'CREATE_STORY'; // name appropriately -- KHLM
const SELECT = 'SELECT_PRODUCT'
// const REMOVE     = 'REMOVE_STORY';

/* ------------   ACTION CREATORS     ------------------ */

const init = products => ({ type: INITIALIZE, products })
// const create = story   => ({ type: CREATE, story }) // comment in and update to product -- KHLM
// const remove = id      => ({ type: REMOVE, id }) // comment in -- KHLM
const select = product => ({ type: SELECT, product })

/* ------------       REDUCERS     ------------------ */

const initialProductsState = {
  selected: {}, // self documenting variables selectedProduct -- kHLM
  list: [] // same as above, also make sure you are consistent; userList, orderList -- KHLM
}

export default function reducer(state = initialProductsState, action) {
  const newState = Object.assign({}, state)

  switch (action.type) {
  case INITIALIZE: // consider this name moving forward with how you layout your site -- KHLM
    newState.list = action.products
    break

  // case CREATE:
  //   return [action.story, ...stories];

  // case REMOVE:
  //   return stories.filter(story => story.id !== action.id);

  // case REMOVE_USER:
  //   return stories.filter(story => story.author_id !== action.id);

  case SELECT:
    newState.selected = action.product
    break

    // products.map(product => (
    //   action.product.id === product.id ? action.selectedProduct : product
    // ))

  default:
    return state
  }

  return newState
}

/* ------------       DISPATCHERS     ------------------ */

// axios request for ALL stories
export const fetchProducts = () => dispatch => {
  axios.get('/api/products')
    .then(res => dispatch(init(res.data)))
    .catch(err => console.error('Fetching products unsuccessful', err)) // fine for now, show the user that something went wrong. Maybe refer to juke forms; maybe look into growls -- KHLM
}

// axios request for a single story
export const fetchProductById = (id) => dispatch => {
  axios.get(`/api/products/${id}`)
    .then(res => dispatch(select(res.data)))
    .catch(err => console.error('Fetching product unsuccessful', err))
}
