// src/features/parties/partiesSlice.js
import { createSlice } from '@reduxjs/toolkit';
// import { partiesApi } from '../../services/parties-service';

const initialState = {
    partiess: [],
    loading: false,
    error: null,
};

const partiesSlice = createSlice({
    name: 'party',
    initialState,
    reducers: {
        setParties: (state, action) => {

            console.log("action.payload", action.payload)
            state.partiess = action.payload
            // state.partiess = partiess
            // state.partiess = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setParties, setLoading, setError } = partiesSlice.actions;

export default partiesSlice.reducer;
