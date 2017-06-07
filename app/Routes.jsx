'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Root from './components/Root'
import ProductList from './components/Product/ProductList'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'

import { fetchProducts } from './redux/products'

const Routes = ({fetchInitialData}) => (
  <Router history={browserHistory}>
    <Route path="/" component={Root} onEnter={fetchInitialData}>
      <IndexRedirect to="/products" />
      <Route path="/products" component={ProductList} />
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
  // onStoryEnter: (nextRouterState) => {
  //   const storyId = nextRouterState.params.id;
  //   dispatch(fetchStory(storyId));
  // }
})

export default connect(mapProps, mapDispatch)(Routes)
