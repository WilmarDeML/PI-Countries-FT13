import connection from '../db.js'
import { Op } from "sequelize"
import { LIMIT } from '../config.js';

const { country: Country, activity: Activity, actividad_pais: ActivityCountry } = connection.models

export const obtenerPorPagina = async (req, res) => {

    const { name, activityId, continente, filtro = 'nombre', orden = 'ASC', page = 1, limit = LIMIT } = req.query;

    const offset = +page * limit - limit;
    const order = [[ filtro, orden ]]; // orden puede ser ASC o DESC

    const query = { offset, limit, order, where: {}, include: [] };

    if (activityId) query.include.push({ model: Activity, where: { id: activityId }})
    if (name) query.where.nombre = { [Op.iLike]: `%${name}%` }
    if (continente) query.where.continente = continente

    try {
        const countries = await Country.findAndCountAll(query)

        return countries.rows.length
            ? res.json({...countries, totalPages: Math.ceil(countries.count/limit)})
            : res.status(404).json({ message: 'No se encontraron resultados con los parámetros brindados' })
    } catch (error) {
        console.error('Error al obtener paises por página: ', error)
        return res.json({ msg: `Error al obtener paises por página: ${error.message}` });
    }
};

export const obtenerTodos = async (req_, res) => {    
    const paises = await Country.findAll({  
        order:[[ 'nombre' ]]
    }) 
    res.json(paises)
}

export const obtenerPorIdPais = async (req, res) => {
    const  { idPais } = req.params
    
    const pais = await Country.findByPk(idPais.toUpperCase(), { 
        include: Activity,
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })

    return pais 
        ? res.json( pais ) 
        : res.json({mensaje: `No existe el código ${idPais}`})
}