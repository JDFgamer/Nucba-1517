const axios = require('axios');
const { apiRickAndMorty } = require('../utils/api');

const character = async (req, res) => {
    try {
        let data = await axios.get(apiRickAndMorty);
        const dataFilter = data.data.results.map((e) => {
            return {
                id: e.id,
                name: e.name,
                status: e.status
            }
        })
        res.json({
            data: dataFilter
        })
    } catch (err) {
        console.log(err)
    }
}


module.exports = {
    character,
}