const axios = require('axios');
const Pokemon = require('../model/Pokemon')
const { Op } = require('sequelize')


const getAllPokemon = async (req, res) => {
    let { name } = req.query;
    try {
        if (!name) {
            let pokedexFilter = await Pokemon.findAll();
            if (pokedexFilter.length == 0) {
                for (i = 1; i <= 151; i++) {
                    const pokedex = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}/`)
                    pokedexFilter = {
                        name: pokedex.data.name,
                        types: pokedex.data.types.map((e) => {
                            return {
                                name: e.type.name
                            }
                        }),
                        img: pokedex.data.sprites.other.home.front_default
                    }
                    Pokemon.create(pokedexFilter);
                }
                pokedexFilter = await Pokemon.findAll();
                return res.json({ pokedexFilter })
            } else {
                return res.json({ pokedexFilter })
            }
        } else {
            let pokemons = await Pokemon.findAll({
                where: {
                    name: { [Op.iLike]: `%${name}%` }
                }
            });
            return res.json({ pokemons })
        }
    }
    catch (err) {
        console.log(err);
    }
}

const createPokemon = (req, res) => {
    let { name, typo } = req.body;
    if (!name || !typo) {
        return res.send('faltan datos');
    }
    if (typeof name !== 'string' || typeof typo !== 'object') {
        return res.send('datos no validos')
    } else {
        const newPokemon = {
            id: uuidv4(),
            name,
            type
        }
        pokedexJSON.push(newPokemon)
        pokedexArray = JSON.stringify(pokedexJSON);
        fs.writeFileSync('pokedex.json', pokedexArray, 'utf-8');
        res.status(200).json({
            msg: 'pokemon creado',
            newPokemon
        })
    }

}

const deletePokemon = (req, res) => {
    const { id } = req.params;
    let pokedexArray = fs.readFileSync('pokedex.json', 'utf-8');
    const pokedexJSON = JSON.parse(pokedexArray);

    const delePokemon = pokedexJSON.filter((e) => { return e.id === id });
    if (delePokemon.length !== 0) {
        const newPokedex = pokedexJSON.filter((e) => { return e.id !== id });
        pokedexArray = JSON.stringify(newPokedex);
        fs.writeFileSync('pokedex.json', pokedexArray, 'utf-8');
        return res.send('pokemon borrado con exito');
    } else {
        res.send('id pokemon no valido o ya fue borrado')
    }
}

const searchByName = (req, res) => {
    let { name } = req.query;
    let pokedexArray = fs.readFileSync('pokedex.json', 'utf-8');
    const pokedexJSON = JSON.parse(pokedexArray);
    if (!name) {
        return res.send('falta el nombre')
    }
    const pokeValidator = pokedexJSON.includes((e) => { return e.name == name });
    if (pokeValidator.length !== 0) {
        return res.json({
            msg: "estos son los pokemon con ese nombre",
            pokeValidator
        })
    }
    else {
        res.send('nombre no valido')
    }

}


module.exports = {
    getAllPokemon,
    createPokemon,
    deletePokemon,
    searchByName
};