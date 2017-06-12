'use strict'
const Sequelize = require('sequelize')

module.exports = db => db.define('cartItems', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports.associations = (CartItem, {User, ProductItem}) => {
  CartItem.belongsTo(ProductItem)
  CartItem.belongsTo(User)
}
