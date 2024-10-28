// src/features/tripHistory/tripHistoryApi.js

import { baseApi } from './baseApi'; // Ensure this path is correct based on your project structure

export const tripHistoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Create a new trip history
        createTrip: builder.mutation({
            query: (newTrip) => ({
                url: '/trips/create-trip',
                method: 'POST',
                body: newTrip,
            }),
            invalidatesTags: ['TripHistory'],
        }),

        // Get all trip histories
        getTrips: builder.query({
            query: (id) => `/trips/getAllTripHistories/${id}`, // Use template literal to inject id
            providesTags: ['TripHistory'],
            refetchOnReconnect: true,    // Retry on reconnect
            refetchOnFocus: true,        // Retry when the component regains focus
            // keepUnusedDataFor: 60,       // Keep data for 60 seconds before refetching
        }),


        // Get a single trip history by ID
        getTrip: builder.query({
            query: (id) => `/trip-history/${id}`,
            providesTags: (result, error, id) => [{ type: 'TripHistory', id }],
        }),

        // Update a trip history by ID
        updateTrip: builder.mutation({
            query: ({ id, ...updatedTrip }) => ({
                url: `/trip-history/${id}`,
                method: 'PUT',
                body: updatedTrip,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'TripHistory', id }],
        }),

        // Delete a trip history by ID
        deleteTrip: builder.mutation({
            query: (id) => ({
                url: `/trip-history/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['TripHistory'],
        }),
    }),
    overrideExisting: false,
});

// Export hooks for usage in functional components
export const {
    useCreateTripMutation,
    useGetTripsQuery,
    useGetTripQuery,
    useUpdateTripMutation,
    useDeleteTripMutation,
} = tripHistoryApi;
