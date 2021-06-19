import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { obtenerPaises } from '../actions'

const Paises = () => {
    const dispatch = useDispatch()
    const paises = useSelector(state => state.paises)
    const cargando = useSelector(state => state.cargando)
    const [input, setInput] = useState({page:1})
    
    const handleInputChange = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = e => {
        e.preventDefault();        
        dispatch(obtenerPaises(input.nombre, input.continente, input.orden, input.filtro, input.codigo, input.page))
        input.codigo = ''
    }

    useEffect(() => {
        dispatch(obtenerPaises())
    }, [dispatch])

    return(
        <section className='cPaises'>
            <h1>Estoy en el componente Paises</h1>
            <Link to='/actividad'>
                <h1>Crear Actividad</h1>
            </Link>
            <h2>{paises && paises.count} resultados</h2>
            <div className='cBusquedasFiltros'>
                <div className='botones'>
                    <span>Página {input.page} de {paises && Math.ceil(paises.count/10)} </span>
                    <input type='number' value={input.page} name='page' onClick={ handleSubmit } onChange={handleInputChange} min='1' max={paises && Math.ceil(paises.count/10)}></input>
                </div>
                <div className='cBuscar'>
                    <span>Buscar Pais </span>            
                    <input 
                        type="text" 
                        name='nombre' 
                        value={input.nombre}
                        placeholder='Nombre del pais...' 
                        onChange={handleInputChange}
                    />
                </div>                
                <div>
                    <span>Orden </span>
                    <select name='orden' value={input.orden} onChange={handleInputChange} className='cOrdenar'>
                        <option>Orden</option>
                        <option value='ASC'>Ascendente</option>
                        <option value='DESC'>Descendente</option>
                    </select>
                </div>
                <h2>Filtros</h2>
                <div className='cFiltroContinente'>
                    <span>Por Continente </span>
                    <select name='continente' value={input.continente} onChange={handleInputChange} className='cSelect'>
                        <option value={null}>Continentes</option>  
                        <option value="Africa">Africa</option>
                        <option value="Americas">Americas</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="Oceania">Oceania</option>
                        <option value="Polar">Polar</option>
                    </select>
                </div>
                <div className='cOrden'> 
                <span>Por </span>                       
                    <select name='filtro' value={input.filtro} onChange={handleInputChange} className='cOrdenarPor'>
                        <option>Ordenar Por</option>
                        <option value='poblacion'>Población</option>
                        <option value='nombre'>Alfabeto</option>
                    </select>
                </div>
                <div className='cFiltroActividad'>
                    <span>Filtrar Por Actividad Turística </span>
                    <input 
                        type="number" 
                        min='1'
                        name="codigo" 
                        value={input.codigo}
                        onChange={handleInputChange}
                        placeholder='Código de actividad...' 
                    />                    
                </div>
                <input type='submit' value='Filtrar' onClick={handleSubmit}/>
                
            </div>
            <div className='cListaPaises'>
                <ul>
                    {
                        paises && paises.count > 0 ?                            
                            cargando ? <h1>Cargando Paises...</h1> :                    
                            paises.rows.map( pais => (
                                pais.countryId ?
                                    <li key={pais.id}> 
                                        <Link to={`/countries/${pais.countryId}`}>
                                            <h1>{pais.countryId}</h1>                            
                                        </Link>
                                    </li>
                                :
                                <li key={pais.id}>                                   
                                    <Link to={`/countries/${pais.id}`}>
                                        <h1>{pais.nombre}</h1>                            
                                        <img src={`${pais.bandera}`} alt="No tiene bandera" style={{height: '10em', width: '15em'}} />
                                    </Link>
                                    <h2>{pais.continente}</h2>
                                </li>        
                            ))        
                        :
                        !paises ? <h1>Intentando Cargar...</h1> : <h1>Sin Coincidencias</h1>
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