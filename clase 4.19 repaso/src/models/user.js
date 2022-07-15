const {DataTypes} = require('sequelize');
const {DB} = require('../DB/database')
const Twitts = require('./twitts')

const User = DB.define("User",{
    id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false
    }
})

User.belongsToMany(Twitts,{through:'user_twitt'});
Twitts.hasOne(User,{through:'user_twitt'});


module.exports = User;