const { Router } = require('express');
const { Activity } = require('../db');
const router = Router();

router.post('/', async (req, res) => {
    
    const { nombre, dificultad, duracion, temporada, paisesId } = req.body
  
    const actividad = await Activity.create({
      
        nombre, dificultad, duracion, temporada
      
    })
    await actividad.setCountries(paisesId)

    return actividad ? res.json({mensaje: 'La actividad fue creada'}) : res.json({mensaje: 'No se creó la actividad'})
  });

module.exports = router;