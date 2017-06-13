'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, IndexRoute, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import Root from './components/Root'
import ProductList from './components/Product/ProductList'
import SingleProduct from './components/Product/SingleProduct'
import NotFound from './components/NotFound'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Sidebar from './components/Sidebar'
import Signup from './components/Signup'
import CompletedOrder from './components/CompletedOrder'


import { fetchProducts, fetchProductById, fetchProductsByCategoryId } from './redux/products'
import { fetchCategories } from './redux/categories'
import { fetchCartItems } from './redux/cartItems'

const Routes = ({fetchInitialData, onCartEnter, onProductEnter, onCategoryEnter, onCheckoutEnter}) => (
  <Router history={browserHistory}>
    <Route path="/" component={Root} onEnter={fetchInitialData}>
      <IndexRedirect to="/products" />
      <Route path="signup" component={Signup} />
      <Route path="/products" component={ProductList} onEnter={fetchInitialData} />
      <Route path="/categories/:categoryId" component={ProductList} onEnter={onCategoryEnter} />
      <Route path="/products/:productId" component={SingleProduct} onEnter={onProductEnter} />
      <Route path="/cart" component={Cart} onEnter={onCartEnter}/>
      <Route path="/checkout" component={Checkout} onEnter={onCartEnter} />
      <Route path="/completedorder" component={CompletedOrder} />
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
  onCategoryEnter: (nextRouterState) => {
    const categoryId = nextRouterState.params.categoryId
    dispatch(fetchProductsByCategoryId(categoryId))
  },
  onCartEnter: () => {
    dispatch(fetchCartItems())
  },
  // onCheckoutEnter: () => {

  // }
})

export default connect(mapProps, mapDispatch)(Routes)
