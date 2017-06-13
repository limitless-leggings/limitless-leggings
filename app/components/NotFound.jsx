import React from 'react'
import { Link } from 'react-router'

const NotFound = props => {
  const {pathname} = props.location || {pathname: '<< no path >>'}
  console.error('NotFound: %s not found (%o)', pathname, props)
  return (
    <div>
      <h1>Sorry, I couldn't find this page:<pre>{pathname}</pre></h1>
      <h2><Link to="/">Get back to shopping?</Link></h2>

    </div>

  )
}

export default NotFound
