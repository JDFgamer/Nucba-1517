const app = require('./app');

const main = async () => {
    await app.listen(app.get('port'));
    console.log('listen server port', app.get('port'));
}

main()