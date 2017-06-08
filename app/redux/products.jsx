import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

const INITIALIZE = 'INITIALIZE_PRODUCTS'
// const CREATE     = 'CREATE_STORY';
const SELECT = 'SELECT_PRODUCT'
// const REMOVE     = 'REMOVE_STORY';

/* ------------   ACTION CREATORS     ------------------ */

const init = products => ({ type: INITIALIZE, products })
// const create = story   => ({ type: CREATE, story })
// const remove = id      => ({ type: REMOVE, id })
const select = product => ({ type: SELECT, product })

/* ------------       REDUCERS     ------------------ */

const initialProductsState = {
  selected: {},
  list: []
}

export default function reducer(state = initialProductsState, action) {
  const newState = Object.assign({}, state)

  switch (action.type) {
  case INITIALIZE:
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
    .catch(err => console.error('Fetching products unsuccessful', err))
}

// axios request for a single story
export const fetchProductById = (id) => dispatch => {
  axios.get(`/api/products/${id}`)
    .then(res => dispatch(select(res.data)))
    .catch(err => console.error('Fetching product unsuccessful', err))
}
