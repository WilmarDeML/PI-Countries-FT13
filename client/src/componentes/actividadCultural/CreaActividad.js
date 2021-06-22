import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postearActividad, obtenerTodos } from '../../actions'
import './CreaActividad.css'

const Actividad = () => {    
	
	const dispatch = useDispatch()
	const paises = useSelector(state => state.todos)
	// console.log(paises)
	const cargando = useSelector(state => state.cargando)
	const actividad = useSelector(state => state.actividad)
    const [input, setInput] = useState({
        nombre: '',
        dificultad: 1,
        duracion: 1,
		temporada: 'verano',
		paisesId: []
    })
	const [error, setError] = useState({})
	// console.log(input)
	useEffect(() => {		
        dispatch(obtenerTodos())
    }, [dispatch])

    const handleSubmit = e => {
		e.preventDefault()
		dispatch(postearActividad({...input}))
		input.paisesId = []
		input.nombre = ''
	}

	const handleOnClick = () => {
		!input.paisesId.includes(input.id) && input.id !== undefined &&
		setInput({...input, paisesId:[...input.paisesId, input.id]})
	}

    const handleInputChange = e => {		
		setInput({
			...input,
			[e.target.name]: e.target.value
		})      
		
        setError(validate({
			...input,
			[e.target.name]: e.target.value
		}))
    }

    return(
		<>
        <form onSubmit={handleSubmit} className='formulario'>
		<h1 className= 'text-gray'><em>Crea Actividades Culturales en el mundo</em></h1>
      		
			<section className='seccionNombreDuracion'>
				<div className='inputNombre'>
					<label className='labels'>Nombre de la Actividad </label> 	
					<input 
						type="text" 
						name='nombre'
						placeholder='Actividad...'
						value={input.nombre}		    			
						onChange={handleInputChange}
						className={error.nombre ? 'danger' : 'inputClass'}
					/>
					{error.nombre && (<span className='error'> <em>{error.nombre}</em></span>)}
				</div>
				<div className='inputDuracion'>
					<label className='labels'>Duración en meses </label>
					<input 
						type="number" 
						name='duracion'
						min='1'
						placeholder='Número de meses...'
						value={input.duracion}		    			
						onChange={handleInputChange}
						className={error.duracion ? 'danger' : 'inputClass'}
					/>
					{error.duracion && (<span className='error'><em> {error.duracion} </em></span>)}
				</div>
			</section>
        	<section className='seccionDificultadTemporada'>
				<div className='cTemporada'>
					<label className='labels'>Temporada </label>
					<div>
					<input type="radio" name="temporada" value='verano'  onChange={handleInputChange}/>Verano
					<input type="radio" name="temporada" value="otoño" onChange={handleInputChange}/>Otoño
					<input type="radio" name="temporada" value="invierno" onChange={handleInputChange}/>Invierno
					<input type="radio" name="temporada" value="primavera" onChange={handleInputChange}/>Primavera
					</div>
				</div>
				<div className='cDificultad'>
					<label className='labels'>Dificultad</label>
					<div>
					<input type="radio" name="dificultad" value='1'  onChange={handleInputChange}/>1 
					<input type="radio" name="dificultad" value="2" onChange={handleInputChange}/>2 
					<input type="radio" name="dificultad" value="3" onChange={handleInputChange}/>3
					<input type="radio" name="dificultad" value="4" onChange={handleInputChange}/>4
					<input type="radio" name="dificultad" value="5" onChange={handleInputChange}/>5
					</div>
				</div>
			</section>
            <section className='seccionPaises'>
				<span className='labels'>Selecciona los paises a asignarle la actividad </span>
				<select name='id' value={input.id} onChange={handleInputChange} defaultValue='DEFAULT' className='selectClass inputClass'>
					<option value='DEFAULT' disabled>                                   
						Paises...                         
					</option>
					{
						paises &&                   
							paises.map( pais => (								
								<option key={pais.id} value={pais.id}>                                   
									{pais.nombre}                            
								</option>								        
							))
					}
				</select>  
				<button type='button' onClick={handleOnClick} className='boton'>Añadir Pais</button>  
				<div>
					{input.paisesId?.length && <h2>Se agregará la actividad {input.nombre ? input.nombre : error.nombre} a:</h2>}	
					<ul>							
						{
							!input.paisesId?.length ? <h2>No hay paises Asignados</h2> 
							:			
							input.paisesId.map(paisId => 
								<li>
									<Link to={`/countries/${paisId}`}>
										{
											<img src={`${paises?.find(pais => pais.id === paisId)?.bandera}`} alt="No tiene bandera" style={{height: '2em', width: '3em'}} />											
										}
									</Link>
								</li>)	
											
						}
					</ul>
				</div>
			</section>
            <section className='seccionSubmit'>
				<input type='submit' value='Crear Actividad' className='boton'  />
				{
					cargando ? <h1>Cargando...</h1> : <h1>{actividad && actividad.mensaje}</h1>
				}
			</section>			
      </form>
	  </>
    )
}

export default Actividad

export function validate(input){
	let errores = {}
	if(!input.nombre){
		errores.nombre = 'Nombre de actividad requerido...'
	}
	if(input.duracion < 1 || input.duracion > 6){
		errores.duracion = 'La duración es entre 1 y 6 meses...'
	}
	return errores
}

// Ruta de creación de actividad turística: debe contener

//  Un formulario controlado con los siguientes campos
// Nombre
// Dificultad
// Duración
// Temporada
//  Posibilidad de seleccionar/agregar varios países en simultaneo
//  Botón/Opción para crear una nueva actividad turística