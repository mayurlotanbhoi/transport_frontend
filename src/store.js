import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './redux/auth/authSlice';
import vehicleSlice from './redux/vehicle/vehicleSlice';
import { tripHistoryApi } from './services/trip_history.service';
import { vehicleApi } from './services/vehicle.services';
import persistReducer from 'redux-persist/es/persistReducer';
import storageSession from 'redux-persist/lib/storage/session'; // Use session storage

// import storage from 'redux-persist/lib/storage/session'; // Use sessionStorage
import persistStore from 'redux-persist/es/persistStore';
import { baseApi } from './services/baseApi';
import { decryptData, encryptData } from './util/encryptData';
import { partyApi } from './services/party.services';


// Define the persistence configuration for auth and vehicle slices
const authPersistConfig = {
    key: 'auth',
    storage: storageSession,
    // whitelist: ['auth'],
    transforms: [
        {
            // Transform to encrypt the entire state before storing
            in: (state) => encryptData(state),
            // Transform to decrypt the entire state after retrieval
            out: (state) => decryptData(state)
        }
    ]
};

const vehiclePersistConfig = {
    key: 'vehicle',
    storage: storageSession,
    // whitelist: ['vehicle'],
    transforms: [
        {
            // Transform to encrypt the entire state before storing
            in: (state) => encryptData(state),
            // Transform to decrypt the entire state after retrieval
            out: (state) => decryptData(state)
        }
    ]
};

// Combine reducers
const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authReducer), // Persisted auth reducer
    vehicle: persistReducer(vehiclePersistConfig, vehicleSlice), // Persisted vehicle reducer
    [vehicleApi.reducerPath]: vehicleApi.reducer,
    [tripHistoryApi.reducerPath]: tripHistoryApi.reducer,
    [partyApi.reducerPath]: partyApi.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
});

// Create the Redux store with the persisted root reducer
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }).concat(baseApi.middleware, tripHistoryApi.middleware, vehicleApi.middleware),
});

// Create a persistor to persist the store
export const persistor = persistStore(store);


// import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import authReducer from './redux/auth/authSlice';
// import { baseApi } from './services/baseApi';
// import persistReducer from 'redux-persist/es/persistReducer';
// import storage from 'redux-persist/lib/storage/session'; // Use sessionStorage
// import persistStore from 'redux-persist/es/persistStore';
// import { tripHistoryApi } from './services/trip_history.service';
// import vehicleSlice from "./redux/vehicle/vehicleSlice";
// import { vehicleApi } from './services/vehicle.services';

// // Define the persistence configuration for auth
// const persistConfig = {
//     key: 'auth', // The key for the persisted state
//     storage, // Use session storage
//     whitelist: ['auth'], // Specify which reducers to persist
// };

// // Combine reducers
// const rootReducer = combineReducers({
//     auth: authReducer, // Auth reducer will be persisted
//     vehicle: vehicleSlice, // Vehicle slice for storing vehicle data
//     [vehicleApi.reducerPath]: vehicleApi.reducer, // Vehicle API
//     [tripHistoryApi.reducerPath]: tripHistoryApi.reducer, // Trip history API
//     [baseApi.reducerPath]: baseApi.reducer, // Other API reducers
// });

// // Persist the auth reducer
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // Create the Redux store with the persisted reducer
// export const store = configureStore({
//     reducer: persistedReducer, // Use persistedReducer at the top level
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: {
//                 // Ignore redux-persist actions in the serializable check
//                 ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
//             },
//         }).concat(baseApi.middleware, tripHistoryApi.middleware, vehicleApi.middleware),
// });

// // Create a persistor to persist the store
// export const persistor = persistStore(store);



















// // import { configureStore, combineReducers } from '@reduxjs/toolkit';
// // import authReducer from './redux/auth/authSlice';
// // import { baseApi } from './services/baseApi';
// // import persistReducer from 'redux-persist/es/persistReducer';
// // import storage from 'redux-persist/lib/storage/session'; // defaults to localStorage for web
// // import persistStore from 'redux-persist/es/persistStore';
// // import { PersistGate } from 'redux-persist/integration/react';
// // import { Provider } from 'react-redux';
// // import { tripHistoryApi } from './services/trip_history.service';
// // import vehicleSlice from "./redux/vehicle/vehicleSlice"
// // import { vehicleApi } from './services/vehicle.services';

// // // Define the persistence configuration
// // const persistConfig = {
// //     key: 'auth', // The key under which your data will be stored in localStorage
// //     storage, // Default storage is localStorage
// //     whitelist: ['auth'], // Specify which reducers you want to persist
// // };

// // // Combine your reducers
// // const rootReducer = combineReducers({
// //     auth: authReducer,
// //     [baseApi.reducerPath]: baseApi.reducer,
// // });

// // // Wrap the auth reducer with persistReducer
// // const persistedReducer = persistReducer(persistConfig, rootReducer);

// // // Create the Redux store with the persisted reducer
// // export const store = configureStore({
// //     reducer: {
// //         persistedReducer,

// //         vehicle: vehicleSlice, // Add the vehicle reducer
// //         [vehicleApi.reducerPath]: vehicleApi.reducer, // Add vehicle API reducer
// //         // Add the tripHistoryApi reducer
// //         [tripHistoryApi.reducerPath]: tripHistoryApi.reducer,
// //     },
// //     middleware: (getDefaultMiddleware) =>
// //         getDefaultMiddleware({
// //             serializableCheck: {
// //                 // Ignore redux-persist actions in the serializable check
// //                 ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
// //             },
// //         }).concat(baseApi.middleware, tripHistoryApi.middleware),
// // });

// // // Create a persistor for persisting the store
// // export const persistor = persistStore(store);
