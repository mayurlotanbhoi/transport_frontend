// src/features/vehicle/vehicleSlice.js
import { createSlice } from '@reduxjs/toolkit';
// import { vehicleApi } from '../../services/vehicle-service';

const initialState = {
    vehicles_numbers: [],
    vehicles: [],
    loading: false,
    error: null,
};

const vehicleSlice = createSlice({
    name: 'vehicle',
    initialState,
    reducers: {
        setVehicles: (state, action) => {
            console.log("action.payload", action.payload)
            const { vehicle_num, vehicles } = action.payload
            state.vehicles_numbers = vehicle_num
            state.vehicles = vehicles
            // state.vehicles = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setVehicles, setLoading, setError } = vehicleSlice.actions;

export default vehicleSlice.reducer;
