import { Sequelize } from 'sequelize';
import { populateCountriesDB } from './scripts/populateCountriesDB.js';
import modelActivity from './models/Activity.js'
import modelCountry from './models/Country.js'
import { DB_HOST, DB_PASSWORD, DB_USER } from './config.js';


const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/countries`, {
  logging: query => console.info('query: ', query), // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

// Injectamos la conexion (sequelize) a todos los modelos
modelActivity(sequelize)
modelCountry(sequelize)

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { country: Country, activity: Activity } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Country.belongsToMany(Activity, { through: 'actividad_pais'})
Activity.belongsToMany(Country, { through: 'actividad_pais'})

await populateCountriesDB(sequelize);

export default sequelize
