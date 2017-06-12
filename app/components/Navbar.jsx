import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import Login from './Login'
import WhoAmI from './WhoAmI'
// import { logout as logOutUser } from '../redux/auth';

/* -----------------    COMPONENT     ------------------ */

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const user = this.props.user
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
            <Link className="navbar-brand" to="/">{/*<img src="/images/logo.png" />*/}<h3>limitless leggings</h3></Link>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li>
                <Link to="/products" activeClassName="active">shop</Link>
              </li>
              <li>
                <Link to="#" activeClassName="active">our company</Link>
              </li>
              <li>
                <Link to="/login" activeClassName="active">login</Link>
              </li>
              <li>
                <Link to="/signup" activeClassName="active">sign up</Link>
              </li>
              <li>
                <Link to="/cart" activeClassName="active">your cart</Link>
              </li>
            </ul>
            {user ? <WhoAmI/> : <Login/>}
          </div>
        </div>
      </nav>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = ({auth}) => ({user: auth});
// equivalent to:
// const mapState = state => {
//   return {
//     currentUser: state.currentUser
//   };
// };

const mapDispatchToProps = dispatch => ({
//   logout: () => {
//     dispatch(logOutUser());
//   }
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);