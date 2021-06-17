const { Router } = require('express');
const { Activity, Country, actividad_pais } = require('../db');
const router = Router();

router.post('/', async (req, res) => {
  if(await Country.count() === 0) {
    return res.json({mensaje: 'No hay paises para asignarle la actividad!'})
  } else {
    const { nombre, dificultad, duracion, temporada, paisesId } = req.body
    try {
      const [actividad, creada] = await Activity.findOrCreate({

        where: {nombre, dificultad, duracion, temporada}
    
      })
      if(creada) {
        await actividad.addCountries(paisesId)
        return res.json({mensaje: `La actividad se asignó a ${paisesId}`})
      }else{
        paisesId.map(async id => !await actividad.hasCountry(id) && await actividad.addCountry(id))
        res.json({mensaje: `La actividad con id ${actividad.id} ha sido asignada al país que no la tenía`})
      }
    } catch (error) {
      return res.status(404).json(error)
    }
  }  
});

module.exports = router;

// POST /activity:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
// Crea una actividad turística en la base de datos