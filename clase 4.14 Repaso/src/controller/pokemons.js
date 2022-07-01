const axios = require('axios');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const getAllPokemon = async (req, res) => {
    let { name } = req.query;
    console.log(req.query)
    let pokedexArray = fs.readFileSync('pokedex.json', 'utf-8');
    const pokedexJSON = JSON.parse(pokedexArray);
    try {
        if (!name) {
            if (pokedexJSON.length === 0) {
                for (i = 1; i <= 151; i++) {
                    const api = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}/`)
                    const pokemon = {
                        id: api.data.id,
                        name: api.data.name,
                        typo: api.data.types.map((e) => { return { type: e.type.name } })
                    }
                    pokedexJSON.push(pokemon)
                }
                pokedexArray = JSON.stringify(pokedexJSON);
                fs.writeFileSync('pokedex.json', pokedexArray, 'utf-8');
                return res.status(200).json({
                    pokedexJSON
                })
            } else {
                return res.status(200).json({
                    pokedexJSON
                })
            }
        } else {
            const pokeValidator = pokedexJSON.filter((e) => { return e.name == name });
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
        const type = typo.map((e) => { return { type: e.name } })
        let pokedexArray = fs.readFileSync('pokedex.json', 'utf-8');
        let pokedexJSON = JSON.parse(pokedexArray);
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