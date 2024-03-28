import { Router } from 'express';
import { crearActividad } from '../controllers/activities.js'
const router = Router();

router.post('/', crearActividad);

export default router;

// POST /activity:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
// Crea una actividad turística en la base de datos