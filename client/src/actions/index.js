import axios from 'axios'

import { OBTENER_PAISES, OBTENER_DETALLE_PAIS } from './actionTypes'

export const obtenerPaises = (pais, continente, orden = 'ASC', filtro = 'nombre', codigo, pagina = 1) => (
    !pais && !continente && !codigo ?
        async dispatch => {
            console.log(pagina)
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
                console.log(pagina)
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
                console.log(pagina)
                await dispatch({type: 'CARGANDO'})
                const paises = await axios.get(`http://localhost:3001/countries?name=${pais}&orden=${orden}&filtro=${filtro}&page=${pagina}`)
                // console.log(paises.data)
                await dispatch({
                    type: OBTENER_PAISES,
                    payload: paises.data
                })
            }
        :
        async dispatch => {
            console.log(pagina)
            await dispatch({type: 'CARGANDO'})
            const paises = await axios.get(`http://localhost:3001/countries?name=${pais}&cont=${continente}&orden=${orden}&filtro=${filtro}&page=${pagina}`)
            await dispatch({
                type: OBTENER_PAISES,
                payload: paises.data
            })
        }
    :
    async dispatch => {
        console.log(pagina)
        await dispatch({type: 'CARGANDO'})
        const paises = await axios.get(`http://localhost:3001/countries?cod=${codigo}&orden=${orden}&filtro=${filtro}&page=${pagina}`)
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