const { Router } = require('express');
const axios = require('axios').default;
const { Country, Activity } = require('../db');
const { Op } = require("sequelize");
const router = Router();

router.get('/', async (req, res) => {
    const {name, page} = req.query;
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
    
    !name && !page ? 
        paises = await Country.findAll({ order: ['nombre'], limit: 10 })
    :
    name ?
        paises = await Country.findAll({ 
            where: { 
                nombre: {
                    [Op.substring]: name
                }
                
            },
            order: ['nombre'],
            limit: 10
        })
    :
    paises = page && await Country.findAll({ offset: (parseInt(page)*10 - 10), limit: 10, order: ['id'] })

    return paises.length ?
        res.status(200).json(paises)
    :
        res.status(200).json([{mensaje: 'Sin coincidencias!'}])
    
})

router.get('/:idPais', async (req, res) => {
    const  { idPais } = req.params
    
    const pais = await Country.findByPk(idPais.toUpperCase(), { include: Activity })

    return pais ? res.status(200).json( pais ) : res.status(200).json({mensaje: `No existe el código ${idPais}`})
})

module.exports = router;