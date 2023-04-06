const router = require('express').Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokeRoutes = require('./PokeRoutes');
const typeRoutes  = require('./TypesRoutes.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/pokemons', pokeRoutes);
router.use('/types', typeRoutes);


module.exports = router;
