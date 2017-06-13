import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

const INITIALIZE = 'INITIALIZE_CARTITEMS'
const ADD = 'ADD_CARTITEM'
const UPDATE = 'UPDATE_QUANTITY'
//const CREATE_ORDER = 'CREATE_ORDER';
// const REMOVE     = 'REMOVE_STORY';

/* ------------   ACTION CREATORS     ------------------ */

const init = cartItems => ({ type: INITIALIZE, cartItems })
const add = cartItem => ({ type: ADD, cartItem })
const update = updatedValues => ({ type: UPDATE, updatedValues })

/* ------------       REDUCERS     ------------------ */

export default function reducer(cartItems = [], action) {
  switch (action.type) {
  case INITIALIZE:
    return action.cartItems

  case ADD:
    return [...cartItems, action.cartItem]

  default:
    return cartItems
  }
}

/* ------------       DISPATCHERS     ------------------ */

export const fetchCartItems = () => dispatch => {
  return axios.get('/api/cart')
    .then(res => {
      return dispatch(init(res.data))
    })
    .catch(err => console.error('Fetching cartItems unsuccessful', err))
}

export const addCartItem = (cartItem) => dispatch => {
  return axios.post('/api/cart/', cartItem)
    .then(res => {
      console.log('&&&&&', res.data)
      return dispatch(add(res.data))
    })
    .catch(err => console.error('Addding cartItem unsuccessful', err))
}

export const updateQty = (updatedValues) => dispatch => {
  const promisesArr= []
  for (var key in updatedValues) {
    const temp = {}
    temp.id = Number(key)
    temp.quantity = updatedValues[key]
    promisesArr.push(axios.put(`/api/cart/${key}`, temp))
  }
  Promise.all(promisesArr)
  .then(res => {
    return dispatch(fetchCartItems())
  })
    .catch(err => console.error('Update cartItems unsuccessful', err))
}

export const buildNewOrder = (cartItemArray) => dispatch => {
  axios.post('/api/cart/order')
    .then(res => {
      //
    })
    .catch(err => console.error('Order build unsuccessful', err))
}
