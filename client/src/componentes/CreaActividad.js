import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postearActividad, obtenerTodos } from '../actions'

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
        <form onSubmit={handleSubmit} className='formulario'>
      		<h1 className= 'text-gray'><em>Estoy en el Componente Actividad</em></h1>
        	<label>Nombre de la Actividad </label> 	
        	<input 
				type="text" 
				name='nombre'
				placeholder='Actividad...'
				value={input.nombre}		    			
				onChange={handleInputChange}
				// className={errors.nombre && 'danger'}
			/>
			{error.nombre && (<p>{error.nombre}</p>)}
            <label>Duración </label>
            <input 
				type="number" 
				name='duracion'
				min='1'
				placeholder='Número de días...'
				value={input.duracion}		    			
				onChange={handleInputChange}
				// className={errors.duracion && 'danger'}
			/>
            <div className='cDificultad'>
                <span>Dificultad: </span>
                <input type="radio" name="dificultad" value='1'  onChange={handleInputChange}/>1
                <input type="radio" name="dificultad" value="2" onChange={handleInputChange}/>2
                <input type="radio" name="dificultad" value="3" onChange={handleInputChange}/>3
                <input type="radio" name="dificultad" value="4" onChange={handleInputChange}/>4
                <input type="radio" name="dificultad" value="5" onChange={handleInputChange}/>5
            </div>
			<div className='cTemporada'>
                <span>Temporada: </span>
                <input type="radio" name="temporada" value='verano'  onChange={handleInputChange}/>Verano
                <input type="radio" name="temporada" value="otoño" onChange={handleInputChange}/>Otoño
                <input type="radio" name="temporada" value="invierno" onChange={handleInputChange}/>Invierno
                <input type="radio" name="temporada" value="primavera" onChange={handleInputChange}/>Primavera
            </div>
			<div className='cPaises'>
				<select name='id' value={input.id} onChange={handleInputChange}>
					<option>                                   
						Paises                            
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
				<button type='button' onClick={handleOnClick}>Añadir Pais</button>  
				<div>
					<ul>
						{
							!input.paisesId?.length ? <h2>No hay paises Asignados</h2> :
							<>
							<h2>Se agregará la actividad {input.nombre} a:</h2>
							{
								input.paisesId.map(paisId => <li>{paisId}</li>)
							}
							</>
						}
					</ul>
				</div>
			</div>
			<input type='submit' value='Crear Actividad'  />
			{
				cargando ? <h1>Cargando...</h1> : <h1>{actividad && actividad.mensaje}</h1>
			}			
      </form>
    )
}

export default Actividad

export function validate(input){
	let error = {}
	if(!input.nombre){
		error.nombre = 'Nombre de actividad requerido'
	}
	return error
}

// Ruta de creación de actividad turística: debe contener

//  Un formulario controlado con los siguientes campos
// Nombre
// Dificultad
// Duración
// Temporada
//  Posibilidad de seleccionar/agregar varios países en simultaneo
//  Botón/Opción para crear una nueva actividad turística