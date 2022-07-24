const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:postgrespw@localhost:49154');

module.exports = sequelize;