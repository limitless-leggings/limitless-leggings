'use strict'

const db = require('APP/db')
const Category = db.model('categories')

const {mustBeLoggedIn, forbidden, assertAdmin} = require('./auth.filters')

module.exports = require('express').Router()
  .param('categoryId',
    (req, res, next, categoryId) => {
      if (!Number(categoryId)) {
        return next(err)
      } else {
        Category.findById(categoryId)
        .then(category => {
          if (category) {
            res.sendStatus(404)
          }
          req.category = category
          next()
        })
        .catch(next)
      }
    })
  .get('/',
    (req, res, next) => {
      Category.findAll()
        .then(categories => res.json(categories))
        .catch(next)})
  .post('/', assertAdmin,
    (req, res, next) =>
      Category.create(req.body)
      .then(category => res.status(201).json(category))
      .catch(next))
  .get('/:categoryId',
    (req, res, next) => {
      console.log("IN THE ROUTE! req.category: ", req.category)
      res.json(req.category)
    })
  .put('/:categoryId', assertAdmin,
    (req, res, next) => {
      // req.category.update -- KHLM
      Category.update(
        req.body,
        { where: { id: req.category.id }, returning: true })
      .spread((_, updatedCategories) => {
        res.json(updatedCategories[0])
      })
      .catch(next)
    })
