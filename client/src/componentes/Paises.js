import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { obtenerPaises } from '../actions'

const Paises = () => {
    const dispatch = useDispatch()
    const paises = useSelector(state => state.paises)
    const cargando = useSelector(state => state.cargando)

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
                    <input type="text" name='busqueda' placeholder='Nombre del pais...' />
                </div>
                
                <div className='cOrdenFiltro'>
                    <div className='cFiltrar'>
                        <div className='cFiltroContinente'>
                            <span>Filtrar Por Continente </span>
                            <select name="select" className='cSelect'>
                                <option value="africa">Africa</option>
                                <option value="americas">Americas</option>
                                <option value="asia">Asia</option>
                                <option value="europe">Europe</option>
                                <option value="oceania">Oceania</option>
                                <option value="polar">Polar</option>
                            </select>
                            <input type='button' value='Filtrar' className='boton'/>
                        </div>
                        <div className='cFiltroActividad'>
                            <span>Filtrar Por Actividad Turística </span>
                            <input type="text" name="filtro" placeholder='Código de actividad...' />
                            <button className='boton'>Filtrar</button>
                        </div>
                    </div>
                    <div className='cOrdenar'>
                        <span>Ordenar </span>
                        <input type="radio" name="orden" value="ascendente" />Ascendentemente
                        <input type="radio" name="orden" value="descendente" />Descendentemente
                    </div>
                    <div className='cOrdenarPor'>
                        <span>Ordenar por </span>
                        <input type="radio" name="opcion" value="poblacion" />Cantidad de población
                        <input type="radio" name="opcion" value="alfabeto" />Alfabeto
                    </div>
                    <div className='botones'>
                        <button className='boton'>Atrás</button>
                        <button className='boton'>Siguiente</button>
                    </div>
                </div>
            </div>
            <div className='cListaPaises'>
                <ul>
                    {cargando ? <h1>Cargando...</h1> :                    
                        paises && paises.map( pais => 
                            <li key={pais.id}>
                                <Link to={`/countries/${pais.id}`}>
                                    <h1>{pais.nombre}</h1>                            
                                    <img src={`${pais.bandera}`} alt="No tiene bandera" style={{height: '10em', width: '15em'}} />
                                </Link>
                                <h2>{pais.continente}</h2>
                            </li>                    
                        )
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