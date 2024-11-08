// src/features/tripHistory/tripHistoryApi.js

import { baseApi } from './baseApi'; // Ensure this path is correct based on your project structure

export const pancesHistoryApi = baseApi.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // Get all plan histories
        getPlanHistories: builder.query({
            query: () => `/plance/getYourPlance-history/`, // Include id if it's part of the endpoint
            providesTags: ['planHistory'],
            refetchOnReconnect: true,    // Retry on reconnect
            refetchOnFocus: true,        // Retry when the component regains focus
            // keepUnusedDataFor: 60,       // Keep data for 60 seconds before refetching
        })
    }),

});

export const {
    useGetPlanHistoriesQuery, // Corrected export name
} = pancesHistoryApi;




// Export hooks for usage in functional components
// export const {
//     useCreateTripMutation,
//     useGetPlanceQuery,
//     useGetTripQuery,
//     useUpdateTripMutation,
//     useDeleteTripMutation,
// } = tripHistoryApi;
// useGetTripsQuery