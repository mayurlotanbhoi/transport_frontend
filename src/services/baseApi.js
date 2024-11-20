// baseApi.js
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { logOut, setCredentials } from '../redux/auth/authSlice';
import { API_BASE_URL } from '../util/config';
import { getToken, setToken } from '../util/localStorage';


const baseQuery = fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        // const token = getState().auth.accessToken;
        const token = getToken()
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    // Initial API request
    let result = await baseQuery(args, api, extraOptions);
    // Check if the request failed (e.g., token expired or unauthorized)
    console.log("!result?.data?.success", !result?.data?.success)
    if (!result?.data?.success) {
        console.log("Token expired. Attempting to refresh token...");
        // Attempt to refresh the token
        const refreshResult = await baseQuery(
            {
                url: '/auth/refresh-token',
                method: 'POST',
                credentials: 'include',
            },
            api,
            extraOptions
        );

        if (refreshResult?.data?.success) {
            console.log("Token refreshed successfully");
            // Extract and save the new token
            const { accessToken, user } = refreshResult.data;
            setToken(accessToken); // Save token to localStorage
            // api.dispatch(setCredentials({ accessToken, user })); // Update Redux state
            // Retry the original request with the new token
            result = await baseQuery(args, api, extraOptions);
        } else {
            console.log("Token refresh failed. Logging out...");
            // api.dispatch(logOut());
            // clearToken(); // Clear token from localStorage
        }
    }
    return result;
};


export const baseApi = createApi({
    reducerPath: 'baseApi',
    // tagTypes: ['TripHistory'],
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
});







// // src/app/baseApi.js
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// // import { logOut, setCredentials } from '../features/auth/authSlice';
// import { API_BASE_URL } from '../util/config';
// import { logOut, setCredentials } from '../redux/auth/authSlice';

// // Custom baseQuery with automatic token refresh
// const baseQuery = fetchBaseQuery({
//     baseUrl: API_BASE_URL, // Update to your backend URL
//     credentials: 'include', // Include cookies (for refresh tokens)
//     prepareHeaders: (headers, { getState }) => {
//         const token = getState().auth.accessToken;
//         if (token) {
//             headers.set('Authorization', `Bearer ${token}`);
//         }
//         return headers;
//     },
// });

// const baseQueryWithReauth = async (args, api, extraOptions) => {
//     let result = await baseQuery(args, api, extraOptions);

//     if (result.error && result.error.status === 403) {
//         // Attempt to refresh the token
//         const refreshResult = await baseQuery(
//             {
//                 url: '/auth/refresh-token',
//                 method: 'POST',
//             },
//             api,
//             extraOptions
//         );

//         if (refreshResult.data) {
//             const { accessToken } = refreshResult.data;
//             // Update the access token in the store
//             api.dispatch(setCredentials({ accessToken }));
//             // Retry the original query with the new access token
//             result = await baseQuery(args, api, extraOptions);
//         } else {
//             // Refresh token invalid or expired, log out the user
//             api.dispatch(logOut());
//         }
//     }

//     return result;
// };

// // Define the base API with the custom baseQuery
// export const baseApi = createApi({
//     reducerPath: 'baseApi',
//     tagTypes: ['TripHistory'], // Include all tag types used in your APIs
//     baseQuery: baseQueryWithReauth,
//     endpoints: () => ({}), // Inject endpoints later
// });



// // import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// // import { getToken } from '../util/localStorage';
// // import { API_BASE_URL } from '../util/config';

// // const baseQuery = fetchBaseQuery({
// //     baseUrl: API_BASE_URL,
// //     prepareHeaders: (headers) => {
// //         const token = getToken();
// //         if (token) {
// //             headers.set('authorization', `Bearer ${token}`);
// //         }
// //         return headers;
// //     },
// // });

// // export const baseApi = createApi({
// //     baseQuery,
// //     endpoints: () => ({}),
// // });
