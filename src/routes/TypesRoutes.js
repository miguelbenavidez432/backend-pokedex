const typeRoutes = require('express').Router();
const { getType } = require('../controllers/getTypes');

typeRoutes.get('/', async (req, res) => {
   try {
    const type = await getType();
    res.status(200).json(type)
   } catch (error) {
    res.status(500).send({ error: error.message })
   }
})

module.exports = typeRoutes;