const router = require('express').Router();
const fs = require('fs');
const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');


router.get('/inicio', async (req, res) => {
    let json_DB = fs.readFileSync("db.json", "utf-8");
    const DB = await JSON.parse(json_DB);
    if (DB.length === 0) {
        try {
            const apiFetch = await fetch('https://rickandmortyapi.com/api/character');
            const apiJSON = await apiFetch.json();
            const filterApi = apiJSON.results.map((e) => {
                return {
                    id: e.id,
                    name: e.name,
                    status: e.status,
                    image: e.image
                }
            })
            json_DB = JSON.stringify(filterApi)
            fs.writeFileSync("db.json", json_DB, "utf-8");
            res.json({
                data: filterApi,
            })
        }
        catch (err) {
            console.log(err)
        }
    } else if (typeof DB  === "object") {
        res.json({
            data: DB
        })
    }else{
        res.status(400).send('db rota')
    }
})


router.post('/new-character', (req, res)=>{
    let json_DB = fs.readFileSync("db.json", "utf-8");
    const DB = JSON.parse(json_DB);
    const {name, status, image} = req.body;
    console.log( name, status, image)
    if(!name || !status || !image){
        res.status(400).send('faltan datos');
        return
    }

    let newCharacter = {
        id: uuidv4(),
        name,
        status,
        image
    };
    DB.push(newCharacter);
    const array_DB = JSON.stringify(DB)
    fs.writeFileSync("db.json", array_DB, "utf-8");
    res.json({
        msg:"se guardo personaje",
        data: newCharacter
    })
})

router.delete('/delete-character/:id', (req, res)=>{
    let json_DB = fs.readFileSync("db.json", "utf-8");
    const DB = JSON.parse(json_DB);
    const {id} = req.params;
    const newDB = DB.filter((e)=>{
        return e.id != id
    })
    const array_DB = JSON.stringify(newDB);
    fs.writeFileSync("db.json", array_DB, "utf-8");
    res.json({
        msg:"se elimino personaje",
    })
})



module.exports = router