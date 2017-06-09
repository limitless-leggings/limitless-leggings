import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

/* -----------------    COMPONENT     ------------------ */
/* NOT DONE AT ALL YET; BELOW IS MOSTLY JUST CART COPIED. WAITING ON THIS 'TIL DATABASE IS PROPERLY SEEDED */

const Checkout = ({ /*?????*/ }) => {
  const calculateTotal = () => {
    return cart.reduce((acc, item) => {
      console.log('item.product', item.product)
      return acc + item.product.price
    }, 0)
    .toFixed(2)
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
                    <h4><a href="">{cartItem.product.title}</a></h4>
                  </td>
                  <td className="cart_price">
                    <p>{cartItem.product.price}</p>
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
      <span>Total Product Price: </span>
      <span className='text-right ng-binding'>${calculateTotal()}</span>
       <br></br>
      <button><Link to="/">Checkout</Link></button>
    </div>
  )
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ cart }) => ({ cart })
export default connect(mapState)(Cart)
