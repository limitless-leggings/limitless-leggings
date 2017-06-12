'use strict'
const Sequelize = require('sequelize')

module.exports = db => db.define('cartItems', { //consider adding column for session --KHLM
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports.associations = (CartItem, {User, ProductItem}) => {
  CartItem.belongsTo(ProductItem)
  CartItem.belongsTo(User)
}
