import React from 'react'

export const Login = ({ login }) => (
  <form className="loginform" onSubmit={evt => {
    evt.preventDefault()
    login(evt.target.username.value, evt.target.password.value) //we'll do this again at the end of signup
  } }>
    <input name="username" />
    <input name="password" type="password" />
    <input type="submit" value="Login" />
  </form>
)

import {login} from 'APP/app/redux/auth'
import {connect} from 'react-redux'

export default connect(
  state => ({}),
  {login},
)(Login)
