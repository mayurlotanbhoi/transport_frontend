// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
// import { authApi } from '../../services/auth-service';


const initialState = {
    user: {},
    accessToken: "",
    isLogin: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken, user } = action.payload;
            console.log()
            state.accessToken = accessToken || "";
            state.user = user || {};
            state.isLogin = accessToken ? true : false
        },
        setOnlyUseData: (state, action) => {
            const { user } = action.payload;
            state.user = user || {};
        },
        logOut: (state) => {
            state.accessToken = "";
            state.user = {};
            state.isLogin = false
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addMatcher(
    //             authApi.endpoints.login.matchFulfilled,
    //             (state, { payload }) => {
    //                 const { access_token, user } = payload;
    //                 state.accessToken = access_token;
    //                 state.user = user || null;
    //                 state.isLogin = access_token || false
    //             }
    //         )
    //         .addMatcher(
    //             authApi.endpoints.refreshToken.matchFulfilled,
    //             (state, { payload }) => {
    //                 const { access_token } = payload;
    //                 state.accessToken = access_token;
    //             }
    //         )
    //         .addMatcher(
    //             authApi.endpoints.logout.matchFulfilled,
    //             (state) => {
    //                 state.accessToken = null;
    //                 state.user = null;
    //             }
    //         );
    // },
});

export const { setCredentials, setOnlyUseData, logOut } = authSlice.actions;

export default authSlice.reducer;



// import { createSlice } from '@reduxjs/toolkit';
// import { authApi } from '../../services/auth-service';
// import { setToken, clearToken } from '../../util/localStorage';

// const authSlice = createSlice({
//     name: 'auth',
//     initialState: { user: null, token: null, isLogin: false },

//     reducers: {
//         logout: (state) => {
//             state.user = null;
//             state.token = null;
//             clearToken();
//         },
//     },
//     extraReducers: (builder) => {
//         builder.addMatcher(
//             authApi.endpoints.login.matchFulfilled,
//             (state, { payload }) => {
//                 console.log("payload", payload)
//                 state.user = payload?.data?.user;
//                 state.access_token = payload?.data?.access_token;
//                 state.isLogin = payload?.statusCode === 200;
//                 setToken(payload?.data?.access_token);
//             }
//         );
//     },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;
