const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const getUsers = (req, res) => {
    const dbArray = fs.readFileSync('db.json', 'utf-8');
    const dbJson = JSON.parse(dbArray);
    res.status(200).json({
        dbJson
    })
}

const createUser = (req, res) => {
    let { name, password, email } = req.body;

    if (!name || !password || !email) {
        res.status(400).send('faltan datos');
    }
    let dbArray = fs.readFileSync('db.json', 'utf-8');
    let dbJson = JSON.parse(dbArray);

    const filterUser = dbJson.filter((e) => { return e.email === email });
    if (filterUser.length !== 0) {
        return res.send('el usuario con ese mail ya existe');
    }
    const newUser = {
        id: uuidv4(),
        name,
        password,
        email
    }
    dbJson.push(newUser);
    dbArray = JSON.stringify(dbJson);
    fs.writeFileSync('db.json', dbArray, 'utf-8');
    res.json({
        msg: "usuario creado"
    })
}

const updateUser = (req, res) => {
    let { id } = req.params;
    let { name, password, email } = req.body;
    let dbArray = fs.readFileSync('db.json', 'utf-8');
    let dbJson = JSON.parse(dbArray);

    let filterUser = dbJson.filter((e) => { return e.id === id });
    if (filterUser.length !== 0) {
        filterUser[0].name = name
        filterUser[0].password = password
        filterUser[0].email = email
    }
    const newListUser = dbJson.filter((e) => { return e.id !== id });
    newListUser.push(filterUser);
    dbArray = JSON.stringify(newListUser.flat());
    fs.writeFileSync('db.json', dbArray, 'utf-8');
    return res.send('user modificado');

}


const deleteUser = (req, res)=>{
    let {id} = req.params;
    let dbArray = fs.readFileSync('db.json', 'utf-8');
    let dbJson = JSON.parse(dbArray);

    const validateUser = dbJson.filter((e)=>{return e.id === id})

    if(validateUser.length === 0){
        return res.send('usuario ya borrado');
    }

    let filterUser = dbJson.filter((e) => { return e.id !== id });
    dbArray = JSON.stringify(filterUser);
    fs.writeFileSync('db.json', dbArray, 'utf-8');
    res.send('user borrado');
}


module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}