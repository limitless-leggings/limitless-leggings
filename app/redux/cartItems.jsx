import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

const INITIALIZE = 'INITIALIZE_CARTITEMS'
const INCREASE_QUANTITY = 'INCREASE_QUANTITY'
const DECREASE_QUANTITY = 'DECREASE_QUANTITY'
// const REMOVE     = 'REMOVE_STORY';

/* ------------   ACTION CREATORS     ------------------ */

const init = cartItems => ({ type: INITIALIZE, cartItems })
// const create = story   => ({ type: CREATE, story });
// const remove = id      => ({ type: REMOVE, id });
// const update = story   => ({ type: UPDATE, story });

/* ------------       REDUCERS     ------------------ */

export default function reducer(cartItems = [], action) {
  switch (action.type) {
  case INITIALIZE:
    return action.cartItems

  case INCREASE_QUANTITY:
    return //

  case DECREASE_QUANTITY:
    return //

  // case REMOVE_USER:
  //   return stories.filter(story => story.author_id !== action.id);

  // case UPDATE:
  //   return stories.map(story => (
  //     action.story.id === story.id ? action.story : story
  //   ));

  default:
    return cartItems
  }
}

/* ------------       DISPATCHERS     ------------------ */

export const fetchCartItems = () => dispatch => {
  axios.get('/api/cart')
    .then(res => dispatch(init(res.data)))
    .catch(err => console.error('Fetching cartItems unsuccessful', err))
}

export const increaseQty = () => dispatch => {
  axios.update()
}
