import axios from 'axios'
import { browserHistory } from 'react-router'

/* ------------       ACTIONS     ------------------ */

const AUTHENTICATED = 'AUTHENTICATED'
const SET = 'SET_CURRENT_USER'

/* ------------   ACTION CREATORS     ------------------ */

export const authenticated = user => ({
  type: AUTHENTICATED, user
})

export const set = user => ({
  type: SET,
  user
})

/* ------------       REDUCERS     ------------------ */

const reducer = (state = null, action) => {
  switch (action.type) {
    case AUTHENTICATED:
      return action.user

    case SET:
      return action.user
  }
  return state
}

/* ------------       DISPATCHERS     ------------------ */

export const login = (email, password) =>
  dispatch =>
    axios.post('/api/auth/login/local',
      { email, password })
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const logout = () =>
  dispatch =>
    axios.post('/api/auth/logout')
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const whoami = () =>
  dispatch =>
    axios.get('/api/auth/whoami')
      .then(response => {
        const user = response.data
        dispatch(authenticated(user))
      })
      .catch(failed => dispatch(authenticated(null)))

export const signup = (credentials) =>
  dispatch =>
    axios.post('/api/users',
      credentials)
       .then(() => dispatch(whoami()))
      .then(user => browserHistory.push(`/`))
      .catch((err) => console.error('create user unsuccessful', err))

export default reducer
