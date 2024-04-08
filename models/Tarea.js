const mongoose = require('mongoose');

const tareaEsquema = new mongoose.Schema({
    categoria : String,
    nombre_del_curso : String,
    temas : String,
    plataforma : String,
    docente: String,
    vistas : Number,
    cantidad_de_alumnos: Number,
    estado_del_curso: String,
    costo_en_Bs: Number,
    duracion_Meses: Number, 
})

const TareaModel = mongoose.model('Tarea',tareaEsquema,'tarea');
module.exports = TareaModel;