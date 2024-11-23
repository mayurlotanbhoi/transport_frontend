import { setOnlyUseData } from '../redux/auth/authSlice';
import { setVehicles } from '../redux/vehicle/vehicleSlice';
import { baseApi } from './baseApi';

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateLogo: builder.mutation({
            query: (data) => ({
                url: '/user/update-logo', // Corrected spelling of 'vehicle'
                method: 'PATCH',
                body: data,
            }),

            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const isupdate = await queryFulfilled;
                    console.log("isupdate", isupdate)
                    if (isupdate?.data?.statusCode && isupdate?.data?.success) {
                        dispatch(setOnlyUseData({ user: isupdate?.data?.data }))
                    }
                    // Perform logout cleanup actions, e.g., dispatch(logOut())
                } catch (error) {
                    console.error('Logout failed:', error);
                    // Handle errors gracefully
                }
            },
            // invalidatesTags: ['user'],
        }),

        updateAvatar: builder.mutation({
            query: (data) => ({
                url: '/user/update-avatar', // Corrected spelling of 'vehicle'
                method: 'PATCH',
                body: data,
            }),

            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const isupdate = await queryFulfilled;
                    console.log("isupdate", isupdate)
                    if (isupdate?.data?.statusCode && isupdate?.data?.success) {
                        dispatch(setOnlyUseData({ user: isupdate?.data?.data }))
                    }
                    // Perform logout cleanup actions, e.g., dispatch(logOut())
                } catch (error) {
                    console.error('Logout failed:', error);
                    // Handle errors gracefully
                }
            },
            // invalidatesTags: ['user'],
        }),


        updateUserInfo: builder.mutation({
            query: (data) => ({
                url: '/user/update-user-info', // Corrected spelling of 'vehicle'
                method: 'PUT',
                body: data,
            }),

            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const isupdate = await queryFulfilled;
                    console.log("isupdate", isupdate)
                    if (isupdate?.data?.statusCode && isupdate?.data?.success) {
                        dispatch(setOnlyUseData({ user: isupdate?.data?.data }))
                    }
                    // Perform logout cleanup actions, e.g., dispatch(logOut())
                } catch (error) {
                    console.error('update User Info fail:', error);
                    // Handle errors gracefully
                }
            },
            // invalidatesTags: ['user'],
        }),


        // Register vehicle mutation
        // registerVehicle: builder.mutation({
        //     query: (data) => ({
        //         url: '/vehicale/register-vehicle', // Corrected spelling of 'vehicle'
        //         method: 'POST',
        //         body: data,
        //     }),
        //     invalidatesTags: ['vehicle'],
        // }),

        // Get all vehicle histories
        // getVehicles: builder.query({
        //     query: () => '/vehicale/get-all-vehicle',
        //     providesTags: ['vehicle'],
        //     refetchOnReconnect: true,    // Retry on reconnect
        //     refetchOnFocus: true,
        //     keepUnusedDataFor: 60,       // Keep data for 60 seconds before refetching
        //     retry: 3,
        //     // Use onQueryStarted to dispatch data to the Redux store
        //     async onQueryStarted(args, { dispatch, queryFulfilled }) {
        //         try {
        //             const { data } = await queryFulfilled; // Wait for the query to resolve
        //             dispatch(setVehicles(data?.data)); // Dispatch action to set vehicle data in Redux store
        //         } catch (error) {
        //             console.error('Error fetching vehicles:', error);
        //         }
        //     },
        // }),
    }),
});

export const { useUpdateLogoMutation, useUpdateAvatarMutation, useUpdateUserInfoMutation } = userApi;
