import React from 'react'
import LorryTable from './LorryTable'
import TripCardSkeleton from '../../../../components/Skeletons/TripCardSkeleton';
import { useGetVehiclesQuery } from '../../../../services/vehicle.services';

export default function Lorry() {
    // const { data: trips, isLoading, error, refetch } = useGetVehiclesQuery();

    // Retry fetching on mount if there is an error
    // useEffect(() => {
    //     if (error) {
    //         const retryInterval = setInterval(() => {
    //             refetch();
    //         }, 5000); // Retry every 5 seconds

    //         return () => clearInterval(retryInterval); // Clean up the interval on unmount
    //     }
    // }, [error, refetch]);


    // if (isLoading) {
    //     return (
    //         <div className=' w-full flex justify-start flex-wrap'>
    //             {new Array(10).fill(null).map((_, index) => (
    //                 <TripCardSkeleton key={index} />
    //             ))}
    //         </div>
    //     );
    // }

    // if (error) return <p>Error fetching trips: {error.message}</p>;
    return (
        <div>
            <LorryTable />
        </div>
    )
}
