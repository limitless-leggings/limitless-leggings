'use strict'
const Sequelize = require('sequelize')

module.exports = db => db.define('productItems', {
  size: {
    type: Sequelize.ENUM('XS', 'S', 'M', 'L', 'XL'),
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports.associations = (ProductItem, {Product}) => {
  ProductItem.belongsTo(Product)
}

// module.exports.associations = (Thing, {User, Favorite}) => {
// Thing.belongsToMany(User, {as: 'lovers', through: Favorite}) }
