import React from 'react';
import { FaTruck, FaClock, FaTachometerAlt, FaTruckMoving } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useGetTripsQuery } from '../../../../services/trip_history.service';
import TripCardSkeleton from '../../../../components/Skeletons/TripCardSkeleton';
import TripsHistory, { calculateEstimatedTime, calculateProgress } from './TripHistory';

export default function RunningStatus() {
    // const currentLorryRunningStatus = [
    //     {
    //         from: "Pune",
    //         to: "Indore",
    //         speed: 60, // speed in km/h
    //         leaveTime: "2024-10-12T08:30:00Z", // ISO string for date and time
    //         totalDistance: 600, // in km
    //         lorryNumber: "MH G02 1912 ",
    //         eta: "2024-10-13T18:00:00Z" // ISO string for ETA
    //     },
    //     {
    //         from: "Mumbai",
    //         to: "Delhi",
    //         speed: 80,
    //         leaveTime: "2024-09-01T07:00:00Z",
    //         totalDistance: 1450,
    //         lorryNumber: "MH G02 1912 ",
    //         eta: "2024-09-02T10:00:00Z"
    //     },
    //     {
    //         from: "Bangalore",
    //         to: "Hyderabad",
    //         speed: 55,
    //         leaveTime: "2024-09-01T06:00:00Z",
    //         totalDistance: 570,
    //         lorryNumber: "MH G02 1912 ",
    //         eta: "2024-09-01T12:00:00Z"
    //     },
    //     {
    //         from: "Chennai",
    //         to: "Kolkata",
    //         speed: 70,
    //         leaveTime: "2024-09-01T05:30:00Z",
    //         totalDistance: 1670,
    //         lorryNumber: "MH G02 1912 ",
    //         eta: "2024-09-02T14:00:00Z"
    //     }
    // ];

    // const calculateProgress = (status) => {
    //     const now = new Date();
    //     const leaveTime = new Date(status.leaveTime);
    //     const eta = new Date(status.eta);
    //     const totalTime = eta - leaveTime; // Total time for the journey in milliseconds
    //     const elapsedTime = now - leaveTime; // Elapsed time in milliseconds
    //     // Calculate progress percentage
    //     const progress = (elapsedTime / totalTime) * 100;
    //     // Ensure progress is between 0% and 100%
    //     return Math.min(Math.max(progress, 0), 100);
    // };


    const { data: LorryRunningStatus, isLoading, error, refetch } = useGetTripsQuery();

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

    return (
        <div className="col-span-12   xl:col-span-8 bg-white dark:bg-black dark:text-white rounded-t-xl p-2 shadow-md ">
            <div className=' flex justify-between'>
                <h2 className="text-2xl font-semibold mb-5">Running Status</h2>
                <Link to={'/dashboard/trips'} className=' text-primary font-bold '>View All</Link>
            </div>

            <TripsHistory trips={LorryRunningStatus} />

        </div>
    );
}

// {/* <div className='max-h-[50vh] overflow-auto'>
//                 {LorryRunningStatus.map((status, index) => {
//                     const {
//                         Party_contact,
//                         Party_name,
//                         advance,
//                         balance,
//                         createdAt,
//                         cumition,
//                         distance_km,
//                         driver_contact,
//                         driver_name,
//                         freigth,
//                         load_goods,
//                         load_weigth,
//                         loading_city,
//                         speed_per_hr,
//                         trip_id,
//                         unloading_city,
//                         updatedAt,
//                         user_id,
//                         vehicale_number,
//                     } = status;


//                     const progress = calculateProgress(status);
//                     const estimatedTime = calculateEstimatedTime(status);
//                     return (
//                         <div key={index} className="mb-4 p-4 bg-gray-100 border border-dashed dark:bg-gray-800 rounded-lg shadow-sm">
//                             <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
//                                 <div className="flex items-center space-x-3">
//                                     <FaTruck className="text-blue-600 dark:text-blue-400" size={25} />
//                                     <div>
//                                         <h5 className="text-lg font-semibold  ">{status.loading_city.cityName} to {status.unloading_city.cityName} <small className=' text-[10px]'>{status.vehicale_number}</small> </h5>
//                                         <p className="text-gray-600 dark:text-gray-400 text-sm">
//                                             Leave Time: {new Date(status.createdAt).toLocaleString()}
//                                         </p>
//                                     </div>
//                                 </div>
//                                 <div className="text-left md:text-right">
//                                     <p className="text-sm text-gray-600 dark:text-gray-400">
//                                         <FaTachometerAlt className="inline-block text-green-600 dark:text-green-400 mr-1" />
//                                         {status.speed_per_hr} km/h
//                                     </p>
//                                     <p className="text-sm text-gray-600 dark:text-gray-400">
//                                         <FaClock className="inline-block text-yellow-600 dark:text-yellow-400 mr-1" />
//                                         <p className="text-[8px] text-slate-600">{estimatedTime}</p>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className="mt-4 relative">
//                                 <div className="relative w-full h-2 rounded-full bg-slate-600 dark:bg-slate-400">
//                                     {/* Progress bar */}
//                                     <div
//                                         className={`absolute top-0 h-full rounded-full ${progress >= 100 ? 'bg-green-600 dark:bg-green-400' : 'bg-blue-600 dark:bg-blue-400'}`}
//                                         style={{ width: `${progress}%` }}
//                                     />
//                                     {/* Truck icon */}
//                                     <FaTruckMoving
//                                         className={`absolute top-0 transform -translate-y-1/2 -translate-x-1/2 text-green-600 dark:text-green-400}`}
//                                         style={{ left: `${progress}%`, top: '0%' }}
//                                         size={20}
//                                     />
//                                 </div>
//                                 <p className="text-sm text-gray-600 dark:text-gray-400 text-right mt-1">
//                                     {progress.toFixed(2)}% Completed
//                                 </p>
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div> */}
