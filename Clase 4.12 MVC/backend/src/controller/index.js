const fs = require('fs');

const createUser = (req, res)=>{
    let json_DB = fs.readFileSync("db.json","utf-8");
    const DB = JSON.parse(json_DB)

    const {name, username, password, email} = req.body;
    if(!name || !username || !password || !email){
        res.status(400).send('faltan datos');
    }
    const newUser = {
        name,
        username,
        password,
        email
    };

    DB.push(newUser);
    const string_DB = JSON.stringify(DB);
    fs.writeFileSync("db.json", string_DB, "utf-8");
    res.status(200).json({
        title: "Usuario creado con exito",
        header:{
            img:"https://indiehoy.com/wp-content/uploads/2021/08/dragon-ball-super-1200x900.jpg",
            nav: "soy una nav"
        },
        footer:{
            link: "https://www.loginuser.com/home"
        }
    })
}

const renderUser = (req, res)=>{
    let json_DB = fs.readFileSync("db.json","utf-8");
    const DB = JSON.parse(json_DB)
    res.status(200).json({
        header:{
            title: "estos son los logins de hace 10 mins"
        },
        body:{
            user:DB
        },
        footer:{
         button: "Salir",
         link: "https://login.com/home"   
        }
    })
}


module.exports = {
    createUser,
    renderUser
}