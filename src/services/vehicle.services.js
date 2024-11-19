import { setVehicles } from '../redux/vehicle/vehicleSlice';
import { baseApi } from './baseApi';

export const vehicleApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Register vehicle mutation
        registerVehicle: builder.mutation({
            query: (data) => ({
                url: '/vehicale/register-vehicle', // Corrected spelling of 'vehicle'
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['vehicle'],
        }),

        // Get all vehicle histories
        getVehicles: builder.query({
            query: () => '/vehicale/get-all-vehicle',
            providesTags: ['vehicle'],
            refetchOnReconnect: true,    // Retry on reconnect
            refetchOnFocus: true,
            keepUnusedDataFor: 60,       // Keep data for 60 seconds before refetching
            retry: 3,
            // Use onQueryStarted to dispatch data to the Redux store
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled; // Wait for the query to resolve
                    dispatch(setVehicles(data?.data)); // Dispatch action to set vehicle data in Redux store
                } catch (error) {
                    console.error('Error fetching vehicles:', error);
                }
            },
        }),
    }),
});

export const { useRegisterVehicleMutation, useGetVehiclesQuery } = vehicleApi;
