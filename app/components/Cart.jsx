import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

/* -----------------    COMPONENT     ------------------ */

const Cart = ({ cartItems }) => {
  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => {
      return acc + item.price
    }, 0)
  }

  return (
    <div className="table-responsive cart_info">
      <table className="table table-condensed">
        <thead>
          <tr className="cart_menu">
            <td className="description"></td>
            <td className="price">Price</td>
            <td className="quantity">Quantity</td>
            <td className="total">Total</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          <div>
            {
              cartItems.map(product => {
                return (
                  <tr>
                    <td className="cart_description">
                      <h4><a href="">{product.title}</a></h4>
                    </td>
                    <td className="cart_price">
                      <p>{product.price}</p>
                    </td>
                    <td className="cart_total">
                      <p className="cart_total_price">{product.price}</p>
                    </td>

                  </tr>)
              })
            }
          </div>
        </tbody>
      </table>

      <button className="btn btn-xs btn-danger remove  btn-circle">Check Out</button>
      <br></br>
      <span>Total Product Price</span>
      <span className='text-right ng-binding'>`$ ${calculateTotal}`</span>
       <br></br>
      <button><Link to="/">Checkout</Link></button>
    </div>
  )
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ cartItems }) => ({ cartItems })
export default connect(mapState)(Cart)
