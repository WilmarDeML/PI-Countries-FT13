const { Router } = require('express');
const axios = require('axios').default;
const { Country, Activity } = require('../db');
const { Op } = require("sequelize");
const router = Router();

router.get('/', async (req, res) => {
    const {name, page = 1, cont, orden = 'ASC', cod, filtro = 'nombre'} = req.query;
    let paises = undefined;

    if(await Country.count() === 0 ) {        
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
    }    
    const total = await Country.count()
    !name && !cont && !cod ?        
        //llega orden: asce o desc y filtro: población o alfab
        paises = await Country.findAll({ 
            offset: (parseInt(page)*10 - 10), 
            order:[[ filtro, orden ]],
            limit: 10
        })        
    :
    !cod ?  
        !name && cont ?   
            paises = await Country.findAll({ 
                where:{continente: cont},
                offset: (parseInt(page)*10 - 10), 
                order: [[ filtro, orden ]],
                limit: 10
            })
        :
        !cont && name ?
            paises = await Country.findAll({ 
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
        paises = await Country.findAll({ 
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
    paises = await Country.findAll({ offset: (parseInt(page)*10 - 10), limit: 10, order: [[filtro, orden]], include: Activity })

    return paises.length ?
        res.json(paises /*{pagina: page, total: Math.ceil(total/10)}]*/)
    :
    res.json([{mensaje: 'Sin coincidencias!'}])
    
})

router.get('/:idPais', async (req, res) => {
    const  { idPais } = req.params
    
    const pais = await Country.findByPk(idPais.toUpperCase(), { include: Activity })
    console.log(pais)
    return pais ? 
        res.json( pais ) 
    : 
    res.json({mensaje: `No existe el código ${idPais}`})
})

module.exports = router;