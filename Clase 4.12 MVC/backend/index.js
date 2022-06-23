const app = require('./src/app');

async function main (){
    await app.listen(app.get('port'));
    console.log('listen server port', app.get('port'));
};

main();