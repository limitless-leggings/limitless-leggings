'use strict'
const Sequelize = require('sequelize')

module.exports = db => db.define('cartItems', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  priceAtOrder: {
    type: Sequelize.DECIMAL
    // add a GETTER METHOD FOR THE PRICE
  }
})

// order assocations will be on the order model as order.hasmany orderiterms
module.exports.associations = (OrderItem, {Product}) => {
  OrderItem.belongsTo(Product)
}
