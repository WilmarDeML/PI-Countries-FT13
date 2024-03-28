import { Router } from 'express';
import { obtenerPorPagina, obtenerTodos, obtenerPorIdPais } from '../controllers/countries.js';
const router = Router()

router.get('/', obtenerPorPagina)

router.get('/todo', obtenerTodos)

router.get('/:idPais', obtenerPorIdPais)

export default router;

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