import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { detallePais } from '../actions'

const Actividad = () => {    

    const [input, setInput] = useState({
        nombre: undefined,
        duracion: undefined,
        dificultad: undefined,
		temporada: undefined
    });

    const [errors, setErrors] = useState({});

    const handleSubmit = e => {
		e.preventDefault();
	}
    
    const handleInputChange = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
			...input,
			[e.target.name]: e.target.value
		}))
    };

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
				className={errors.nombre && 'danger'}
			/>
            <label>Duración </label>
            <input 
				type="number" 
				name='duracion'
				placeholder='Número de días...'
				value={input.duracion}		    			
				onChange={handleInputChange}
				className={errors.duracion && 'danger'}
			/>
            <div className='cDificultad'>
                <span>Dificultad: </span>
                1<input type="radio" name="dificultad" value='1'  onChange={handleInputChange}/>
                2<input type="radio" name="dificultad" value="2" onChange={handleInputChange}/>
                3<input type="radio" name="dificultad" value="3" onChange={handleInputChange}/>
                4<input type="radio" name="dificultad" value="4" onChange={handleInputChange}/>
                5<input type="radio" name="dificultad" value="5" onChange={handleInputChange}/>
            </div>
			<div className='cTemporada'>
                <span>Temporada: </span>
                Verano<input type="radio" name="temporada" value='verano'  onChange={handleInputChange}/>
                Otoño<input type="radio" name="temporada" value="otoño2" onChange={handleInputChange}/>
                Invierno<input type="radio" name="temporada" value="invierno" onChange={handleInputChange}/>
                Primavera<input type="radio" name="temporada" value="primavera" onChange={handleInputChange}/>
            </div>
			<input type='submit' value='Crear Actividad' />
      </form>
    )
}

export default Actividad

// Ruta de creación de actividad turística: debe contener

//  Un formulario controlado con los siguientes campos
// Nombre
// Dificultad
// Duración
// Temporada
//  Posibilidad de seleccionar/agregar varios países en simultaneo
//  Botón/Opción para crear una nueva actividad turística
export function validate(input){
	let errors = {};
	if(!input.nombre){
		errors.nombre = 'Nombre is required';
	}else if (!/\S+@\S+\.\S+/.test(input.nombre)) {
		errors.nombre = 'Nombre is invalid';
	}

	if(!input.password){
		errors.password = 'Password is required';
	}else if (!/(?=.*[0-9])/.test(input.password)) {
		errors.password = 'Password is invalid';
	}

	return errors;
}