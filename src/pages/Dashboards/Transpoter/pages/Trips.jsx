import React, { useEffect } from 'react'
import RunningStatus from './RunningSatatus'
import TripsHistory from './TripHistory'
import { useGetTripsQuery } from '../../../../services/trip_history.service';
import TripCardSkeleton from '../../../../components/Skeletons/TripCardSkeleton';
import { IoMdAdd } from 'react-icons/io';
import { Link } from 'react-router-dom';

export default function Trips() {

    const { data: trips, isLoading, error, refetch } = useGetTripsQuery(1);

    // Retry fetching on mount if there is an error
    // useEffect(() => {
    //     if (error) {
    //         const retryInterval = setInterval(() => {
    //             refetch();
    //         }, 5000); // Retry every 5 seconds

    //         return () => clearInterval(retryInterval); // Clean up the interval on unmount
    //     }
    // }, [error, refetch]);


    if (isLoading) {
        return (
            <div className=' w-full flex justify-start flex-wrap'>
                {new Array(10).fill(null).map((_, index) => (
                    <TripCardSkeleton key={index} />
                ))}
            </div>
        );
    }
    if (error) return <p>Error fetching trips: {error.message}</p>;

    // console.log('trips', trips)
    return (
        <div>
            <div className='flex justify-between bg-white shadow-md col-span-12 xl:col-span-8 dark:bg-black dark:text-white rounded-t-xl p-2'>
                <h2 className="text-2xl font-semibold mb-5">Trips History</h2>

                <Link to={'/dashboard/creat-trip'} type="button" className="text-white flex items-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                    <IoMdAdd size={22} />  Add Trip
                </Link>
            </div>
            {/* <div className=' w-full flex justify-start items-center flex-wrap m-0 p-0'> */}
            <TripsHistory trips={trips} />
            {/* </div> */}
        </div>
    )
}
