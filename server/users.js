'use strict'

const db = require('APP/db')
const User = db.model('users')

const {mustBeLoggedIn, forbidden, assertAdmin} = require('./auth.filters')

module.exports = require('express').Router()
  .param('userId',
    (req, res, next, userId) => {
      if (!Number(userId)) {
        res.sendStatus(500) // user error handling middleware -- KHLM
      } else {
        User.findById(userId)
        .then(user => {
          // what if no user, send 404 with error handling middleware -- kHLM
          req.user = user // attach user to req
          // use req.requestedUser; req.user is already taken for authenticated users -- KHLM
          next()
        })
        .catch(next)
      }
    })
  .get('/', assertAdmin,
    // The forbidden middleware will fail *all* requests to list users.
    // Remove it if you want to allow anyone to list all users on the site.
    //
    // If you want to only let admins list all the users, then you'll
    // have to add a role column to the users table to support
    // the concept of admin users.
    // forbidden('listing users is not allowed'),
    (req, res, next) =>
      User.findAll()
        .then(users => res.json(users))
        .catch(next))
  .post('/', // only admin. If used for signup consider who can set admin privileges, consider when to log someone in -- KHLM
    // TODO: req.body is empty
    (req, res, next) =>
      User.create(req.body)
      .then(user => {
        res.status(201).send(user)
      })
      .catch(next))
  .get('/:userId', // selfOrAdmin -- KHLM
    // mustBeLoggedIn,
    (req, res, next) => {
      if (!req.user) res.sendStatus(404) // do in .param -- KHLM
      res.json(req.user)
    })
  .put('/:userId', //selfOrAdmin
    // mustBeLoggedIn,
    (req, res, next) => {
      if (!req.user) res.sendStatus(404)
      console.log(req.user)
      // req.requestedUser.update() -- KHLM
      User.update(
        req.body, // only admin should be able to set admin privileges -- KHLM
        { where: { id: req.user.id }, returning: true })
      .spread((_, updatedUsers) => {
        res.json(updatedUsers[0])
      })
      .catch(next)
    })
