
// import { logOut } from '../redux/auth/authSlice';
import { baseApi } from './baseApi';


export const authApi = baseApi.injectEndpoints({


    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),

        register: builder.mutation({
            query: (data) => ({
                url: '/user/register',
                method: 'POST',
                body: data,
            }),
        }),
        refreshToken: builder.mutation({
            query: () => ({
                url: '/auth/refresh-token',
                method: 'POST',
            }),
        }),

        reAuth: builder.query({
            query: () => ({
                url: '/auth/re-auth',
                method: 'GET',
            }),
        }),

        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    // dispatch(logOut());
                } catch {
                    // Handle errors if needed
                }
            },
        }),
        getProtected: builder.query({
            query: () => '/protected',
        }),
    }),
    overrideExisting: false,
});


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
