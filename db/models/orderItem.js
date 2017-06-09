'use strict'
const Sequelize = require('sequelize')

module.exports = db => db.define('orderItems', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  priceAtOrder: {
    type: Sequelize.DECIMAL(10, 2),
    validate: {
      min: 0
    }
  }
})

// Order assocations will be on the Order model as Order has many orderIterms
module.exports.associations = (OrderItem, {Product}) => {
  OrderItem.belongsTo(Product)
}
