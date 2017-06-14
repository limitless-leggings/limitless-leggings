import React from 'react'
import { connect } from 'react-redux'
import { signup } from '../redux/auth'

/* -----------------    COMPONENT     ------------------ */

class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.onSignupSubmit = this.onSignupSubmit.bind(this)
  }

  render() {
    const { message } = this.props
    return (
      <div className="signin-container">
        <div className="buffer local">
          <form onSubmit={this.onSignupSubmit}>
            <div className="form-group">
              <label>email</label>
              <input
                name="email"
                type="email"
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-block btn-primary">{message}</button>
          </form>
        </div>
        <div className="or buffer">
          <div className="back-line">
            <span>OR</span>
          </div>
        </div>

        <div className="buffer oauth">
          <p>
            <a
              target="_self"
              href="/api/auth/login/google"
              className="btn btn-social btn-google">
              <i className="fa fa-google" />
              <span>{message} with Google</span>
            </a>
          </p>
        </div>
      </div>
    )
  }

  onSignupSubmit(event) {
    event.preventDefault()
    const credentials = {
      email: event.target.email.value,
      password: event.target.password.value
    }
    console.log('credentials', credentials)
    this.props.signup(credentials)
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = () => ({ message: 'Sign up' })

const mapDispatch = { signup }
// // equivalent to:
// const mapDispatch = (dispatch) => {
//   return {
//     signup: function (credentials) {
//       dispatch(signupAndGoToUser(credentials));
//     }
//   };
// };

export default connect(mapState, mapDispatch)(Signup)
