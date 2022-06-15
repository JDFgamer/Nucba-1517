function requestPromis(req,res){
    User.findById(req.id)
    .then(function(user){
        return Tareas.findById(user.Tareas);
    })
    .then(function(tarea){
        tarea.completed = true;
        return tarea.save();
    })
    .then(function(){
        res.send('tarea guardada')
    })
    .catch(function(err){
        console.log(err)
    })
}