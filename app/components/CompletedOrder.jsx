import React from 'react'
import { Link } from 'react-router'

const CompletedOrder = props => {
  const { pathname } = props.location || { pathname: '<< no path >>' }

  return (
    <div>
      <h1>Congratulations, your order is on its way!</h1>
      <h3>You should receive a confirmation email momentarily with more details.</h3>
      <Link to="/"><h3>Back to shopping!</h3></Link>
    </div>
  )
}

export default CompletedOrder