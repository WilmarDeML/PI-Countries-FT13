import axios from 'axios'

import { OBTENER_PAISES, OBTENER_DETALLE_PAIS } from './actionTypes'

export const obtenerPaises = () => (
    async dispatch => {
        await dispatch({type: 'CARGANDO'})
        const paises = await axios.get('http://localhost:3001/countries')
        await dispatch({
            type: OBTENER_PAISES,
            payload: paises.data
        })
    }
)

export const detallePais = idPais => (
    async dispatch =>{
        await dispatch({type: 'CARGANDO'})
        const detallePais = await axios.get(`http://localhost:3001/countries/${idPais}`)
        await dispatch({
            type: OBTENER_DETALLE_PAIS,
            payload: detallePais
        })
    }
)