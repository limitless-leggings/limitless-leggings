import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

const INITIALIZE = 'INITIALIZE_CARTITEMS'
const UPDATE = 'UPDATE_QUANTITY'
// const REMOVE     = 'REMOVE_STORY';

/* ------------   ACTION CREATORS     ------------------ */

const init = cartItems => ({ type: INITIALIZE, cartItems })
const update = updatedValues => ({ type: UPDATE, updatedValues })
// const remove = id      => ({ type: REMOVE, id });
// const update = story   => ({ type: UPDATE, story });

/* ------------       REDUCERS     ------------------ */

export default function reducer(cartItems = [], action) {
  switch (action.type) {
  case INITIALIZE:
    return action.cartItems

  // case UPDATE:
  //   console.log('~!~!~!~!CART ITEMS', action.updatedValues)
  //   return Object.assign({}, action.updatedValues)
      // return cartItems.map(cartitem => (
      //   action.cartItems.id === .id ? action.story :
      // ))

    // case REMOVE_USER:
    //   return stories.filter(story => story.author_id !== action.id);

    //   return stories.map(story => (
    //     action.story.id === story.id ? action.story : story
    //   ));

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

export const updateQty = (updatedValues) => dispatch => {
  console.log('updatedValue', updatedValues)
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
