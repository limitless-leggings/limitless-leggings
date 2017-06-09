'use strict'

const db = require('APP/db')
const User = db.model('users')

const {mustBeLoggedIn, forbidden, assertAdmin, selfOrAdmin} = require('./auth.filters')

module.exports = require('express').Router()
  .param('userId',
    (req, res, next, userId) => {
      if (!Number(userId)) {
        const err = new Error('You tried accessing a user with an ID that is not a number. User Id must be a number.')
        err.status = 404
        return next(err)
      } else {
        User.findById(userId)
        .then(user => {
          if (!user) {
            res.sendStatus(404)
          }
          req.requestedUser = user
          next()
        })
        .catch(next)
      }
    })
  .get('/', assertAdmin,
    (req, res, next) =>
      User.findAll()
        .then(users => res.json(users))
        .catch(next))
  .post('/', assertAdmin,
    (req, res, next) =>
      User.create(req.body)
      .then(user => {
        res.status(201).send(user)
      })
      .catch(next))
  .get('/:userId', selfOrAdmin,
    (req, res, next) => {
      res.json(req.user)
    })
  .put('/:userId', selfOrAdmin,
    (req, res, next) => {
      if (!req.requestedUser) res.sendStatus(404)
      req.requestedUser.update(req.body) // only admin should be able to set admin privileges -- KHLM
      .then(updatedUser => {
        res.json(updatedUser)
      })
      .catch(next)
    })
