import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { obtenerPaises, ordenarPaises } from '../actions'

const Paises = () => {
    const dispatch = useDispatch()
    let paises = useSelector(state => state.paises)
    const cargando = useSelector(state => state.cargando)
    const [input, setInput] = useState({})

    const handleInputChange = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = e => {
        e.preventDefault();        
        dispatch(obtenerPaises(input.nombre, input.continente, input.orden, input.filtro))
        input.nombre = ''
        input.continente =  ''
        input.orden = ''
        input.filtro = ''
    }

    const handleOnClick = () => {
        console.log(input.orden)
        dispatch(obtenerPaises(input.orden, input.codigo))
    }

    useEffect(() => {
        dispatch(obtenerPaises())
    }, [dispatch])
    // console.log(paises)

    return(
        <section className='cPaises'>
            <h1>Estoy en el componente Paises</h1>
            <div className='cBusquedasFiltros'>
                <div className='cBuscar'>
                    <span>Buscar Pais </span>            
                    <input 
                        type="text" 
                        name='nombre' 
                        value={input.nombre}
                        placeholder='Nombre del pais...' 
                        onChange={handleInputChange}
                    />
                    <input type='submit' value='Buscar' onClick={handleSubmit}/>
                </div>
                
                <div className='cOrdenFiltro'>
                    <div className='cFiltrar'>
                        <div className='cFiltroContinente'>
                            <span>Filtrar Por Continente </span>
                            <select name='continente' value={input.continente} onChange={handleInputChange} className='cSelect'>
                                <option>Continentes</option>  
                                <option value="Africa">Africa</option>
                                <option value="Americas">Americas</option>
                                <option value="Asia">Asia</option>
                                <option value="Europe">Europe</option>
                                <option value="Oceania">Oceania</option>
                                <option value="Polar">Polar</option>
                            </select>
                            <input type='submit' value='Filtrar' className='boton' onClick={handleSubmit}/>
                        </div>
                        <div className='cFiltroActividad'>
                            <span>Filtrar Por Actividad Turística </span>
                            <input 
                                type="number" 
                                name="codigo" 
                                value={input.codigo}
                                onChange={handleInputChange}
                                placeholder='Código de actividad...' />
                            <button className='boton' onClick={handleOnClick}>Filtrar</button>
                        </div>
                    </div>
                    <div className='cOrden'>
                        <select name='orden' value={input.orden} onChange={handleInputChange} className='cOrdenar'>
                            <option>Orden</option>
                            <option value='ascendente'>Ascendente</option>
                            <option value='descendente'>Descendente</option>
                        </select>
                        <select name='filtro' value={input.filtro} onChange={handleInputChange} className='cOrdenarPor'>
                            <option>Ordenar Por</option>
                            <option value='poblacion'>Población</option>
                            <option value='alfabeto'>Alfabeto</option>
                        </select>
                    </div>
                    <div className='botones'>
                        <button className='boton'>Atrás</button>
                        <button className='boton'>Siguiente</button>
                    </div>
                </div>
            </div>
            <div className='cListaPaises'>
                <ul>
                    {
                        Array.isArray(paises) ?
                            cargando ? <h1>{paises[0].mensaje}</h1> :                    
                            paises && paises.map( pais => 
                                <li key={pais.id}>
                                    <Link to={`/countries/${pais.id}`}>
                                        <h1>{pais.nombre}</h1>                            
                                        <img src={`${pais.bandera}`} alt="No tiene bandera" style={{height: '10em', width: '15em'}} />
                                    </Link>
                                    <h2>{pais.continente}</h2>
                                </li>                    
                            )
            
                        :
                        <h1>Cargando...</h1>
                    }              
                </ul>                
            </div>
        </section>
    )
    
}

export default Paises
// Ruta principal: debe contener
// [ ] Input de búsqueda para encontrar países por nombre
// [ ] Área donde se verá el listado de países. Al iniciar deberá cargar los primeros resultados obtenidos desde la ruta GET /countries y deberá mostrar su:
// Imagen de la bandera
// Nombre
// Continente
// [ ] Botones/Opciones para filtrar por continente y por tipo de actividad turística
// [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente los países por orden alfabético y por cantidad de población
// [ ] Paginado para ir buscando y mostrando los siguientes paises