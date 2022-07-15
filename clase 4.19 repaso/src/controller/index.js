const User = require('../models/user');
const Twitts = require('../models/twitts');

const getUser = async (req, res) => {
    try {
        const users = await User.findAll({
            include:{
            model: Twitts,
            attributes: ["id","description", "img"]
            ,
            through:{
                attributes:[],
            }
        }
        });
        res.json({ users })
    } catch (err) {
        console.log(err)
    }
}

const postUser = async (req, res) => {
    let { name, password, email } = req.body;
    if (!name || !password || !email) {
        return res.send('faldan datos');
    }
    let newUser = await User.findAll({
        where: {
            email: email
        }
    })
    if (newUser.length != 0) {
        return res.send('email ya existe');
    }
    newUser = {
        name,
        password,
        email
    }
    const user = await User.create(newUser);
    return res.json({ user });
}

const deteleUser = async (req, res) => {
    let { id } = req.params;
    try {
        const user = User.destroy({
            where: {
                id: id
            }
        })
        res.send(user)
    } catch (err) {
        console.log(err)
    }
}

const updateUser = async (req, res) => {
    let { name, password, email } = req.body;
    let { id } = req.params;
    try {
        const user = await User.findByPk(id,{
            include:{
                model: Twitts,
                attributes: ["id","description", "img"]
                ,
                through:{
                    attributes:[],
                }
            }
        });
        if (!user) {
            res.send('usuario no existe')
        } else {
            const data = {
                name,
                password,
                email
            }
            await user.update(data)

            res.json({
                msg: "se actualizo",
                user
            })
        }
    } catch (err) {
        console.log(err);
    }
}

const createTwitts = async (req, res) => {
    const { id } = req.params;
    const { description, img } = req.body;
    if (!description) {
        return res.send('falta la descripcion');
    }
    try {
        const user = await User.findByPk(id);
        if (!user) return res.send('el usuario no existe')
        let twitt = {
            description,
            img
        };
        twitt = await Twitts.create(twitt);
        user.addTwitts(twitt);
        res.json({
            twitt
        })
    } catch (err) {
        console.log(err);
    }
}

const getTwitts = async(req, res)=>{
    try{
        const twitts = await Twitts.findAll();
        res.send(twitts);
    }catch(err){
        console.log(err)
    }
}

module.exports = {
    getUser,
    postUser,
    deteleUser,
    updateUser,
    createTwitts,
    getTwitts
}