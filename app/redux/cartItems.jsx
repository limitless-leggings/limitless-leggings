import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

const INITIALIZE = 'INITIALIZE_CARTITEMS'
// const CREATE     = 'CREATE_STORY';
// const UPDATE     = 'UPDATE_STORY';
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

  // case CREATE:
  //   return [action.story, ...stories];

  // case REMOVE:
  //   return stories.filter(story => story.id !== action.id);

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

export const fetchProducts = () => dispatch => {
  axios.get('/api/cartItems')
    .then(res => dispatch(init(res.data)))
    .catch(err => console.error('Fetching cartItems unsuccessful', err))
}
