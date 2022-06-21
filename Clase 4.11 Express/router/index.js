const routes = require('express').Router();
const rickandmorty = require('./rickAndMorty');
const films = require('./films');

routes.use('/rickandmorty', rickandmorty);
routes.use('/films', films)

module.exports = routes