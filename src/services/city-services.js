import { baseApi } from './baseApi';

export const cityApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),

    }),
});

export const { useLoginMutation, } = cityApi;
