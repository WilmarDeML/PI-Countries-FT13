import { Sequelize } from 'sequelize';
import { populateCountriesDB } from './scripts/populateCountriesDB.js';
import createActivityModel from './models/Activity.js'
import createCountryModel from './models/Country.js'
import { DB_HOST, DB_PASSWORD, DB_USER, DB_NAME } from './config.js';


const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: query => console.info('query: ', query), // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

// Injectamos la conexion (sequelize) a todos los modelos
createActivityModel(sequelize)
createCountryModel(sequelize)

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Country, Activity } = sequelize.models;

// Las relaciones
Country.belongsToMany(Activity, { through: 'actividad_pais'})
Activity.belongsToMany(Country, { through: 'actividad_pais'})

await sequelize.sync() // Crea base de datos si no existe
//await sequelize.sync({ force: true }) // Borra la base de datos y crea nuevamente

// Poblamos la base de datos con los datos de la API de RestCountries
await populateCountriesDB(Country);

export default sequelize
