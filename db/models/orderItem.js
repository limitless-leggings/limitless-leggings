'use strict'
const Sequelize = require('sequelize')

module.exports = db => db.define('orderItems', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  priceAtOrder: {
    type: Sequelize.DECIMAL // consider (10,2), validation for positive -- KHLM
    // add a GETTER METHOD FOR THE PRICE
  }
})

// order assocations will be on the order model as order.hasmany orderiterms
module.exports.associations = (OrderItem, {Product}) => {
  OrderItem.belongsTo(Product)
}
