const {Sequelize} = require('sequelize');
require('dotenv').config();

const DB = new Sequelize(process.env.DB);


module.exports = {DB}