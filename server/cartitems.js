'use strict'

const db = require('APP/db')
const User = db.model('users')
const CartItem = db.model('cartItems')
const Product = db.model('products')
const ProductItem = db.model('productItems')
const Order = db.model('orders')
const OrderItem = db.model('orderItems')

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
        include: [{
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
    CartItem.create({
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
      console.log('itemmmmm', item.dataValues)
      res.status(201).send(item.dataValues)
    })
    .catch(next)
  })

  //route for checkout -- posting new Order object with current order items, and then clearing cart
  .post('/order', (req, res, next) => {
    let createdOrder, foundCartItems;
    Order.create({ //first, create the Order object
      user_id: req.user.id
    })
      .then(_createdOrder => { //then, find the cart items belonging to the user
        createdOrder = _createdOrder;
        return CartItem.findAll({
          where: {
            user_id: req.user.id
          },
          include: [{
            model: ProductItem //import this above instead of Product
          }]
        })
      })
      .then(_foundCartItems => { //then, turn those found cart items into order items
        foundCartItems = _foundCartItems;
        let arrOfCreatingItems = foundCartItems.map(cartItem => { // an array of promises
          return OrderItem.create({
            order_id: createdOrder.id,
            quantity: cartItem.quantity,
            // priceAtOrder:
          })
        });
        return Promise.all(arrOfCreatingItems);
      })
      .then(createdOrderItems => { //now, delete the cart items (NEED TO TEST THIS)
        let arrOfDestroyingItems = foundCartItems.map(cartItem => {
          cartItem.destroy();
        })
        return Promise.all(arrOfDestroyingItems);
      })
      .then(createdOrderItems => {
        res.sendStatus(201);
      })
  .catch(next)
})
