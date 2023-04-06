const axios = require ('axios');
const { Pokemon, Type } = require ('../db')

const getAllPokemons = async () => {
    let i = 1
    let pokemons = [];   
    let apiData = [];    
    
    while(i < 52){
        let res = await axios(`https://pokeapi.co/api/v2/pokemon/${i}`)
        apiData.push(res.data)
        i++
    }    
            await Promise.all(apiData)
            .then( pokemonData => {
                pokemons = pokemonData.map((poks) => {
                    return {
                        id: poks.id,
                        name: poks.name,
                        image: poks.sprites.front_default,
                        hp: poks.stats[0].base_stat,
                        attack: poks.stats[1].base_stat,
                        defense: poks.stats[2].base_stat,
                        speed: poks.stats[5].base_stat,
                        height: poks.height,
                        weight: poks.weight,
                        types: poks.types.map( t =>{
                            return {
                                name: t.type.name,
                            };
                        }) 
                    }
                })
            });

        const dbData = await Pokemon.findAll({
            include: {
              model: Type,
              through: {
                attributes: [],
              },
            },
          });
          return [...pokemons, ...dbData];
       
}
    
const getPokemonByName = async (name) => {
    nameLower = name.toLowerCase();
    let pokeDB = await Pokemon.findOne({ where: { 
    name: nameLower },
    include: { 
        model: Type, 
        attributes: ['name'],
        through: { attributes: [] } } });
     
    if(pokeDB){
        console.log(pokeDB)
        return pokeDB
    }
    else{
        let pokeApi;
        try {
            await axios (`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then( (res) => {
            pokeApi = {
            id: res.data.id,
            name: res.data.name,
            image: res.data.sprites.front_default,
            hp: res.data.stats[0].base_stat,
            attack: res.data.stats[1].base_stat,
            defense: res.data.stats[2].base_stat,
            speed: res.data.stats[5].base_stat,
            height: res.data.height,
            weight: res.data.weight,
            types: res.data.types.map( t =>{
            return {
                name: t.type.name,
            };})}
            })     
    
        } catch (error) {
            return { error: 'Pokemon not found' }  
        }
        return pokeApi 
    }
}


const getPokemonById = async (id) => {

    const regex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    let pokeDB; 
    console.log(id)
    if(regex.test(id)){
        pokeDB = await Pokemon.findOne({ where: { 
            id: id },
            include: { 
                model: Type, 
                attributes: ['id'],
                through: { attributes: [] } } });
    }

    if(pokeDB){
        return pokeDB
    }
    else{
        let pokemonByIdApi;
        try {
            pokemonData = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(res => {
                pokemonByIdApi = {
                    id: res.data.id,
                    name: res.data.name,
                    image: res.data.sprites.front_default,
                    hp: res.data.stats[0].base_stat,
                    attack: res.data.stats[1].base_stat,
                    defense: res.data.stats[2].base_stat,
                    speed: res.data.stats[5].base_stat,
                    height: res.data.height,
                    weight: res.data.weight,
                    types: res.data.types.map( t =>{
                        return {
                            name: t.type.name,
                        };
                    }) 
                }
            })    
        } catch (error) {
            return { error: 'Pokemon not found' }  
        }
        return pokemonByIdApi
    }
}


const createPokemon = async (name, hp, attack, defense, speed, height, weight, type) => {


    let newPokemon = await Pokemon.create({
    name: name.toLowerCase(),
    hp: Number(hp),
    attack: Number(attack),
    defense: Number(defense),
    speed: Number(speed),
    height: Number(height),
    weight: Number(weight),
    })
    

    let attachType = await Type.findOne({ where: {
        name: type
    } })

    await newPokemon.addTypes(attachType)
       
    return newPokemon;
}

module.exports = {
    getAllPokemons,
    getPokemonById,
    getPokemonByName,
    createPokemon, 
}