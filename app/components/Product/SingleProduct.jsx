import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'
import { range } from 'lodash'

import { fetchProductById, updateSelectedSize } from '../../redux/products'
import Sidebar from '../Sidebar'

/* -----------------    COMPONENT     ------------------ */

class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedSize: '',
      selectedQuantity: 0
    }
    this.updateSelectedSize = this.updateSelectedSize.bind(this)
    this.updateSelectedQuantity = this.updateSelectedQuantity.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  updateSelectedSize(event) {
    this.setState({
      selectedSize: event.target.value
    })
  }

  updateSelectedQuantity(event) {
    this.setState({
      selectedQuantity: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  render() {
    const selectedProduct = this.props.selectedProduct
    const selectedSize = this.state.selectedSize
    const selectedQuantity = this.state.selectedQuantity

    const updateSelectedSize = this.updateSelectedSize
    const updateSelectedQuantity = this.updateSelectedQuantity
    const handleSubmit = this.handleSubmit

    function createQuantityArrayFromSize() {
      let selectedItem = selectedProduct.productItems.filter(item => {
        return item.size === selectedSize
      })
      if (selectedItem[0]) {
        let maxQuantity = selectedItem[0].quantity
        return range(1, maxQuantity + 1)
      } else {
        return ['Please select a size']
      }
    }

    return (
      <div id="main">
      <div className="col-xs-2">
        <Sidebar/>
      </div>
      <div className="col-xs-10">
        <div>
          <h3>{selectedProduct.title}</h3>
          <img src={selectedProduct.photoUrl} className="img-thumbnail"/>
          <p>{selectedProduct.description}</p>

          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Select Size</ControlLabel>
            <FormControl onChange={updateSelectedSize} componentClass="select" placeholder="select">
              {selectedProduct.productItems.map((productItem) => (
                  <option key={productItem.id} value={productItem.size}>{productItem.size}</option>
                ))}
            </FormControl>

            <ControlLabel>Select Quantity</ControlLabel>
            <FormControl onChange={updateSelectedQuantity} componentClass="select" placeholder="select">
              {createQuantityArrayFromSize(selectedSize).map((quantity) => (
                <option key={quantity} value={quantity}>{quantity}</option>
              ))}
            </FormControl>
          </FormGroup>

          <Button onSubmit={handleSubmit} type="submit" bsStyle="success">Add to Cart</Button>
        </div>
      </div>
    </div>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = ({products}) => ({
  selectedProduct: products.selectedProduct
})

// const mapDispatchToProps = (dispatch) => {
//   return {
//     updateSelectedSize: (event) => {
//       dispatch(updateSelectedSize(event.target.value))
//     }
//   }
// }

export default connect(mapStateToProps)(SingleProduct)
