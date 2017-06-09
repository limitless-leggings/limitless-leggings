const db = require('APP/db')
const User = db.model('users')

const mustBeLoggedIn = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send('You must be logged in to perform this action or view this page.')
  }
  next()
}

const selfOnly = action => (req, res, next) => {
  if (req.params.userId !== req.user.id) {
    return res.status(403).send(`You can only ${action} yourself.`)
  }
  next()
}

const assertAdmin = (req, res, next) => {
  User.findById(req.user.id)
    .then((foundUser) => {
      if (!foundUser.isAdmin) {
        return res.status(403).send('You must be an administrator to perform this action or view this page.')
      }
      next()
    })
    .catch(next);
}

const selfOrAdmin = (req, res, next) => {
  if ((Number(req.params.userId) !== Number(req.user.id)) && (!req.user.isAdmin)) {
    return res.status(403).send('You must be this user or an administrator to perform this action or view this page.')
  }
  next()
}

const forbidden = message => (req, res) => {
  res.status(403).send(message)
}

module.exports = {mustBeLoggedIn, selfOnly, forbidden, assertAdmin, selfOrAdmin}
