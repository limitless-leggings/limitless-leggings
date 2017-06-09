import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

// const INITIALIZE = 'INITIALIZE_PRODUCTS'
const FILTER = 'FILTER_PRODUCTS'
const CREATE = 'CREATE_PRODUCT'
const SELECT = 'SELECT_PRODUCT'
const REMOVE = 'SELECT_STORY'

/* ------------   ACTION CREATORS     ------------------ */

const filter = products => ({ type: FILTER, products })
// const init = products => ({ type: INITIALIZE, products })
const create = product => ({ type: CREATE, product })
const remove = id => ({ type: REMOVE, id })
const select = product => ({ type: SELECT, product })

/* ------------       REDUCERS     ------------------ */

const initialProductsState = {
  selectedProduct: {},
  productsList: []
}

const reducer = (state = initialProductsState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
  case FILTER: // consider this name moving forward with how you layout your site -- KHLM
    newState.productsList = action.products
    break

  // case CREATE:
  //   return [action.story, ...stories];

  // case REMOVE:
  //   return stories.filter(story => story.id !== action.id);

  // case REMOVE_USER:
  //   return stories.filter(story => story.author_id !== action.id);

  case SELECT:
    newState.selectedProduct = action.product
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
    .then(res => dispatch(filter(res.data)))
    .catch(err => console.error('Fetching products unsuccessful', err)) // fine for now, show the user that something went wrong. Maybe refer to juke forms; maybe look into growls -- KHLM
}

// axios request for a single story
export const fetchProductById = (id) => dispatch => {
  axios.get(`/api/products/${id}`)
    .then(res => dispatch(select(res.data)))
    .catch(err => console.error('Fetching product unsuccessful', err))
}

export const fetchProductsByCategoryId = (categoryId) => (dispatch) => {
  axios.get(`/api/products/category/${categoryId}`)
    .then(res => dispatch(filter(res.data)))
    .catch(err => console.error('Fetching products by category ID unsuccessful', err))
}

export default reducer
