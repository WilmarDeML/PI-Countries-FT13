import {
    OBTENER_PAISES,
    OBTENER_DETALLE_PAIS,
    CREAR_ACTIVIDAD,
    OBTENER_TODOS
} from '../actions/actionTypes'

const estadoInicial = {
    todos: undefined,
    paises: undefined,
    detallePais: undefined,
    cargando: false,
    actividad: undefined
}

const rootReducer = (estado = estadoInicial, action) => {
    switch (action.type) {
        case OBTENER_PAISES:
            return {
                ...estado,
                cargando: false,
                paises: action.payload
            } 
        case OBTENER_DETALLE_PAIS:
            return {
                ...estado, 
                detallePais: action.payload,
                cargando: false
            }
        case CREAR_ACTIVIDAD:
            return {
                ...estado,
                cargando: false,
                actividad: action.payload
            }
        case OBTENER_TODOS:
            return {
                ...estado, 
                cargando: false,
                todos: action.payload
            }
        case 'CARGANDO':
            return {
                ...estado,
                cargando: true
            }
        default:
            return estado;
    }
}

export default rootReducer;