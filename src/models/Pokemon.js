const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    
    image: {
      type: DataTypes.STRING,
      defaultValue: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTal_5fgf_GXD5QZIzmatg8fuocI4IY2E0Vjw&usqp=CAU",
    },

    hp: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: { min: 0 },
    },

    attack: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: { min: 0 },
    },

    defense: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: { min: 0 },
    },

    speed: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: { min: 0 },
    },

    height: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: { min: 0 },
    },

    weight: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    create: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    }
  },
  {
    timestamps: false,
  });
};

