import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { INCREASE_QUANTITY, DECREASE_QUANTITY } from '../redux/cartItems'

/* -----------------    COMPONENT     ------------------ */
class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.onClickDecrease = this.onClickDecrease.bind(this)
    this.onClickIncrease = this.onClickIncrease.bind(this)
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
      <div className="table-responsive cart_info">
        <table className="table table-condensed">
          <thead>
            <tr className="cart_menu">
              <td className="description">Products</td>
              <td className="price">Price</td>
              <td className="quantity">Quantity</td>
              <td className="increase_button"></td>
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
                      {/*<td className="cart_qty_decrease">
                        <button key={cartItem.id} onClick={this.onClickDecrease}>-</button>
                      </td>*/}
                      <td className="cart_quantity">
                        <form onClick={this.onClickDecrease}>
                        <p> <button >-</button>
                        {cartItem.quantity}
                        <button >+</button></p>
                        </form>
                      </td>
                      {/*<td className="cart_qty_increase">
                        <button onClick={this.onClickIncrease} >+</button>
                      </td>*/}
                    </tr>
                )
              })
            }
          </tbody>
        </table>
        <br></br>
        <span>Total Product Price: </span>
        <span className='text-right ng-binding'>${this.calculateTotal()}</span>
        <br></br>
        <button type="button" className="btn btn-success" ><Link to="/">Checkout</Link></button>
      </div>
    )
  }

  onClickDecrease(event) {
    event.preventDefault()
    console.log('decrease button!!!', event.target)
    // this.props.increase()
  }

  onClickIncrease(event) {
    event.preventDefault()
    console.log('increase button!!!', event.target)
    // this.props.decrease()
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = ({ cart }) => ({ cart })
const mapDispatchToProps = (dispatch) => {
  return {
    increase: (item) => {
      dispatch({
        type: INCREASE_QUANTITY
      })
    },
    decrease: (item) => {
      dispatch({
        type: DECREASE_QUANTITY
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
