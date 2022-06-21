const axios = require('axios');
const {apiFilms} = require('../utils/api');

const callFilms = async(req, res)=>{
    try{
        const data = await axios.get(apiFilms)
        const dataFilter = data.data.results.map((e)=>{
            return{
                id: e.id,
                title: e.title,
                adult: e.adult
            }
        })
        res.json({
            data:dataFilter
        })
    }catch(err){
        console.log(err);
    }
}


module.exports = {
    callFilms,
}