import { createSlice } from '@reduxjs/toolkit'

const paisesActividadesSlice = createSlice({
    name: 'paisesActividades',
    initialState: {},
    reducers: { 
        getCountries(estado, action) {
            estado.paises = action.payload
            estado.cargando = false
        },
        getDetailCountry(estado, action) {
            estado.detallePais = action.payload
            estado.cargando = false
        },
        createActivity(estado, action) {
            estado.actividad = action.payload
            estado.cargando = false
        },
        loadingTrue(estado) {
            estado.cargando = true
        }
    }
})

export const { getCountries, getDetailCountry, createActivity, loadingTrue } = paisesActividadesSlice.actions
export default paisesActividadesSlice.reducer