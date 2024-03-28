import connection from '../db.js';

const { activity: Activity } = connection.models;

export const crearActividad = async (req, res) => {
    const { nombre, dificultad, duracion, temporada, paisesId } = req.body;

    if (nombre && paisesId?.length) {

        const paisesIdToUpper = paisesId.map(id => id.toUpperCase())

        try {
            const [ actividad, creada ] = await Activity.findOrCreate({
                where: { nombre, dificultad, duracion, temporada },
            });

            if (creada) {
                await actividad.addCountries(paisesIdToUpper);

                return res.json({
                    mensaje: `La actividad "${actividad.nombre}" se asignó a ${paisesIdToUpper.join(', ')}`,
                });
            } else {
                paisesIdToUpper.map(async (id) => {
                    id = id.toUpperCase();
                    if (!(await actividad.hasCountry(id))) {
                        try {
                            await actividad.addCountry(id);
                        } catch (error) {
                            console.error(
                                `Error agregando pais ${id} a la actividad ${actividad.nombre}`,
                                error.message
                            );
                        }
                    }
                });

                return res.json({
                    mensaje: `Si algún pais de la lista no contaba con la actividad ${actividad.id}, fue asignada correctamente`,
                });
            }
        } catch (error) {
            return res.json({ mensaje: error.message });
        }
    } else {
        return !nombre && !paisesId.length
            ? res.json({ mensaje: "Es necesario el nombre de la actividad y los paises a asignar dicha actividad" })
            : !paisesId?.length
                ? res.json({ mensaje: "Se requieren paises para asignar la actividad" })
                : res.json({ mensaje: "El nombre de la actividad es requerido" });
    }
};
