import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

const INITIALIZE = 'INITIALIZE_CATEGORIES'
const CREATE = 'CREATE_CATEGORY'
const SELECT = 'SELECT_CATEGORY'
const REMOVE = 'SELECT_CATEGORY'

/* ------------   ACTION CREATORS     ------------------ */

const init = categories => ({ type: INITIALIZE, categories })
const create = category => ({ type: CREATE, category })
const remove = id => ({ type: REMOVE, id })
const select = category => ({ type: SELECT, category })

/* ------------       REDUCERS     ------------------ */

const initialCategoryState = {
  selectedCategory: {},
  categoryList: []
}

const reducer = (state = initialCategoryState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
  case INITIALIZE:
    newState.categoryList = action.categories
    break

  case SELECT:
    newState.selectedCategory = action.category
    break

  default:
    return state
  }

  return newState
}

/* ------------       DISPATCHERS     ------------------ */

// axios request for ALL stories
export const fetchCategories = () => dispatch => {
  axios.get('/api/categories')
    .then(res => dispatch(init(res.data)))
    .catch(err => console.error('Fetching categories unsuccessful', err)) // fine for now, show the user that something went wrong. Maybe refer to juke forms; maybe look into growls -- KHLM
}

// axios request for a single story
export const fetchCategoryById = (id) => dispatch => {
  axios.get(`/api/categories/${id}`)
    .then(res => dispatch(select(res.data)))
    .catch(err => console.error('Fetching category unsuccessful', err))
}

export default reducer
