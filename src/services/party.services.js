// src/features/Party/PartyApi.js

import { setParties } from '../redux/party/partySlicer';
import { baseApi } from './baseApi'; // Ensure this path is correct based on your project structure

export const partyApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({
        // Create a new Party history
        createParty: builder.mutation({
            query: (newParty) => ({
                url: '/party/create-party',
                method: 'POST',
                body: newParty,
            }),
            invalidatesTags: [{ type: 'Party', id: 'LIST' }],
        }),

        // Get all Party histories
        getParty: builder.query({
            query: () => '/party/get-your-parties',
            providesTags: [{ type: 'Party', id: 'LIST' }],
            refetchOnReconnect: true,    // Retry on reconnect
            refetchOnFocus: true,
            retry: 3,
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled; // Wait for the query to resolve
                    console.log("data", data)
                    dispatch(setParties(data)); // Dispatch action to set party data in Redux store
                } catch (error) {
                    console.error('Error fetching Party:', error);
                }
            },
        }),

        // Update a Party history by ID
        updateParty: builder.mutation({
            query: ({ id, ...updatedParty }) => ({
                url: `/Party-history/${id}`,
                method: 'PUT',
                body: updatedParty,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Party', id }],
        }),

        // Delete a Party history by ID
        deleteParty: builder.mutation({
            query: (id) => ({
                url: `/Party-history/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Party', id }, { type: 'Party', id: 'LIST' }],
        }),
    }),
    overrideExisting: false,
});

// Export hooks for usage in functional components
export const {
    useCreatePartyMutation,
    useGetPartyQuery,
    useUpdatePartyMutation,
    useDeletePartyMutation,
} = partyApi;
