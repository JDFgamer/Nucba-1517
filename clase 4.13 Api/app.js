const express = require('express');
const morgan = require('morgan');
const router = require('./router/index')
const app = express();

app.set('port', 3001);

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/', router);

module.exports = app