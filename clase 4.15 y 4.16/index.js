const app = require('./src/app');
const sequelize = require('./src/DB/database')

const main = async () => {
    /* await sequelize.sync({ force: true }); */
    await app.listen(app.get('port'));
    console.log("All models were synchronized successfully.");
    console.log('server listen port', app.get('port'));
}

main();