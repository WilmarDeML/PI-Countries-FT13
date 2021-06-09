const { Router } = require('express');
const axios = require('axios').default;
const { Country, Activity } = require('../db');
const { Op } = require("sequelize");
const router = Router();

router.get('/', async (req, res) => {
    const {name, page} = req.query;
    let paises = undefined;
    console.log(name)
    console.log(page)
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
        res.json(paises)
    :
        res.json([{mensaje: 'Sin coincidencias!'}])
    
})

router.get('/:idPais', async (req, res) => {
    const { idPais } = req.params;
    const pais = await Country.findByPk(idPais, { include: Activity });
    res.json( pais );
})

module.exports = router;

// GET /countries?name="...":
// Obtener los países que coincidan con el nombre pasado como query parameter (No necesariamente tiene que ser una matcheo exacto)
// Si no existe ningún país mostrar un mensaje adecuado