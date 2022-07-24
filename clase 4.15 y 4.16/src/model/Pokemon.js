const Sequelize = require('sequelize');
const sequelize = require('../DB/database');

const Pokemon = sequelize.define('Pokemon',{
    id:{
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    types:{
        type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING),
        allowNull: false
    },
    img:{
        type: Sequelize.DataTypes.STRING,
        allowNull:true,
    }
})

module.exports = Pokemon;