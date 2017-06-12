import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { updateQty } from '../redux/cartItems'

/* -----------------    COMPONENT     ------------------ */
class Cart extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      cartItems: {}
    }
    // set total price as part of the state

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  calculateTotal() {
    return this.props.cart.reduce((acc, item) => {
      return acc + (item.productItem.product.price * item.quantity)
    }, 0)
      .toFixed(2)
  }

  render() {
    const { cart } = this.props
    console.log('cart here ', cart)
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {
            cart[0]
            ? cart.map(cartItem => {
              const bindedHandleChange = this.handleChange.bind(this, cartItem.id)
              return (
                <div className="form-inline" key={cartItem.id}>
                  <h4><Link to={`/products/${cartItem.id}`}>{cartItem.productItem.product.title} - size {cartItem.productItem.size}</Link></h4>
                  <p>$ {cartItem.productItem.product.price}</p>
                  <input placeholder={cartItem.quantity} onChange={bindedHandleChange} value={this.state[cartItem.id]}></input>
                </div>
              )
            })
            : <div></div>
          }
          <button type='submit' value='submit' className="btn btn-info btn-sm">Update Cart</button>
        </form>
        <br></br>
        <span>Total Product Price: </span>
        <span className='text-right ng-binding'>${this.calculateTotal()}</span>
        <br></br>
        <button><Link to="/">Checkout</Link></button>
      </div>
    )
  }

  handleChange(itemIndex, event) {
    const temp = Object.assign({}, this.state.cartItems)
    temp[itemIndex] = Number(event.target.value)
    this.setState({cartItems: temp})
  }

  handleSubmit(event) {
    event.preventDefault()
    const updatedValues = this.state.cartItems
    this.props.updateQty(updatedValues)
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = ({ cart }) => ({ cart })

const mapDispatchToProps ={ updateQty }

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
