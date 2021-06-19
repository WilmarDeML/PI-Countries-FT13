const { Router } = require('express');
const { Activity, Country, actividad_pais } = require('../db');
const router = Router();
const axios = require('axios').default

router.post('/', async (req, res) => {

  if(await Country.count() === 0) {

    const respuesta = await axios.get('https://restcountries.eu/rest/v2/all')       
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

    if(nombre && paisesId?.length){

      const paisesIdUnicos = [... new Set(paisesId)]

      try {
        const [actividad, creada] = await Activity.findOrCreate({

          where: {nombre, dificultad, duracion, temporada}
      
        })
        if(creada) {
          await actividad.addCountries(paisesIdUnicos)

          return res.json({mensaje: `La actividad "${actividad.nombre}" se asignó a ${paisesIdUnicos.toString()}`})

        }else{
          paisesIdUnicos.map(async id => !await actividad.hasCountry(id) && await actividad.addCountry(id))

          return res.json({mensaje: `Si algún pais de la lista no contaba con la actividad  ${actividad.id} ha sido asignada correctamente`}) 
          
        }
      } catch (error) {
        return res.json({mensaje: error})
      }
    }else{
      return !nombre && paisesId.length ? res.json({mensaje: 'El nombre es requerido'}) 
      :
      nombre && !paisesId?.length ? res.json({mensaje: 'Se requieren paises para asignar la actividad'}) 
      :
      res.json({mensaje: 'Es necesario el nombre de la actividad y los paises a asignar dicha actividad'})
    }
  }  
});

module.exports = router;

// POST /activity:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
// Crea una actividad turística en la base de datos