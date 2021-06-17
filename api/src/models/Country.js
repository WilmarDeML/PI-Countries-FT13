const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    bandera: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    continente: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    capital: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    subregion: {
      type: DataTypes.TEXT
    },
    area: {
      type: DataTypes.REAL
    },
    poblacion: {
      type: DataTypes.INTEGER
    }
  })
}

// País con las siguientes propiedades:
// ID (Código de 3 letras) *
// Nombre *
// Imagen de la bandera *
// Continente *
// Capital *
// Subregión
// Área
// Población