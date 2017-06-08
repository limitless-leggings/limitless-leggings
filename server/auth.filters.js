const db = require('APP/db')
const User = db.model('users')

const mustBeLoggedIn = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send('You must be logged in.')
  }
  next()
}

const selfOnly = action => (req, res, next) => {
  if (req.params.id !== req.user.id) {
    return res.status(403).send(`You can only ${action} yourself.`)
  }
  next()
}

const assertAdmin = (req, res, next) => {
  User.findById(req.user.id)
    .then((foundUser) => {
      if (!foundUser.isAdmin) {
        return res.status(403).send('You must be an admin to perform this action or view this page.')
      }
      next()
    })
    .catch(next);
}

const forbidden = message => (req, res) => {
  res.status(403).send(message)
}

module.exports = {mustBeLoggedIn, selfOnly, forbidden, assertAdmin}
