const express = require('express');
const morgan = require('morgan');
const router = require('./router/index');
var cors = require('cors')

const app = express();

//configuracion
app.set('port', 3001);

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());

//rutas

app.use(router);

async function main() {
    await app.listen(app.get('port'));
    console.log('servidor levantado en puerto', app.get('port'))
}

main()