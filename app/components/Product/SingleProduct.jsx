import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchProductById } from '../../redux/products'

/* -----------------    COMPONENT     ------------------ */

class SingleProduct extends React.Component {
  render() {
    const selectedProduct = this.props.selected || { title: null }

    return (
      <div>
        <h1>This is the single-story page!</h1>
        <h2>Current product selected: { selectedProduct.title }</h2>
      </div>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = ({ products }) => ({ selected: products.selected }) // getting selectedProduct off of State and passing it into dumb part of component as props.selectedProduct

// const mapDispatch = { fetchProductById } // taking the fetchProductById dispatcher from the redux file, and

export default connect(mapStateToProps, null)(SingleProduct)
