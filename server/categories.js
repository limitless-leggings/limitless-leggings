'use strict'

const db = require('APP/db')
const Category = db.model('categories')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router()
  .param('categoryId',
    (req, res, next, categoryId) => {
      if (!Number(categoryId)) {
        res.sendStatus(500) // error hanlding middleware -- KHLM
      } else {
        Category.findById(categoryId)
        .then(category => {
          // what if no category -- KHLM
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
  .post('/', // who can create? -- KHLM
    (req, res, next) =>
      Category.create(req.body)
      .then(category => res.status(201).json(category))
      .catch(next))
  .get('/:categoryId',
    // mustBeLoggedIn, // delete me -- KHLM
    (req, res, next) => {
      if (!req.category) res.sendStatus(404) // do in .param -- KHLM
      res.json(req.category)
    })
  .put('/:categoryId',
    // mustBeLoggedIn, // admin -- KHLM
    (req, res, next) => {
      if (!req.category) res.sendStatus(404)
      // req.category.update -- KHLM
      Category.update(
        req.body,
        { where: { id: req.category.id }, returning: true })
      .spread((_, updatedCategories) => {
        res.json(updatedCategories[0])
      })
      .catch(next)
    })
