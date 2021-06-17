import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => (
    <section className='Home'>
        <Link to='/countries'>
            <h1>Henry Countries</h1>
        </Link>        
    </section>
)

export default Home

// Pagina inicial: deben armar una landing page con

//  Alguna imagen de fondo representativa al proyecto
//  Botón para ingresar al home (Ruta principal)