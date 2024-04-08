const express = require('express');
const rutas = express.Router();
const TareaModel = require('../models/Tarea');

rutas.get('/', async (req, res) =>{
    try {
        const tareas = await TareaModel.find();
        console.log(tareas);
        res.json(tareas);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});

rutas.get("/estado", async (req, res) => {
    try {
      const tareas = await TareaModel.find({ estado_del_curso: 'habilitado' });
      res.json(tareas);
    } catch (error) {
      res.status(404).json({ mensaje: error.message });
    }
  });

rutas.get('/ordenar', async (req, res) =>{
    try {
        const tareasASC = await TareaModel.find().sort({vistas: 1});
        //console.log(tareasASC);
        res.json(tareasASC);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});

rutas.get('/ultimo-curso', async (req, res) =>{
    try {
        const tareas = await TareaModel.findOne().sort({_id: -1});
        //console.log(tareas);
        res.json(tareas);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});

rutas.get('/seleccionar', async (req, res) =>{
    try {
        const tareas = await TareaModel.find().select('plataforma nombre_del_curso');
        // Puedes especificar los campos que deseas seleccionar separándolos por espacios
        res.json(tareas);
        }
    catch(error){
            res.status(404).json({mensaje: error.message});
        }
    });
    

rutas.post('/agregar', async (req, res) =>{
    // console.log(req.body);
    const nuevaTarea = new TareaModel({
        categoria: req.body.categoria,
        nombre_del_curso: req.body.nombre_del_curso,
        temas: req.body.temas,
        plataforma: req.body.plataforma,
        docente: req.body.docente,
        vistas: req.body.vistas,
        cantidad_de_alumnos: req.body.cantidad_de_alumnos,
        estado_del_curso: req.body.estado_del_curso,
        costo_en_Bs: req.body.costo_en_Bs,
        duracion_Meses: req.body.duracion_Meses, 
    });
    try {
        const guardarTarea = await nuevaTarea.save();
        res.status(201).json(guardarTarea);
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});

rutas.put('/editar/:id', async (req, res) =>{
    try {
        const actualizarTarea = await TareaModel.findByIdAndUpdate(req.params.id, req.body, { new: true});
        res.status(201).json(actualizarTarea);
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});

rutas.delete('/eliminar/:id', async (req, res) =>{
    try {
        const eliminarTarea = await TareaModel.findByIdAndDelete(req.params.id);
        res.json({mensaje: 'Tarea eliminada correctamente'});
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});

module.exports = rutas;
