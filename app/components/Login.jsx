import React from 'react'

export const Login = ({ login }) => (
  <form className="loginform" onSubmit={evt => {
    evt.preventDefault()
    login(evt.target.username.value, evt.target.password.value)
  } }>
    <input className="login-parts-navbar" name="username" placeholder="demo@example.com"/>
    <input className="login-parts-navbar" name="password" type="password" placeholder="1234"/>
    <input className="login-parts-navbar btn btn-sm btn-warning login" type="submit" value="Login" />
  </form>
)

import {login} from 'APP/app/redux/auth'
import {connect} from 'react-redux'

export default connect(
  state => ({}),
  {login},
)(Login)
