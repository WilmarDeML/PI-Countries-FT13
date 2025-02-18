import { DataTypes } from 'sequelize';

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
export default sequelize => {
  // defino el modelo
  sequelize.define('Activity', {
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