import axios from 'axios'
import { getCountries, getDetailCountry, createActivity, loadingTrue } from '../reducers'

export const obtenerPaises = params => {

    const urlApiPaises = 'http://localhost:8081/countries'

    return ( 
        async dispatch => {
            await dispatch(loadingTrue())
            try {
                const { data: paises } = await axios.get(urlApiPaises, { params })                    
                await dispatch(getCountries(paises))
            } catch (error) {
                if (error.response?.status === 404) {
                    await dispatch(getCountries([]))                        
                } else {
                    debugger
                    console.error('Error trayendo los paises: ', error)
                }                  
            }
        }
    )
}

export const obtenerTodos = () => (
    async dispatch => {
        await dispatch(loadingTrue())
        const {data: paises} = await axios.get(`http://localhost:8081/countries/todo`)
        await dispatch(getCountries(paises))
    }
)

export const detallePais = idPais => (
    async dispatch =>{
        await dispatch(loadingTrue())
        const { data: detalle } = await axios.get(`http://localhost:8081/countries/${idPais}`)
        await dispatch(getDetailCountry(detalle))
    }
)

export const postearActividad = datosActividad => (
    async dispatch => {        
        await dispatch({type: 'CARGANDO'})        
        const {data: actividadCreada} = await axios.post('http://localhost:8081/activity', datosActividad)
        await dispatch(createActivity(actividadCreada))
    }
)