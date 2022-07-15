const routes = require('express').Router();
const {getUser, postUser, deteleUser, updateUser, createTwitts, getTwitts} = require('../controller');

//Rutas User
routes.get('/user', getUser)
routes.post('/user', postUser)
routes.delete('/user/delete/:id', deteleUser)
routes.put('/user/update/:id', updateUser)
//Rutas Twitts
routes.post('/twitt/:id', createTwitts);
routes.get('/twitt', getTwitts)

module.exports = routes;