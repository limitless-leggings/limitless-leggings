'use strict'
const Sequelize = require('sequelize')

module.exports = db => db.define('products', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    },
  },
  photoUrl: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  }
})

module.exports.associations = (Product, {ProductItem, Category}) => {
  Product.belongsTo(Category)
  Product.hasMany(ProductItem)
}
