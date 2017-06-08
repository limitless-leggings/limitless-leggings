'use strict'

const db = require('APP/db')
const Product = db.model('products')

const {mustBeLoggedIn, forbidden, assertAdmin} = require('./auth.filters')

module.exports = require('express').Router()
  .param('productId',
    (req, res, next, productId) => {
      if (!Number(productId)) {
        res.sendStatus(500) // same as before -- KHLM
      } else {
        Product.findById(productId)
        .then(product => {
          // same as before -- KHLM
          req.product = product
          next()
        })
        .catch(next)
      }
    })
  .get('/',
    (req, res, next) =>
      Product.findAll()
        .then(products => res.json(products))
        .catch(next))
  .post('/', assertAdmin,
    (req, res, next) =>
      Product.create(req.body)
      .then(product => res.status(201).json(product))
      .catch(next))
  .get('/:productId',
    (req, res, next) => {
      if (!req.product) res.sendStatus(404) // in .param -- KHLM
      res.json(req.product)
    })
  .put('/:productId', assertAdmin,
    (req, res, next) => {
      if (!req.product) res.sendStatus(404) // in .param -- KHLM
      // req.product.update() -- KHLM
      Product.update(
        req.body,
        { where: { id: req.product.id }, returning: true })
      .spread((_, updatedProducts) => {
        res.json(updatedProducts[0])
      })
      .catch(next)
    })
