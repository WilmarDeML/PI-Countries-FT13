import React from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { obtenerTodos } from '../../actions'
import './Home.css'

const Home = () => {
    const paises = useSelector(state => state.todos)
    const dispatch = useDispatch()

    useEffect(() => {		
        dispatch(obtenerTodos())
    }, [dispatch])

    return (
        <>
        <section className='seccionBanderasTop'>
            {
                paises &&                   
                    paises.map( (pais, indice) => (								
                        indice <= paises.length/2 && <div key={pais.id} value={pais.id} className='imgBandera' >                                   
                            <img src={pais.bandera} alt='ups...' style={{height: '2em', width: '3em'}} />                            
                        </div>								        
                    ))
            }
        </section>
        <section >
            <Link to='/countries' className='seccionEnlace'>
                <h1>Página principal para la información de los paises del mundo!</h1>
            </Link>        
        </section>
        <section className='seccionBanderasBottom'>
            {
                paises &&                   
                    paises.map( (pais, indice) => (								
                        indice >= paises.length/2 && <div key={pais.id} value={pais.id} >                                   
                            <img src={pais.bandera} alt='ups...' style={{height: '2em', width: '3em'}} className='imgBandera' />                            
                        </div>								        
                    ))
            }
        </section>
        </>
    )
}

export default Home

// Pagina inicial: deben armar una landing page con

//  Alguna imagen de fondo representativa al proyecto
//  Botón para ingresar al home (Ruta principal)