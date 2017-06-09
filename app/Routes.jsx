'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import Root from './components/Root'
import ProductList from './components/Product/ProductList'
import SingleProduct from './components/Product/SingleProduct'
import NotFound from './components/NotFound'
import Cart from './components/Cart'
import Sidebar from './components/Sidebar'

import { fetchProducts, fetchProductById } from './redux/products'
import { fetchCategories } from './redux/categories'
import {fetchCartItems} from './redux/cartItems'

const Routes = ({fetchInitialData, onCartEnter, onProductEnter}) => (
  <Router history={browserHistory}>
    <Route path="/" component={Root} onEnter={fetchInitialData}>
      <IndexRedirect to="/products" />
      <Route path="/products" component={ProductList} />
      <Route path="/products/:productId" component={SingleProduct} onEnter={onProductEnter} />
      <Route path="/cart" component={Cart} onEnter={onCartEnter}/>
    </Route>
    <Route path='*' component={NotFound} />
  </Router>
)

/* -----------------    CONTAINER     ------------------ */

const mapProps = null

const mapDispatch = dispatch => ({
  fetchInitialData: () => {
    dispatch(fetchProducts())
    dispatch(fetchCategories())
  },
  onProductEnter: (nextRouterState) => {
    const productId = nextRouterState.params.productId
    dispatch(fetchProductById(productId)) // dispatches specific reducer that does axios request w/ productId of clicked-on product
  },
  onCartEnter: () => {
    dispatch(fetchCartItems())
  }
})

export default connect(mapProps, mapDispatch)(Routes)
