'use strict'

const db = require('APP/db')
const User = db.model('users')
const CartItem = db.model('cartItems')
const Product = db.model('products')

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
        model: Product
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
    CartItem.create(req.body)
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
    .then(item => {
      return item.update(req.body)
    })
      // .then(item => item.update(req.body))
    .then(item => {
      console.log('itemmmmm', item.dataValues)
      res.status(201).send(item.dataValues)
    })
    .catch(next)
  })
