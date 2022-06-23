const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const router = require('./router/index');

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());


app.set('port', 3001);

app.use('/api', router)

module.exports = app;