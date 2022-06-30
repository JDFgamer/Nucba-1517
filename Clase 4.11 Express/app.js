const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

//inicio mi servidor
const app = express();

//router
const routes = require('./router/index');
app.use('/api',routes)

//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());
app.set('port', 3001);

module.exports = app;