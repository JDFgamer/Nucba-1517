const Alumno = require('../models/alumnos');


const createAlumno = async (req, res) => {
    let { name, email, camada, img } = req.body;
    if (!name || !email || !camada) {
        return res.status(400).send('faltan datos');
    }
    let newAlumno = new Alumno({
        name,
        email,
        camada,
        img
    })
    newAlumno.save();
    res.json({
        newAlumno
    })
}


const getAllAlumonos = async (req, res) => {
    let { name } = req.query;
    if (!name) {
        const listAlumnos = await Alumno.find();
        res.status(200).json({
            results: listAlumnos.length,
            listAlumnos
        })
    } else {
        const listNameAlumnos = await Alumno.find({ name: `/^${name}/` });
        if (listNameAlumnos.length == 0) {
            return res.send('no se encontraron alumnos con ese nombre');
        }
        return res.status(200).json({
            listNameAlumnos,
        })
    }
}

const deleteAlumno = async (req, res) => {
    let { id } = req.params;
    const alumno = await Alumno.deleteOne({ _id: id })
    if (alumno.deletedCount < 0) return res.json(alumno)
    else return res.send('id no encontrado')
}

const updateAlumno = async (req, res) => {
    let { id } = req.params;
    let { name, email, camada, img } = req.body;
    if (!name || !email || !camada) {
        return res.status(400).send('faltan datos');
    }
    let newDate = { name, email, camada, img }
    let alumno = await Alumno.findByIdAndUpdate( id, newDate);
     alumno = await Alumno.findById(id);
    return res.json({alumno})
}


module.exports = {
    createAlumno,
    getAllAlumonos,
    deleteAlumno,
    updateAlumno
}