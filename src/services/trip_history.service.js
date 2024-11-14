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
            invalidatesTags: ['TripHistory', 'vehicle'],
        }),

        updayeTripPayment: builder.mutation({
            query: (updateTrip) => ({
                url: '/trips/update-trip-Payments',
                method: 'PUT',
                body: updateTrip,
            }),
            invalidatesTags: ['TripHistory'],
        }),


        // Get all trip histories
        getTrips: builder.query({
            query: (id) => `/trips/getAllTripHistories`, // Use template literal to inject id
            providesTags: ['TripHistory'],
            refetchOnReconnect: true,    // Retry on reconnect
            refetchOnFocus: true,        // Retry when the component regains focus
            keepUnusedDataFor: 60,       // Keep data for 60 seconds before refetching
        }),

        getDownloadExelFormatAllTripHistories: builder.query({
            async queryFn(format, _queryApi, _extraOptions, _fetchWithBQ) {
                try {
                    const response = await fetch(`http://localhost:8000/api/v1/trips/downloadExelFormatAllTripHistories/${format}`, {
                        method: 'GET',
                        credentials: 'include', // Ensure cookies are sent
                    });

                    if (!response.ok) {
                        throw new Error(`Error: ${response.statusText}`);
                    }

                    const blob = await response.blob();

                    // Create a download link for the file immediately without storing in Redux state
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `trip_history.${format === 'excel' ? 'xlsx' : 'pdf'}`);
                    document.body.appendChild(link);
                    link.click();
                    link.remove();

                    // Return an empty object as `data` since we're not storing the blob in state
                    return { data: {} };
                } catch (error) {
                    return { error: { status: error.status || 500, message: error.message } };
                }
            },
            refetchOnReconnect: true,
            refetchOnFocus: true,
            // Disable caching for this query to avoid caching non-serializable values
            keepUnusedDataFor: 0,
        }),







        // Get a single trip history by ID
        getTrip: builder.query({
            query: (id) => `/trip-history`,
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
    useUpdayeTripPaymentMutation,
    useGetTripsQuery,
    useGetDownloadExelFormatAllTripHistoriesQuery,
    useGetTripQuery,
    useUpdateTripMutation,
    useDeleteTripMutation,
} = tripHistoryApi;
// useGetTripsQuery