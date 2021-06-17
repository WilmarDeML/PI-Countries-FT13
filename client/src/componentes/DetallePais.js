import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detallePais } from '../actions'

const Detalle = ({match, history}) => {
    
    const id = match.params.id
    // console.log(id)
    const dispatch = useDispatch()
    const pais = useSelector(state => state.detallePais)
    const cargando = useSelector(state => state.cargando)
    useEffect( () => {
        dispatch(detallePais(id))
    }, [id, dispatch])
    
    return(
        <section className='Home'>
            {cargando ? <h1>Cargando...</h1> :
                <>
                <button onClick={history.goBack}>
                    Volver
                </button>
            
                {pais ?
                    <>
                    <h1>{pais.data.id}</h1> 
                    <h1>{pais.data.nombre}</h1>                            
                    <img src={`${pais.data.bandera}`} alt="No tiene bandera" style={{height: '10em', width: '15em'}} />
                    <h2>{pais.data.capital}</h2>      
                    <h2>Subregion: {pais.data.subregion}</h2>
                    <h2>Área: {pais.data.area}m^2</h2>
                    <h2>Población: {pais.data.poblacion} habitantes</h2>
                    <h2>Actividades:</h2>
                    <ul>
                        {
                            pais.data.actividades?.length ? 
                                pais.data.actividades.map(actividad => <li key={pais.data.id}>{actividad.nombre}</li>)
                            :
                                <h2>No tiene actividades asociadas!</h2>
                        }
                    </ul>
                    </>                    
                :
                    <h1>No se halló el pais {id}</h1>}
                </>
            }
        </section>
    )
}

export default Detalle

// Ruta de detalle de país: debe contener

//  Los campos mostrados en la ruta principal para cada país (imagen de la bandera, nombre, código de país de 3 letras y continente)
//  Código de país de 3 letras (id)
//  Capital
//  Subregión
//  Área (Mostrarla en km2 o millones de km2)
//  Población
//  Actividades turísticas con toda su información asociada