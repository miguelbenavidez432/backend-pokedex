const axios = require ('axios');
const { Type } = require ('../db')

const getType = async () => {
    try {
        let allTypes = []
        await axios("https://pokeapi.co/api/v2/type/")
        .then((res) => res.data.results)
        .then(res =>  res.map( type => allTypes.push(type.name) )
        )
        return allTypes;
      } catch (error) {
        return { error: error.message }
      }
}


const saveApiData = async () => {
    try {
        let allTypes = await getType()
        allTypes.map (type => Type.create({ name: type})) 
    } catch (error) {
        return { error: error.message }  
    }
}

module.exports = {
    saveApiData,
    getType,
}