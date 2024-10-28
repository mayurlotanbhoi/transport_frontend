// src/services/authApi.js

import { baseApi } from "../../services/baseApi";

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
                url: '/auth/register',
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
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
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
    useLogoutMutation,
    useGetProtectedQuery,
} = authApi;
