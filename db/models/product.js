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
        type: Sequelize.INTEGER,
        allowNull: false
    },
    photoUrl: {
        type: Sequelize.STRING,
        validate: {
            isUrl: true
        }
    }   
});

module.exports.associations = (Product, {Category}) => {
  Product.belongsTo(Category)
}

