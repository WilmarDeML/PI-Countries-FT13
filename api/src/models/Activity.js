const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    nombre: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    dificultad: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 5
        }
    },
    duracion: {
        type: DataTypes.INTEGER
    },
    temporada: {
        type: DataTypes.ENUM('verano', 'otoño', 'invierno', 'primavera')
    }
  })
}
// Actividad Turística con las siguientes propiedades:
// ID
// Nombre
// Dificultad (Entre 1 y 5)
// Duración
// Temporada (Verano, Otoño, Invierno o Primavera)