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

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  calculateTotal() {
    if (this.props.cart.length) {
      return this.props.cart.reduce((acc, item) => {
        return acc + (item.productItem.product.price * item.quantity)
      }, 0)
      .toFixed(2)
    }
  }

  render() {
    const { cart } = this.props
    return (
      <div>
        <div className="row">
           <div className="col-md-2 col-md-offset-1">
             <h4>Products</h4>
           </div>
           <div className="col-md-2 col-md-offset-1">
             <h4>Price</h4>
           </div>
           <div className="col-md-2 col-md-offset-1">
             <h4>Quantity</h4>
           </div>
        </div>
        <form onSubmit={this.handleSubmit}>
          {
            cart.length > 0
              ? cart.map(cartItem => {
                const bindedHandleChange = this.handleChange.bind(this, cartItem.id)
                return (
                  <div className="row" key={cartItem.id}>
                    <div className="col-md-3 col-md-offset-1">
                      <h4><Link to={`/products/${cartItem.id}`}>{cartItem.productItem && cartItem.productItem.product.title} - size {cartItem.productItem && cartItem.productItem.size}</Link></h4>
                    </div>
                    <div className="col-md-3">
                      <p>$ {cartItem.productItem && cartItem.productItem.product.price}</p>
                    </div>

                    <div className="col-md-3">
                      <input placeholder={cartItem.quantity} onChange={bindedHandleChange} value={this.state[cartItem.id]}></input>
                    </div>
                    <thead>
                    </thead>
                  </div>
                )
              })
              : <h2>Your Cart is Empty!</h2>
          }
          <div className="col-md-offset-1">
            <button type='submit' value='submit' className="btn btn-info btn-sm">Update Cart</button>
          </div>
        </form>
        <br></br>
        <div className="col-md-offset-1">
          <span>Total Product Price: </span>
          <span className='text-right ng-binding'>${this.calculateTotal()}</span>
        </div>
        <br></br>
        <div className="col-md-offset-1">
          <button><Link to="/checkout">Checkout</Link></button>
        </div>
      </div>
    )
  }

  handleChange(itemIndex, event) {
    const temp = Object.assign({}, this.state.cartItems)
    temp[itemIndex] = Number(event.target.value)
    this.setState({ cartItems: temp })
  }

  handleSubmit(event) {
    event.preventDefault()
    const updatedValues = this.state.cartItems
    this.props.updateQty(updatedValues)
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = ({ cart }) => ({ cart })

const mapDispatchToProps = { updateQty }

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
