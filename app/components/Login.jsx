import React from 'react'

export const Login = ({ login }) => (
  <form className="loginform" onSubmit={evt => {
    evt.preventDefault()
    login(evt.target.username.value, evt.target.password.value) // we'll do this again at the end of signup
  } }>
    <input className="login-parts-navbar" name="username" />
    <input className="login-parts-navbar" name="password" type="password" />
    <input className="login-parts-navbar btn btn-sm btn-warning login" type="submit" value="Login" />
  </form>
)

import {login} from 'APP/app/redux/auth'
import {connect} from 'react-redux'

export default connect(
  state => ({}),
  {login},
)(Login)
