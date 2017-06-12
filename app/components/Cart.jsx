import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { UPDATE_QUANTITY } from '../redux/cartItems'

/* -----------------    COMPONENT     ------------------ */
class Cart extends React.Component {
  constructor(props) {
    super(props)
    const temp = {}
    this.props.cart.map(cartItem => {
      temp[cartItem.id] = cartItem.quantity
    })

    this.state = temp

    this.handleChange = this.handleChange.bind(this)
    this.handleSbumit = this.handleSubmit.bind(this)
  }

  calculateTotal() {
    return this.props.cart.reduce((acc, item) => {
      return acc + (item.product.price * item.quantity)
    }, 0)
      .toFixed(2)
  }

  render() {
    const { cart } = this.props
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {
            cart.map(cartItem => {
              const bindedHandleChange = this.handleChange.bind(this, cartItem.id)
              return (
                <row key={cartItem.id}>
                  <h4><a href="">{cartItem.product.title}</a></h4>
                  <p>$ {cartItem.product.price}</p>
                  <input placeholder={cartItem.quantity} onChange={bindedHandleChange} value= {this.state[cartItem.id]}></input>
                  <button type='submit' value='submit' className="btn btn-info btn-sm">update</button>
                </row>
              )
            })
          }
        </form>
        <br></br>
        <span>Total Product Price: </span>
        <span className='text-right ng-binding'>${this.calculateTotal()}</span>
        <br></br>
        <button className="btn btn-info btn-sm"><Link to="/">Checkout</Link></button>
      </div>
    )
  }

  handleChange(itemIndex, event) {
    console.log('change event target!!!', event.target.value)
    const temp = Object.assign({}, this.state)
    temp[itemIndex] = Number(event.target.value)
    console.log('temp', temp)
    this.setState(temp, () => console.log('state changed', this.state)
    )
  }

  handleSubmit(event) {
    event.preventDefault()
    // console.log('submit target!!!', event.target)
    // this.props.increase()
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = ({ cart }) => ({ cart })
const mapDispatchToProps = (dispatch) => {
  return {
    increase: (item) => {
      dispatch({
        type: UPDATE_QUANTITY
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
