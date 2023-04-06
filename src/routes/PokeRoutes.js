const pokeRoutes = require('express').Router();
const { 
    getAllPokemons, 
    getPokemonById, 
    getPokemonByName, 
    createPokemon 
} = require('../controllers/getPokemon')

pokeRoutes.get('/', async (req, res) => {

    const { name } = req.query
    
    try {
        if(name){
            pokemon = await getPokemonByName(name)
        }else{
            pokemon = await getAllPokemons()
        }

        if(pokemon){
            res.status(200).json(pokemon)
        }
        else{
            res.status(500).send('Pokemon not found')
        }

    } catch (error) {
        res.status(500).send('error');
    }

})

pokeRoutes.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const getPokemon = await getPokemonById(id)
        if(getPokemon){
            res.status(200).json(getPokemon)
        }
        else{
            res.status(500).send('Pokemon no encontrado / Pokemon not found')
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

pokeRoutes.post('/', async (req, res) => {
    try {
        const { name, hp, attack, defense, speed, height, weight, type } = req.body
    
        if(!name || !hp || !attack || !defense || !speed || !height || !weight || !type.length){
            return res.status(500).send('Debes completar todos los campos / You must complete all fields')
        }
        else{
            const newPokemon = await createPokemon(name, hp, attack, defense, speed, height, weight, type)
            res.status(200).send('Creado correctamente');
        }
        
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = pokeRoutes;