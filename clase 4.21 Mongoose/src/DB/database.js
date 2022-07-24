const mongoose = require('mongoose');

const URI = 'mongodb+srv://pablo160896:1234@nucba-lucho.3z6ym0l.mongodb.net/test'

mongoose.connect(URI)
    .then(()=> console.log('DB connect'))
    .catch(err=> console.error(err));

module.exports = mongoose;