'use strict'

const db = require('APP/db')
const User = db.model('users')
const CartItem = db.model('cartItems')
const Product = db.model('products')
const ProductItem = db.model('productItems')

const {
  assertAdmin
} = require('./auth.filters')

module.exports = require('express').Router()
  .get('/', (req, res, next) => {
    CartItem.findAll({
      where: {
        user_id: req.user.id
      },
      include: [{
        model: ProductItem,
        include: [{ //consider default scope on Product Item table --KHLM
          model: Product
        }]
      }]
    })
      .then((products) => res.status(201).json(products))
      .catch(next)
  })
  // .get('/:id',
  //   // assertAdmin,
  //   (req, res, next) => {
  //     console.log('helloooooo')
  //     User.findOne({
  //       where: {
  //         id: req.user.id
  //       }
  //     })
  //     .then((user) => {
  //       CartItem.findAll({
  //         where: {
  //           userId: user.id
  //         }
  //       })
  //     })
  //     .then(products => res.status(201).json(products))
  //     .catch(next)
  //   })

  .post('/',
    // TODO: req.body is empty
    (req, res, next) =>
    CartItem.create({ //consider creating Item before assoc either user or session, based on req.user --KHLM
      quantity: req.body.quantity,
      user_id: req.user.id,
      product_item_id: req.body.product_item_id
    })
    .then(items => {
      res.status(201).send(items)
    })
    .catch(next))

  .put('/:id', (req, res, next) => {
    CartItem.findOne({
      where: {
        id: req.params.id
      }
    })
    // set req.user.id?
    .then(item => {
      return item.update(req.body)
    })
      // .then(item => item.update(req.body))
    .then(item => {
      console.log('itemmmmm', item.dataValues) // remove your logs!
      res.status(201).send(item.dataValues) // maybe just send back 'item'
    })
    .catch(next)
  })
