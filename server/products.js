'use strict'

const db = require('APP/db')
const Product = db.model('products')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router()
  .param('productId',
    (req, res, next, productId) => {
      if (!Number(productId)) {
        res.sendStatus(500)
      } else {
        Product.findById(productId)
        .then(product => {
          req.product = product
          next()
        })
        .catch(next)
      }
    })
  .get('/',
    // forbidden('listing all products is not allowed'),
    (req, res, next) =>
      Product.findAll()
        .then(products => res.json(products))
        .catch(next))
  .post('/',
    (req, res, next) =>
      Product.create(req.body)
      .then(product => res.status(201).json(product))
      .catch(next))
  .get('/:productId',
    // mustBeLoggedIn,
    (req, res, next) => {
      if (!req.product) res.sendStatus(404)
      res.json(req.product)
    })
  .put('/:productId',
    // mustBeLoggedIn,
    (req, res, next) => {
      if (!req.product) res.sendStatus(404)
      Product.update(
        req.body,
        { where: { id: req.product.id }, returning: true })
      .spread((_, updatedProducts) => {
        res.json(updatedProducts[0])
      })
      .catch(next)
    })
