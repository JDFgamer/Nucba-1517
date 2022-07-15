const app = require('./src/app');
const { DB } = require('./src/DB/database')

const main = async () => {
  /*   await DB.sync({ force: false });
    console.log('Connection has been established successfully.'); */
    await app.listen(app.get('port'));
    console.log('server listen port', app.get('port'));
}

main();