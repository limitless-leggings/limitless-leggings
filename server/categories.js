'use strict'

const db = require('APP/db')
const Category = db.model('categories')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router()
  .param('categoryId',
    (req, res, next, categoryId) => {
      if (!Number(categoryId)) {
        res.sendStatus(500)
      } else {
        Category.findById(categoryId)
        .then(category => {
          req.category = category
          next()
        })
        .catch(next)
      }
    })
  .get('/',
    (req, res, next) =>
      Category.findAll()
        .then(categories => res.json(categories))
        .catch(next))
  .post('/',
    (req, res, next) =>
      Category.create(req.body)
      .then(category => res.status(201).json(category))
      .catch(next))
  .get('/:categoryId',
    // mustBeLoggedIn,
    (req, res, next) => {
      if (!req.category) res.sendStatus(404)
      res.json(req.category)
    })
  .put('/:categoryId',
    // mustBeLoggedIn,
    (req, res, next) => {
      if (!req.category) res.sendStatus(404)
      Category.update(
        req.body,
        { where: { id: req.category.id }, returning: true })
      .spread((_, updatedCategories) => {
        res.json(updatedCategories[0])
      })
      .catch(next)
    })
