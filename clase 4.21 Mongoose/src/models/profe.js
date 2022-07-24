const mongoose = require('mongoose');
const {Schema} = mongoose;

const Profe = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    camada: {type: Number, required: true},
    img: {type: String, required: false}
})

module.exports = mongoose.model('Profes', Profe);