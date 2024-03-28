import connection from '../db.js'
import { Op } from "sequelize"

const { country: Country, activity: Activity, actividad_pais: ActivityCountry } = connection.models

export const obtenerPorPagina = async (req, res) => {

    const { name, cod: activityId, cont: continente, filtro = 'nombre', orden = 'ASC', page = 1 } = req.query;

    const limit = 10;
    const offset = +page * limit - limit;
    const order = activityId ? [['countryId', orden]] : [[filtro, orden]];
    const where = activityId
        ? { activityId }
        : !name && continente
            ? { continente }
            : !continente && name
                ? { nombre: { [Op.iLike]: `%${name}%` } }
                : continente && name
                    ? { nombre: { [Op.iLike]: `%${name}%` }, continente }
                    : {};

    const query = { offset, limit, order, where };
    try {
        let countries
        if (!activityId) {
            countries = await Country.findAndCountAll(query)
        } else {
            const countryActivities = await ActivityCountry.findAndCountAll(query);
            const data = countryActivities.rows.map(async (ca) => await Country.findByPk(ca.countryId.toUpperCase(), { include: Activity }));
            countries = await Promise.all(data);
        }

        return countries.length
            ? res.json(countries)
            : res.status(404).json({ mensaje: 'No se encontraron resultados con los parámetros brindados' })
    } catch (error) {
        return res.json({ msg: error.message });
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