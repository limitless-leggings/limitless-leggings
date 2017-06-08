'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Root from './components/Root'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import ProductList from './components/Product/ProductList'
import SingleProduct from './components/Product/SingleProduct'
import NotFound from './components/NotFound'

import { fetchProducts, fetchProductById } from './redux/products'

const Routes = ({fetchInitialData, onProductEnter}) => (
  <Router history={browserHistory}>
    <Route path="/" component={Root} onEnter={fetchInitialData}>
      <IndexRedirect to="/products" />
      <Route path="/products" component={ProductList} />
      <Route path="/products/:productId" component={SingleProduct} onEnter={onProductEnter} />
    </Route>
    <Route path='*' component={NotFound} />
  </Router>
)

/* -----------------    CONTAINER     ------------------ */

const mapProps = null

const mapDispatch = dispatch => ({
  fetchInitialData: () => {
    dispatch(fetchProducts())
  },
  onProductEnter: (nextRouterState) => {
    const productId = nextRouterState.params.productId
    console.log('IN THE FETCHPRODUCT DATA! PRODUCTID: ', productId)
    dispatch(fetchProductById(productId)) // dispatches specific reducer that does axios request w/ productId of clicked-on product
  }
})

export default connect(mapProps, mapDispatch)(Routes)
