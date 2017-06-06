'use strict'
const Sequelize = require('sequelize')

module.exports = db => db.define('categories', { 
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }  
});

