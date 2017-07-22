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
      <div className="signin-container col-xs-8 col-xs-offset-2 col-sm-4 col-md-offset-4">
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
          <div className="back-line text-center">
            <h3>OR</h3>
          </div>
        </div>

        <div className="buffer oauth">
          <p className="text-center">
            <a
              target="_self"
              href="/api/auth/login/google">
              <i className="fa fa-google" />
                <button className="btn btn-block btn-primary btn-social btn-google">
                  {message} with Google
                </button>
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
    this.props.signup(credentials)
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = () => ({ message: 'Sign up' })

const mapDispatch = { signup }

export default connect(mapState, mapDispatch)(Signup)
