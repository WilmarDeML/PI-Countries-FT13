import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { obtenerPaises } from '../../actions'
import './Paises.css'

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

    return (
        <section className='seccionPaises'>
            <div className='cEncabezado'>
                <h1><em>Encuentra información de los paises en el mundo</em></h1>
                <Link to='/actividad' className='botones'>
                    <h1>Crear Actividad Cultural</h1>
                </Link>
            </div>
            <div className='cBuscar'>
                <span>Buscar Pais por palabra clave 💨</span>            
                <input 
                    type="text" 
                    name='nombre' 
                    value={input.nombre}
                    placeholder='Palabra clave...' 
                    onChange={handleInputChange}
                    className='inputClass'
                />
            </div>                
            <div className='cOrdenamientos'>
                <div>
                    <span>Orden 'ASC' 'DESC' 💨</span>
                    <select name='orden' defaultValue={input.orden} onChange={handleInputChange} className='inputClass' >
                        <option value='ASC'>Ascendente</option>
                        <option value='DESC'>Descendente</option>
                    </select>
                </div>
                <div className='cOrden'> 
                <span>Ordenar por 💨</span>                       
                    <select name='filtro' defaultValue={input.filtro} onChange={handleInputChange} className='inputClass' >
                        <option value='nombre'>Alfabeto</option>
                        <option value='poblacion'>Población</option>
                    </select>
                </div>
            </div>
            <h2 className='tFiltros'><em>Filtros</em></h2>
            <div className='cFiltros'>
                <div className='dFiltros'>
                    <span>Por Continente 💨</span>
                    <select name='continente' defaultValue={input.continente} onChange={handleInputChange} className='inputClass' >
                        <option value=''>Todos</option>  
                        <option value="Africa">Africa</option>
                        <option value="Americas">Americas</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="Oceania">Oceania</option>
                        <option value="Polar">Polar</option>
                    </select>
                </div>
                <div className='dFiltros'>
                    <span>Por Actividad Turística 💨</span>
                    <input 
                        type="number" 
                        min='1'
                        name="codigo" 
                        value={input.codigo}
                        onChange={handleInputChange}
                        placeholder='Código de actividad...' 
                        className='inputClass'
                    />                    
                </div>
            </div>
            <input type='submit' value='Buscar' onClick={handleSubmit} className='botones botonBuscar' />                
            <div className='cPaginado'>
                <h2 className='botones otroBoton'>{paises && paises.count} resultados</h2>

                <div className='botones otroBoton'>
                    <span>Página {input.page < 1 ? 1 : input.page} de {paises && Math.ceil(paises.count/10)} </span>
                    <input type='number' 
                        value={input.page} 
                        name='page' 
                        onClick={ handleSubmit } 
                        onChange={handleInputChange} 
                        min='1' 
                        max={paises && Math.ceil(paises.count/10)} 
                        className='inputClass'
                    />
                </div>
            </div>
            <div className='cListaPaises'>
                <ul className='miUl'>
                    {
                        paises && paises.count > 0 ?                            
                            cargando ? <h1>Cargando Paises...</h1> :                    
                            paises.rows.map( pais => (
                                pais.countryId ?
                                    <li key={pais.id} className='liPais'> 
                                        <Link to={`/countries/${pais.countryId}`} className='link'>
                                            <h1>{pais.countryId}</h1>                            
                                        </Link>
                                    </li>
                                :
                                <li key={pais.id} className='liPais'>                                   
                                    <Link to={`/countries/${pais.id}`} className='link'>
                                        <h1>{pais.nombre}</h1>                            
                                        <img src={`${pais.bandera}`} alt="No tiene bandera" style={{height: '8em', width: '13em'}} />
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