import React from 'react'

export const WhoAmI = ({ user, logout }) => (
  <div className="whoami">
    <button className="btn btn-warning logout" onClick={logout}>Logout</button>
  </div>
)

   // <span className="whoami-user-name">{user && user.name}</span>

import {logout} from 'APP/app/redux/auth'
import {connect} from 'react-redux'

export default connect(
  ({ auth }) => ({ user: auth }),
  {logout},
)(WhoAmI)
