const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    nombre: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },
    dificultad: {
        type: DataTypes.INTEGER
    },
    duracion: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1,
            max: 5
        }
    },
    temporada: {
        type: DataTypes.ENUM('verano', 'otoño', 'invierno', 'primavera')
    }
  });
};