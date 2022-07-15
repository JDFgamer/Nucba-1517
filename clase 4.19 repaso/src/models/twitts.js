const {DataTypes} = require('sequelize');
const {DB} = require('../DB/database');

const Twitts = DB.define("Twitts",{
    id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        autoIncrement: true,
        primaryKey: true
    },
    description:{
        type: DataTypes.STRING,
        allowNull:false
    },
    img:{
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = Twitts