'use strict'
const Sequelize = require('sequelize')

module.exports = db => db.define('cartItems', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

// user assocations will be on the user model as User.hasmany cartiterms // spelling -- KHLM
module.exports.associations = (CartItem, {Product}) => {
  CartItem.belongsTo(Product)
}
