import React from 'react'
import Navbar from './Navbar'

const Root = ({ user, children }) => (
  <div>
    <nav>
      <Navbar />
    </nav>
    {children}
  </div>
)

export default Root
