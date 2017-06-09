'use strict'

const db = require('APP/db')
const User = db.model('users')
const CartItem = db.model('cartItems')

// const {mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router()
  .get('/', (req, res, next) => {
    CartItem.findAll()
      .then((products) => res.status(201).json(products))
      .catch(next)
  })
  .get('/:id',
    // The forbidden middleware will fail *all* requests to list users.
    // Remove it if you want to allow anyone to list all users on the site.
    //
    // If you want to only let admins list all the users, then you'll
    // have to add a role column to the users table to support
    // the concept of admin users.
    // forbidden('listing users is not allowed'),
    (req, res, next) =>
    User.findOne({
      where: {
        id: req.user.id
      }
    })
    .then((user) => {
      CartItem.findAll({
        where: {
          userId: user.id
        }
      })
    })
    .then(products => res.status(201).json(products))
    .catch(next))
  .post('/',
    // TODO: req.body is empty
    (req, res, next) =>
    User.create(req.body)
    .then(user => {
      res.status(201).send(user)
    })
    .catch(next))
