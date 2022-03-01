const { Router } = require('express')
const axios = require('axios').default
const { Country, Activity, actividad_pais } = require('../db')
const { Op } = require("sequelize")
const router = Router()

router.get('/', async (req, res) => {
    const {name, page = 1, cont, orden = 'ASC', cod, filtro = 'nombre', idPais} = req.query;
    let paises = undefined;

    if(await Country.count() === 0 ) {        
        const respuesta = await axios.get('https://restcountries.com/v3.1/all');        
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
    }    
    !name && !cont && !cod ?        
        //llega orden: asce o desc y filtro: población o alfab
        paises = await Country.findAndCountAll({ 
            offset: (parseInt(page)*10 - 10), 
            order:[[ filtro, orden ]],
            limit: 10
        })        
    :
    !cod ?  
        !name && cont ?   
            paises = await Country.findAndCountAll({ 
                where:{continente: cont},
                offset: (parseInt(page)*10 - 10), 
                order: [[ filtro, orden ]],
                limit: 10
            })
        :
        !cont && name ?
            paises = await Country.findAndCountAll({ 
                where: { 
                    nombre: {
                        [Op.iLike]: `%${name}%`
                    }                    
                },
                offset: (parseInt(page)*10 - 10), 
                order: [[ filtro, orden ]],
                limit: 10
            })
        :
        paises = await Country.findAndCountAll({ 
            where: { 
                nombre: {
                    [Op.iLike]: `%${name}%`
                },
                continente: cont                    
            },
            offset: (parseInt(page)*10 - 10), 
            order: [[ filtro, orden ]],
            limit: 10
        })
    :    
    paises = await actividad_pais.findAndCountAll({ where: {activityId: cod}, offset: (parseInt(page)*10 - 10), limit: 10, order: [['countryId', orden]]})

    res.json(paises)
})
router.get('/todo', async (req, res) => {
    let paises = undefined
    if(await Country.count() === 0 ) {        
        // const respuesta = await axios.get('https://restcountries.eu/rest/v2/all');  
        const respuesta = await axios.get('https://restcountries.com/v3.1/all');  
        // console.log(respuesta.data[0])     
        await respuesta.data.map(async pais => {
            await Country.findOrCreate({
                where: {
                    id: pais.cca3,
                    nombre: pais.name.common,
                    bandera: pais.flags.svg,
                    continente: pais.region,
                    capital: pais.capital?.length ? pais.capital[0] : 'Sin capital',
                    subregion: pais.subregion ?? 'Sin subregion',
                    area: pais.area,
                    poblacion: pais.population
                }            
            });
        });
    }    
    paises = await Country.findAll({  
        order:[[ 'nombre', 'ASC' ]]
    }) 
    res.json(paises)
})
router.get('/:idPais', async (req, res) => {
    const  { idPais } = req.params
    
    const pais = await Country.findByPk(idPais.toUpperCase(), { include: Activity })

    return pais ? 
        res.json( pais ) 
    : 
    res.json({mensaje: `No existe el código ${idPais}`})
})

module.exports = router;

// GET /countries:
// En una primera instancia deberán traer todos los países desde restcountries y guardarlos en su propia base de datos y luego ya utilizarlos desde allí (Debe almacenar solo los datos necesarios para la ruta principal)
// Obtener un listado de los primeros 10 países
//  GET /countries/{idPais}:
// Obtener el detalle de un país en particular
// Debe traer solo los datos pedidos en la ruta de detalle de país
// Incluir los datos de las actividades turísticas correspondientes
//  GET /countries?name="...":
// Obtener los países que coincidan con el nombre pasado como query parameter (No necesariamente tiene que ser una matcheo exacto)
// Si no existe ningún país mostrar un mensaje adecuado