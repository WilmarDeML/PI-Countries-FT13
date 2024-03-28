import axios from 'axios';

export async function populateCountriesDB(connection) {

    const { country: Country } = connection.models
    const { data: paisesApi } = await axios.get(
        "https://restcountries.com/v3.1/all"
    );
    const paisesEnDB = await Country.count();
    // Si difiere la cantidad de paises de la api con la de base de datos actualiza
    if (paisesEnDB !== paisesApi.length && paisesApi.length > 0) {
        paisesApi.forEach(async (pais) => {

            try {
                await Country.findOrCreate({
                    where: {
                        id: pais.cca3,
                        nombre: pais.name.official,
                        bandera: pais.flags.svg ?? pais.flags.png,
                        continente: pais.region,
                        capital: pais.capital ? pais.capital[0] : "",
                        subregion: pais.subregion ?? "",
                        area: pais.area,
                        poblacion: pais.population,
                    }
                });

            } catch (error) {
                console.error("Error creando pais: ", error);
            }
        });
    }
}

