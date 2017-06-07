import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

const INITIALIZE = 'INITIALIZE_STORIES'
// const CREATE     = 'CREATE_STORY';
// const UPDATE     = 'UPDATE_STORY';
// const REMOVE     = 'REMOVE_STORY';

/* ------------   ACTION CREATORS     ------------------ */

const init = products => ({ type: INITIALIZE, products })
// const create = story   => ({ type: CREATE, story });
// const remove = id      => ({ type: REMOVE, id });
// const update = story   => ({ type: UPDATE, story });

/* ------------       REDUCERS     ------------------ */

export default function reducer(products = [], action) {
  switch (action.type) {
  case INITIALIZE:
    return action.products

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
    return products
  }
}

/* ------------       DISPATCHERS     ------------------ */

export const fetchProducts = () => dispatch => {
  axios.get('/api/products')
    .then(res => dispatch(init(res.data)))
    .catch(err => console.error('Fetching products unsuccessful', err))
}
