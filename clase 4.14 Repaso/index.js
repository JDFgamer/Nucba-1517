const app = require('./src/app');

const main = async ()=>{
    await app.listen(app.get('port'));
    console.log('server listen port', app.get('port'));
}

main();