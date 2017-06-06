'use strict'
const Sequelize = require('sequelize')

module.exports = db => db.define('orders', { 
});


//user assocations will be on the user model as User.hasmany cartiterms
module.exports.associations = (Order, {Product,OrderItem}) => {
  Order.belongsTo(Product);
  Order.hasMany(OrderItem)
}

