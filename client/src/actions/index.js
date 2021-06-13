import axios from 'axios'

import { OBTENER_PAISES, OBTENER_DETALLE_PAIS, FILTRAR_POR_CONTINENTE } from './actionTypes'

export const obtenerPaises = (pais, continente) => (
    !pais && !continente ? 
        async dispatch => {
            await dispatch({type: 'CARGANDO'})
            const paises = await axios.get('http://localhost:3001/countries')
            await dispatch({
                type: OBTENER_PAISES,
                payload: paises.data
            })
        }
    :
        pais ? 
            async dispatch => {
                await dispatch({type: 'CARGANDO'})
                const paises = await axios.get(`http://localhost:3001/countries?name=${pais}`)
                !paises.mensaje ?
                    await dispatch({
                        type: OBTENER_PAISES,
                        payload: paises.data
                    })
                :
                    await dispatch({
                        type: OBTENER_PAISES,
                        payload: paises.mensaje
                    })
            }
        :
        async dispatch => {
            await dispatch({type: 'CARGANDO'})
            const paises = await axios.get(`http://localhost:3001/countries?cont=${continente}`)
            await dispatch({
                type: FILTRAR_POR_CONTINENTE,
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