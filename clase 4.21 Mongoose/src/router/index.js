const router = require('express').Router();
const { createAlumno, getAllAlumonos, deleteAlumno, updateAlumno} = require('../controller/alumnos');

router.post('/newalumno', createAlumno);
router.get('/alumno', getAllAlumonos);
router.delete('/deletealumno/:id', deleteAlumno);
router.put('/updatealumno/:id', updateAlumno);

module.exports = router