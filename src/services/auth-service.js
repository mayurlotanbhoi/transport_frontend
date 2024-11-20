
// import { logOut } from '../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../redux/auth/authSlice';
import { baseApi } from './baseApi';


export const authApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({
        // Login Mutation
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),

        // Register Mutation
        register: builder.mutation({
            query: (data) => ({
                url: '/user/register',
                method: 'POST',
                body: data,
            }),
        }),

        // Refresh Token Mutation
        refreshToken: builder.mutation({
            query: () => ({
                url: '/auth/refresh-token',
                method: 'POST',
                credentials: 'include', // Ensures cookies are sent
            }),

        }),

        // Re-authentication Query
        reAuth: builder.query({
            query: () => ({
                url: '/auth/re-auth',
                method: 'GET',
                credentials: 'include', // Include credentials for cookies
            }),
            refetchOnReconnect: true,    // Retry on reconnect
            refetchOnFocus: true,
            retry: 3,
            providesTags: ['user'],
            // keepUnusedDataFor: 60,
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    console.log('queryFulfilled', queryFulfilled)
                    await queryFulfilled;
                } catch (error) {
                    console.error('Re-authentication failed:', error);
                    // Handle error or dispatch actions as needed
                }
            },
        }),

        // Logout Mutation
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
                credentials: 'include', // Include credentials for cookies
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    // await queryFulfilled;

                    const isLogOut = await queryFulfilled;
                    console.log("isLogOut", isLogOut)
                    // if (isLogOut?.data?.statusCode === 200 && isLogOut?.data?.success) {
                    //     dispatch(setCredentials({ accessToken: null, user: {} }))
                    //     clearToken()
                    //     const navigate = useNavigate();
                    //     // const { accessToken, user }
                    //     navigate('/')

                    // }
                    // Perform logout cleanup actions, e.g., dispatch(logOut())
                } catch (error) {
                    console.error('Logout failed:', error);
                    // Handle errors gracefully
                }
            },
        }),

        // Protected Route Query
        getProtected: builder.query({
            query: () => ({
                url: '/protected',
                method: 'GET',
                credentials: 'include',
            }),
        }),
    }),
    overrideExisting: false,
});

// Export Hooks
export const {
    useLoginMutation,
    useRegisterMutation,
    useRefreshTokenMutation,
    useReAuthQuery,
    useLogoutMutation,
    useGetProtectedQuery,
} = authApi;


// import { baseApi } from './baseApi';

// export const authApi = baseApi.injectEndpoints({
//     endpoints: (builder) => ({
//         login: builder.mutation({
//             query: (credentials) => ({
//                 url: '/auth/login',
//                 method: 'POST',
//                 body: credentials,
//             }),
//         }),

//         register: builder.mutation({
//             query: (data) => ({
//                 url: '/auth/register',
//                 method: 'POST',
//                 body: data,
//             })
//         })
//     }),
// });

// export const { useLoginMutation, useRegisterMutation } = authApi;
