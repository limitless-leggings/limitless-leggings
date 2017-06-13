import React from 'react'
import { Link } from 'react-router'

const About = props => {
  const { pathname } = props.location || { pathname: '<< no path >>' }

  return (
    <div className="col-md-6">
      <h1>Limitless Leggings</h1>
      <p className="productdescription">We've been a company since 2017. This is a beta page for our Grace Shopper project. Enjoy! (Also, apologies to Lotus Leggings for ripping off their images....)</p>
      <p>xoxo, Lynne, Marina, and Sophia</p>
      <Link to="/"><h3>Back to shopping!</h3></Link>
    </div>
  )
}

export default About