import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')())
import {shallow} from 'enzyme'
import {createStore} from 'redux'

import SingleProduct from './SingleProduct'

/* global describe it beforeEach */
describe('<SingleProduct />', () => {
  const testProductItem = {
    size: 'S',
    quantity: 5,
    product_id: 1
  }

  const testProduct = {
    title: 'test-title',
    description: 'this is a test',
    price: 9.99,
    photoUrl: 'http://lorempixel.com/300/300/',
    category_id: 1,
    productItem: testProductItem
  }

  const state = {
    auth: {name: 'So many names'},
    products: {
      selectedProduct: { testProduct }
    }
  }

  let root, store, dispatch
  beforeEach('render the root', () => {
    store = createStore(state => state, state)
    root = shallow(<SingleProduct product={testProduct} store={store}/>)
    root.setState({
      selectedId: 1,
      selectedSize: 'M',
      selectedQuantity: 1})
  })

  it('shows the product title', () => {
    expect(root.find('h3')).to.have.length(1)
    expect(root.find('h3').text()).equal(testProduct.title)
  })
})
