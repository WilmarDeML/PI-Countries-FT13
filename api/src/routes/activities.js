const { Router } = require('express');
const { Activity, Country, actividad_pais } = require('../db');
const router = Router();
const axios = require('axios').default

router.post('/', async (req, res) => {
  if(await Country.count() === 0) {
    const respuesta = await axios.get('https://restcountries.eu/rest/v2/all');        
        await respuesta.data.map(async pais => {
            await Country.findOrCreate({
                where: {
                    id: pais.alpha3Code,
                    nombre: pais.name,
                    bandera: pais.flag,
                    continente: pais.region,
                    capital: pais.capital,
                    subregion: pais.subregion,
                    area: pais.area,
                    poblacion: pais.population
                }            
            });
        });
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
      return res.json({mensaje: error})
    }
  }  
});

module.exports = router;

// POST /activity:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
// Crea una actividad turística en la base de datos