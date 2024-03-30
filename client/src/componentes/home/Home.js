import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { obtenerTodos } from '../../actions'
import './Home.css'

const Home = () => {
    const paises = useSelector(state => state.paises)
    const dispatch = useDispatch()

    useEffect(() => {		
        dispatch(obtenerTodos())
    }, [dispatch])

    return (
        <div className='contenedor'>
            <section className='seccionBanderas'>
                {
                    paises &&                   
                        paises.map( (pais, indice) => (		
                            indice <= paises.length && <figure key={pais.id} value={pais.id} className='imgBandera' >                                   
                                <img src={pais.bandera} alt='ups...' />                            
                            </figure>								        
                        ))
                }
            </section>
            <section >
                <Link to='/countries' className='seccionEnlace'>
                    <h1>!Hola, Siguiendo este enlace podrás encontrar información detallada de los paises en el mundo!</h1>
                </Link>        
            </section>
        </div>
    )
}

export default Home

// Pagina inicial: deben armar una landing page con

//  Alguna imagen de fondo representativa al proyecto
//  Botón para ingresar al home (Ruta principal)