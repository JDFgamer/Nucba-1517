const route = require('express').Router();
const { Router } = require('express');
const {getUsers, createUser, updateUser, deleteUser} = require('../controller/usuario')


route.get('/',getUsers);
route.post('/', createUser);
route.put('/:id', updateUser);
route.delete('/:id', deleteUser);

module.exports = route;