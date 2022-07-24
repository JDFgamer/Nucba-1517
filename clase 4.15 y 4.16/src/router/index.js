const routes = require('express').Router();
const {getAllPokemon, createPokemon, deletePokemon, searchByName} = require('../controller/pokemons');

routes.get('/', getAllPokemon);
routes.post('/', createPokemon);
routes.delete('/:id', deletePokemon);
routes.get('/pokemon', searchByName);

module.exports = routes;