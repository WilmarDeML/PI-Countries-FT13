import { Router } from 'express';

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
import countries from './countries.js'
import activities from './activities.js'

const router = Router()

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/countries', countries)
router.use('/activities', activities)

export default router;