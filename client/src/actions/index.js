import axios from 'axios'

import { OBTENER_PAISES, OBTENER_DETALLE_PAIS, FILTRAR_POR_CONTINENTE, ORDENAR_PAISES } from './actionTypes'

export const obtenerPaises = (pais, continente, orden, filtro) => (
    !pais && !continente && !orden && !filtro? 
        async dispatch => {
            await dispatch({type: 'CARGANDO'})
            const paises = await axios.get('http://localhost:3001/countries')
            await dispatch({
                type: OBTENER_PAISES,
                payload: paises.data
            })
        }
    :
    // pais ? 
    async dispatch => {
        await dispatch({type: 'CARGANDO'})
        const paises = await axios.get(`http://localhost:3001/countries?name=${pais}&cont=${continente}&orden=${orden}&filtro=${filtro}`)
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
    
)
// export const ordenarPaises = (orden, codigo) => (
//     !codigo ?
//         async dispatch => {
//             await dispatch({type: 'CARGANDO'})
//             const paises = await axios.get(`http://localhost:3001/countries?orden=${orden}`)
//             await dispatch({
//                 type: ORDENAR_PAISES,
//                 payload: paises.data
//             })
//         }
//     :
//     async dispatch => {
//         await dispatch({type: 'CARGANDO'})
//         const paises = await axios.get(`http://localhost:3001/countries?cod=${codigo}`)
//         let filtro = paises.data.filter(pais => Array.isArray(pais.acitivities)?.length)
//         filtro = !filtro.length && [{mensaje: 'Sin Actividades'}]
//         // filtro = filtro.filter(pais => pais.acitivities.id === parseInt(codigo)) 
//         await dispatch({
//             type: ORDENAR_PAISES,
//             payload: filtro
//         })
//     }
// )
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