import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { obtenerPaises } from '../../actions'
import './Paises.css'
import PaisCard from '../pais-card/pais-card'
import Header from '../header/Header'
import Paginado from '../paginado/Paginado'

const Paises = () => {
    const dispatch = useDispatch()
    const paises = useSelector(state => state.paises)
    const cargando = useSelector(state => state.cargando)
    const [params, setInput] = useState({ page: 1 })
    const [showFilters, setShowFilters] = useState(true)

    const handleShowFilters = () => {
        setShowFilters(!showFilters)
    }
    
    const handleInputChange = e => {
        params.page = params.page ?? 1
        setInput({
            ...params,
            [e.target.name]: e.target.value
        })
    };
    
    useEffect(() => {
        dispatch(obtenerPaises(params))
    }, [dispatch, params])
    
    const handleInputPage = (number, limit) => {

        if (limit) {
            number = !number || number < 0 ? 1 : number > limit ? limit : number
        }

        if (number !== params.page) {
            setInput({
                ...params,
                page: number
            })
        }
    }

    return (
        <>
        <section className='seccionPaises'>
            <div className='d-flex justify-content-between w-100'>
                <Link to='/actividad' className='botones mx-2'>
                    Crear Actividad Cultural
                </Link>
                <Header/>
                <button onClick={handleShowFilters} className= 'botones mx-2'>{ showFilters ? 'Ocultar filtros' : 'Mostrar filtros' }</button>
            </div>
            <aside className={`${showFilters ? 'openIt' : 'closeIt'} filtros`}>
                <div className='w-100 d-flex flex-column'>
                    <legend>Buscar por palabra clave 💥</legend>
                    <input 
                        type="text" 
                        name='name' 
                        value={params.name ?? ''}
                        placeholder='Buscar por palabra clave...' 
                        onChange={handleInputChange}
                        className='inputSearch mt-0'
                    />
                </div>              
                                
                <div className='cOrdenamientos'>
                    <fieldset>
                        <legend className='mb-1'>Orden 💥</legend>
                        <div className='switchGroup'>
                            <div className="form-check form-switch">
                                <input name='orden' value='ASC' onChange={handleInputChange} className="form-check-input" type="radio" id="flexAsc" />
                                <label className="form-check-label" htmlFor="flexAsc">ASC</label>
                            </div>
                            <div className="form-check form-switch">
                                <input name='orden' value='DESC' onChange={handleInputChange} className="form-check-input" type="radio" id="flexDesc" />
                                <label className="form-check-label" htmlFor="flexDesc">DESC</label>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend className='mb-1'>Ordenar por 💥</legend>
                        <div className='switchGroup'>
                            <div className="form-check form-switch">
                                <input name='filtro' value='nombre' onChange={handleInputChange} className="form-check-input" type='radio' id="flexAlfabeto" />
                                <label className="form-check-label" htmlFor="flexAlfabeto">Alfabeto</label>
                            </div>
                            <div className="form-check form-switch">
                                <input name='filtro' value='poblacion' onChange={handleInputChange} className="form-check-input" type="radio" id="flexPoblacion" />
                                <label className="form-check-label" htmlFor="flexPoblacion">Población</label>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div className='ps-3 w-100 d-flex flex-column'>
                    <legend>Por Continente 💥</legend>
                    <select name='continente' value={params.continente ?? ''} onChange={handleInputChange} className='inputSearch mt-0' >
                        <option value=''>Todos</option>  
                        <option value="Africa">Africa</option>
                        <option value="Americas">Americas</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="Oceania">Oceania</option>
                        <option value="Polar">Polar</option>
                    </select>
                </div>
                <div className='ps-3 w-100 d-flex flex-column'>
                    <legend>Por Actividad Turística 💥</legend>
                    <input 
                        type="number" 
                        min='1'
                        name="activityId" 
                        value={params.activityId ?? ''}
                        onChange={handleInputChange}
                        placeholder='Código de actividad...' 
                        className='inputSearch mt-0'
                    />                    
                </div>
            </aside>
            
            <aside> 
                { paises?.countries?.length > 0 && 
                    <Paginado 
                        totalResults={paises.totalCountries} 
                        totalPages={paises.totalPages} 
                        currentPage={params.page} 
                        changePage={handleInputPage}
                    />            
                }

                <ul className='d-flex justify-content-between align-items-center'>
                    {
                        paises?.totalCountries > 0 ?                            
                            cargando ? <h1 >Cargando Paises...</h1> :                    
                            paises.countries.map( pais => (
                                <li key={pais.id} className='card-deck liPais openIt'>
                                    <PaisCard 
                                        id={pais.id} 
                                        nombre={pais.nombre} 
                                        bandera={pais.bandera} 
                                        continente={pais.continente}
                                        poblacion={pais.poblacion}
                                        className='link'
                                    />
                                </li>        
                            ))        
                        :
                            <h1 className='alert alert-warning mt-5 w-100 openIt'> 
                                { !paises ? 'Intentando Cargar...' : 'Sin Coincidencias' }
                            </h1>
                    }              
                </ul>                
            </aside>
            <aside>
            </aside>
        </section>
        </>
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