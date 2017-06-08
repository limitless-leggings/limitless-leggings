'use strict'
const Sequelize = require('sequelize')

module.exports = db => db.define('orders', {}) // status -- KHLM

// user assocations will be on the user model as User.hasmany cartiterms
module.exports.associations = (Order, {Product, OrderItem}) => {
  Order.belongsTo(Product) // belongsToMany(products, {through: OrderItem}) -- KHLM
  Order.hasMany(OrderItem) // this can be deleted -- KHLM
  // order --> include products. Order.addProducts([cart]) -- KHLM
}
