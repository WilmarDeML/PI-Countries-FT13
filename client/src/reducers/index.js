import {
    OBTENER_PAISES,
    OBTENER_DETALLE_PAIS,
    FILTRAR_POR_CONTINENTE
} from '../actions/actionTypes'

const estadoInicial = {
    paises: undefined,
    detallePais: undefined,
    cargando: false
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
        case FILTRAR_POR_CONTINENTE:
            return {
                ...estado,
                cargando: false, 
                paises: action.payload
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