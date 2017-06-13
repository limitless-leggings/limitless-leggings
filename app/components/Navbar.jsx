import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import Login from './Login'
import WhoAmI from './WhoAmI'
// import { logout as logOutUser } from '../redux/auth';

/* -----------------    COMPONENT     ------------------ */

const Navbar = ({user, cart}) => {
  return (
    <nav className="navbar navbar-default">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target=".navbar-collapse">
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <Link className="navbar-brand" to="/">limitless leggings</Link>
        </div>
        <div className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <li>
              <Link to="/products" activeClassName="active">shop</Link>
            </li>
            <li>
              <Link to="/about" activeClassName="active">our company</Link>
            </li>
            <li>
              <Link to="/signup" activeClassName="active">sign up</Link>
            </li>
            <li>
              <Link to="/cart" activeClassName="active">your cart ({cart.length} {cart.length === 1 ? 'item' : 'items'})</Link>
            </li>
          </ul>
          <div className="login-navbar">
            {user ? <WhoAmI/> : <Login/>}
          </div>
        </div>
      </div>
    </nav>
  )
}

/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = ({auth, cart}) => ({user: auth, cart})

export default connect(mapStateToProps)(Navbar)
