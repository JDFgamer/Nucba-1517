function requestCallBack(req, res) {
  User.findById(req.Id, function (err, user) {
    if (err) {
      console.log(err);
    } else {
      Tarea.findById(req.TareaId, function (err, tarea) {
        if (err) {
          console.log(err);
        } else {
          tarea.completed = true;
          tarea.save(function (err) {
            if (err) {
              console.log(err);
            } else res.send("tarea completada");
          });
        }
      });
    }
  });
}
