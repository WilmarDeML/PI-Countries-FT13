import { Router } from 'express';

// Importar todos los routers;
import countries from './countries.js'
import activities from './activities.js'

const router = Router()

// Configurar los routers
router.use('/countries', countries)
router.use('/activities', activities)

export default router;