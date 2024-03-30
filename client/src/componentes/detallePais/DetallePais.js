import React from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { detallePais } from '../../actions'
import './DetallePais.css'

const Detalle = () => {
    const navigate = useNavigate()
    const params = useParams()
    const id = params.id
    const dispatch = useDispatch()
    const pais = useSelector(state => state.detallePais)
    const cargando = useSelector(state => state.cargando)
    useEffect( () => {
        dispatch(detallePais(id))
    }, [id, dispatch])
    
    return(
        <>
            {cargando ? <h1>Cargando...</h1> :
                <>
                <button onClick={() => navigate(-1)} className='boton1'>
                    Volver Atrás
                </button>
            
                {pais ?
                    <section className='seccionPais'>
                    <h1 className='nombrePais'>{pais.nombre}</h1>                            
                    <h1>{pais.id}</h1> 
                    <img src={`${pais.bandera}`} alt="No tiene bandera" style={{height: '10em', width: '18em'}} />
                    <h2>{pais.capital}</h2>      
                    <h2>Subregion: {pais.subregion}</h2>
                    <h2>Área: {pais.area} m<sup>2</sup></h2>
                    <h2>Población: {pais.poblacion} habitantes</h2>
                    <h2>Actividades:</h2>
                    {
                        pais.activities?.length ? 
                            <ul>
                                {
                                    pais.activities.map(actividad => 
                                    <li key={actividad.id}>
                                        <div className='divActividad'>
                                            <h3>Actividad {actividad.id}</h3>
                                            <h4>{actividad.nombre}</h4>
                                            <h4>Dificultad {actividad.dificultad} </h4>
                                            <h4>Dura {actividad.duracion} meses </h4>
                                            <h4>En {actividad.temporada}</h4>
                                        </div>                      
                                    </li>)
                                }
                            </ul>
                        :
                            <h2>No tiene actividades asociadas!</h2>
                    }
                    </section>                    
                :
                    <h1>No se halló el pais {id}</h1>}
                </>
            }
        </>
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