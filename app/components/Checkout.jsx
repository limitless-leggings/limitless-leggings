import React from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'

import { buildNewOrder } from '../redux/cartItems'

/* -----------------    COMPONENT     ------------------ */

const Checkout = ({ createOrder, cart }) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    createOrder(cart)
  }

  const calculateTotal = () => {
    return cart.reduce((acc, item) => {
      return acc + (item.productItem.product.price * item.quantity)
    }, 0)
  }

  return (
    <div className="table-responsive cart_info">
      <table className="table table-condensed">
        <thead>
          <tr className="cart_menu">
            <td className="description">Products</td>
            <td className="price">Price</td>
            <td className="quantity">Quantity</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {
            cart.map(cartItem => {
              return (
                <tr key={cartItem.id}>
                  <td className="cart_description">
                    <h4><a href="">{cartItem.productItem.product.title} - Size {cartItem.productItem.size}</a></h4>
                  </td>
                  <td className="cart_price">
                    <p>${cartItem.productItem.product.price}</p>
                  </td>
                  <td className="cart_price">
                    <p>{cartItem.quantity}</p>
                  </td>
                </tr>)
            })

          }
        </tbody>
      </table>

      <br></br>
      <span>Total Product Price: ${calculateTotal()}</span>
      <hr />
      <form id='address-form' onSubmit={handleSubmit}>
        <div className="row center-block">
          <div className="col-lg-4">
            {/* Address part of form */}
            <h4>Shipping Information:</h4>
            <br />
            <div>
              <label>Street 1</label>
              <input type='text' name='street1' />
            </div>
            <div>
              <label>Street 2</label>
              <input type='text' name='street2' />
            </div>
            <div>
              <label>City</label>
              <input type='text' name='city' />
            </div>
            <div>
              <label>State</label>
              <input type='text' name='state' />
            </div>
            <div>
              <label>Zip Code</label>
              <input type='text' name='zipcode' />
            </div>
            <br />
          </div>
          <div className="col-lg-4">
            {/* Payment part of form */}
            <h4>Payment Information</h4>
            <br />
            <div>
              <label>Card Type</label>
              <select type='text' name='card-type' >
                <option>Visa</option>
                <option>MasterCard</option>
                <option>American Express</option>
              </select>
            </div>
            <div>
              <label>Credit Card Number</label>
              <input type='text' name='ccn' />
            </div>
            <div>
              <label>Card Security Code</label>
              <input type='text' name='ccn' />
            </div>
            <br />
          </div>
        <div className="col-lg-4">
          {/* Email part of form */}
          <h4>Email for Confirmation</h4>
          <br />
          <div>
            <label>Email</label>
            <input type='text' name='email' />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
        <center>
          <button type='submit'>Submit Order</button>
        </center>
        </div>
      </div>
    </form>
  </div>
  )
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ cart }) => ({ cart })
const mapDispatch = dispatch => ({
  createOrder: (cartItemArray) => {
    dispatch(buildNewOrder(cartItemArray))
    browserHistory.push('/completedorder')
  }
})

export default connect(mapState, mapDispatch)(Checkout)
