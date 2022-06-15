const {tarea1, tarea2} = require('./tareas')


async function main (){
    try{
        console.time('tareas terminadas')
        const data = await Promise.all([tarea1(),tarea2()])
        console.log('tarea 1', data[0])
        console.log('tarea 2', data[1])
        console.timeEnd('tareas terminadas')

    }catch(err){}
}


main()