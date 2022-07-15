const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./router/index');
require('dotenv').config();

const app = express();

app.set('port', process.env.PORT)

app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', routes);


module.exports = app