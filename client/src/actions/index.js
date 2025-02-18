import axios from 'axios'
import { getCountries, getDetailCountry, createActivity, loadingTrue } from '../reducers'
import { API_URL } from '../config.js'

export const obtenerPaises = params => {

    const urlApiPaises = `${API_URL}/countries`

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
        const {data: paises} = await axios.get(`${API_URL}/countries/todo`)
        await dispatch(getCountries(paises))
    }
)

export const detallePais = idPais => (
    async dispatch =>{
        await dispatch(loadingTrue())
        const { data: detalle } = await axios.get(`${API_URL}/countries/${idPais}`)
        await dispatch(getDetailCountry(detalle))
    }
)

export const postearActividad = datosActividad => (
    async dispatch => {        
        await dispatch({type: 'CARGANDO'})        
        const {data: actividadCreada} = await axios.post(`${API_URL}/activity`, datosActividad)
        await dispatch(createActivity(actividadCreada))
    }
)