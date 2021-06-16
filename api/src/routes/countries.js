const { Router } = require('express');
const axios = require('axios').default;
const { Country, Activity } = require('../db');
const { Op } = require("sequelize");
const router = Router();

router.get('/', async (req, res) => {
    const {name, page, cont, orden, cod, filtro} = req.query;
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
    
    !name && !page && !cont && !orden && !cod && !filtro? 
        paises = await Country.findAll({ order: ['nombre'], limit: 10 })
    :
    !name && !cont && !page && !cod ?        
        //llega orden: asce o desc y filtro: población o alfab
        orden === 'descendente' && filtro === 'poblacion' ?
            paises = await Country.findAll({ order: [['poblacion', 'DESC']], limit: 10 })
        :
        orden === 'descendente' && filtro === 'alfabeto' ?
            paises = await Country.findAll({ order: [['nombre', 'DESC']], limit: 10})
        :
        orden === 'ascendente' && filtro === 'poblacion' ?
            paises = await Country.findAll({ order: ['poblacion'], limit: 10 })
        :
            paises = await Country.findAll({ order: ['nombre'], limit: 10 })        
    :

    !name && !page && !cod ?     
        orden === 'descendente' && filtro === 'poblacion' ?
            paises = await Country.findAll({ where: {continente: cont}, order: [['poblacion', 'DESC']], limit: 10 })
        :
        orden === 'descendente' && filtro === 'alfabeto' ?
            paises = await Country.findAll({ where: {continente: cont}, order: [['nombre', 'DESC']], limit: 10})
        :
        orden === 'ascendente' && filtro === 'poblacion' ?
            paises = await Country.findAll({ where: {continente: cont}, order: ['poblacion'], limit: 10 })
        :
            paises = await Country.findAll({ where: {continente: cont}, order: ['nombre'], limit: 10 })
    :
    !page && !cod && !cont ?
        paises = await Country.findAll({ 
            where: { 
                nombre: {
                    [Op.iLike]: `%${name}%`
                }
                
            },
            order: ['nombre'],
            limit: 10
        })
    :
    cont ?
        paises = await Country.findAll({
            where: {
                continente: cont
            },
            order: ['nombre'],
            limit: 10
        })
    :
    orden ?
        orden === 'descendente' ?
            paises = await Country.findAll({ order: [['nombre', 'DESC']], limit: 10 })
        :
        paises = await Country.findAll({ order: ['nombre'], limit: 10 })
    :
    filtro ?
        filtro === 'poblacion' ?
            paises = await Country.findAll({order:['poblacion'], limit: 10})
        :
            paises = await Country.findAll({ order: ['nombre'], limit: 10})
    :
    cod ?
        // paisesId.map(async id => !await actividad.hasCountry(id) && await actividad.addCountry(id))
        paises = await Country.findAll({
            include: Activity,
            limit: 10
        })
    :
    paises = page && await Country.findAll({ offset: (parseInt(page)*10 - 10), limit: 10, order: ['id'], include: Activity })

    return paises.length ?
        res.status(200).json(paises)
    :
    res.status(404).json([{mensaje: 'Sin coincidencias!'}])
    
})

router.get('/:idPais', async (req, res) => {
    const  { idPais } = req.params
    
    const pais = await Country.findByPk(idPais.toUpperCase(), { include: Activity })

    return pais ? res.status(200).json( pais ) : res.status(404).json({mensaje: `No existe el código ${idPais}`})
})

module.exports = router;