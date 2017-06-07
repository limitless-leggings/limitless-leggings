import React from 'react'
import Login from './Login'
import WhoAmI from './WhoAmI'

const Root = ({ user, children }) => (
  <div>
    <nav>
      {user ? <WhoAmI/> : <Login/>}
    </nav>
    {children}
  </div>
)

export default Root
