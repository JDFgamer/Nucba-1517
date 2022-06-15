const util = require('util');
const sleep = util.promisify(setTimeout);

async function tarea1 (){
    try{
    await sleep(4000);
    return 'tarea 1 completada'}
    catch(err){
        console.log(err)
    }
}

async function tarea2 (){
    try{
    await sleep(3000);
    return 'tarea 2 completada'}
    catch(err){
        console.log(err)
    }
}



module.exports = {
    tarea1,
    tarea2
    
}