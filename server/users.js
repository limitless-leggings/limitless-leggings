'use strict'

const db = require('APP/db')
const User = db.model('users')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router()
  .param('userId',
    (req, res, next, userId) => {
      if (!Number(userId)) {
        res.sendStatus(500)
      } else {
        User.findById(userId)
        .then(user => {
          req.user = user // attach user to req
          next()
        })
        .catch(next)
      }
    })
  .get('/',
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
  .post('/',
    // TODO: req.body is empty
    (req, res, next) =>
      User.create(req.body)
      .then(user => {
        res.status(201).send(user)
      })
      .catch(next))
  .get('/:userId',
    // mustBeLoggedIn,
    (req, res, next) => {
      if (!req.user) res.sendStatus(404)
      res.json(req.user)
    })
  .put('/:userId',
    // mustBeLoggedIn,
    (req, res, next) => {
      if (!req.user) res.sendStatus(404)
      console.log(req.user)
      User.update(
        req.body,
        { where: { id: req.user.id }, returning: true })
      .spread((_, updatedUsers) => {
        res.json(updatedUsers[0])
      })
      .catch(next)
    })
