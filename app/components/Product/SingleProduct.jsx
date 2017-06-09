import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchProductById } from '../../redux/products'
import Sidebar from '../Sidebar'
// import { ButtonToolbar, Button } from 'react-bootstrap'
// Example of how to use components from React Bootstrap

/* -----------------    COMPONENT     ------------------ */

const SingleProduct = ({selectedProduct}) => (
  <div id="main">
    <div className="col-xs-2">
      <Sidebar />
    </div>
    <div className="col-xs-10">
      <div>
        <h3>{ selectedProduct.title }</h3>
        <img src={ selectedProduct.photoUrl } className="img-thumbnail"/>
      </div>
    </div>
  </div>
)

/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = ({ products }) => ({ selectedProduct: products.selectedProduct }) // getting selectedProduct off of State and passing it into dumb part of component as props.selectedProduct

// const mapDispatch = { fetchProductById } // taking the fetchProductById dispatcher from the redux file, and

export default connect(mapStateToProps)(SingleProduct)
