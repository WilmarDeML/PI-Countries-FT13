import axios from 'axios'

import { OBTENER_PAISES, OBTENER_DETALLE_PAIS, CREAR_ACTIVIDAD, OBTENER_TODOS } from './actionTypes'

export const obtenerPaises = (pais, continente, orden = 'ASC', filtro = 'nombre', codigo, pagina = 1) => (
    !pais && (!continente || (continente === 'cont')) && !codigo ?
        async dispatch => {
            await dispatch({type: 'CARGANDO'})
            const paises = await axios.get(`http://localhost:3001/countries?orden=${orden}&filtro=${filtro}&page=${pagina}`)
            await dispatch({
                type: OBTENER_PAISES,
                payload: paises.data
            })
        }
    :
    !codigo ? 
        !pais && continente ?
            async dispatch => {
                await dispatch({type: 'CARGANDO'})
                const paises = await axios.get(`http://localhost:3001/countries?cont=${continente}&orden=${orden}&filtro=${filtro}&page=${pagina}`)
                await dispatch({
                    type: OBTENER_PAISES,
                    payload: paises.data
                })
            }
        :
        pais && !continente ?
            async dispatch => {
                await dispatch({type: 'CARGANDO'})
                const paises = await axios.get(`http://localhost:3001/countries?name=${pais}&orden=${orden}&filtro=${filtro}&page=${pagina}`)
                await dispatch({
                    type: OBTENER_PAISES,
                    payload: paises.data
                })
            }
        :
        async dispatch => {
            await dispatch({type: 'CARGANDO'})
            const paises = await axios.get(`http://localhost:3001/countries?name=${pais}&cont=${continente}&orden=${orden}&filtro=${filtro}&page=${pagina}`)
            await dispatch({
                type: OBTENER_PAISES,
                payload: paises.data
            })
        }
    :
    async dispatch => {
        await dispatch({type: 'CARGANDO'})
        const paises = await axios.get(`http://localhost:3001/countries?cod=${codigo}`)
        await dispatch({
            type: OBTENER_PAISES,
            payload: paises.data
        }) 

    }
)

export const obtenerTodos = () => (
    async dispatch => {
        await dispatch({type: 'CARGANDO'})
        const paises = await axios.get(`http://localhost:3001/countries/todo`)
        await dispatch({
            type: OBTENER_TODOS,
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
            payload: detallePais.data
        })
    }
)

export const postearActividad = datosActividad => (
    async dispatch => {        
        await dispatch({type: 'CARGANDO'})        
        const actividad = await axios.post('http://localhost:3001/activity', datosActividad)
        await dispatch({
            type: CREAR_ACTIVIDAD,
            payload: actividad.data
        })
    }
)