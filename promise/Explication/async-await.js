async function asyncAwaitHandle(req,res){
    try{
        const user = await User.findById(req.id);
        const tareas = await Tareas.findById(req.tareas.Id, user);
        tareas.completed = true
        await tareas.save();
        res.send('tareas completadas');
    }catch(err){
        console.log(err);
    }
}