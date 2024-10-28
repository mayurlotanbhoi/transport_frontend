import React, { useState } from 'react';
import { FaTruck, FaClock, FaTachometerAlt, FaTruckMoving, FaUserCircle } from 'react-icons/fa';
import { FaTruckArrowRight, FaUser } from 'react-icons/fa6';
import { IoMdAdd } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { PiSteeringWheelFill } from "react-icons/pi";

// const calculateProgress = (status) => {
//     const now = new Date();
//     const leaveTime = new Date(status.createdAt    );
//     const eta = new Date(status.eta);

//     const totalTime = eta - leaveTime; // Total time for the journey in milliseconds
//     const elapsedTime = now - leaveTime; // Elapsed time in milliseconds

//     // Calculate progress percentage
//     const progress = (elapsedTime / totalTime) * 100;

//     // Ensure progress is between 0% and 100%
//     return Math.min(Math.max(progress, 0), 100);
// };

// const calculateEstimatedTime = (status) => {
//     // Calculate estimated time based on totalDistance and speed
//     const hours = status.totalDistance / status.speed;
//     const minutes = (hours - Math.floor(hours)) * 60;
//     return `${Math.floor(hours)} hours and ${Math.floor(minutes)} minutes`;
// };


const calculateProgress = (status) => {
    const now = new Date();
    const leaveTime = new Date(status.createdAt);

    // Calculate the estimated arrival time (eta) based on distance and speed
    const hours = status.distance_km / status.speed_per_hr;
    const eta = new Date(leaveTime.getTime() + hours * 60 * 60 * 1000);

    const totalTime = eta - leaveTime; // Total time for the journey in milliseconds
    const elapsedTime = now - leaveTime; // Elapsed time in milliseconds

    // Calculate progress percentage
    const progress = (elapsedTime / totalTime) * 100;

    // Ensure progress is between 0% and 100%
    return Math.min(Math.max(progress, 0), 100);
};

const calculateEstimatedTime = (status) => {
    // Calculate estimated time based on total distance and speed
    const hours = status.distance_km / status.speed_per_hr;
    const wholeHours = Math.floor(hours);
    const minutes = Math.floor((hours - wholeHours) * 60);

    return `${wholeHours} HR/${minutes} M`;
};

// Usage example
// const status = {
//     createdAt: "2024-10-18T07:31:03.575Z",
//     distance_km: 500,
//     speed_per_hr: 60,
//     // other fields...
// };

// console.log("Progress:", calculateProgress(status), "%");
// console.log("Estimated Time:", calculateEstimatedTime(status));

export default function TripsHistory({ trips }) {

    console.log("trips", trips)

    const [expanded, setExpanded] = useState(null); // To track the expanded state of each card

    const currentLorryRunningStatus = [
        {
            from: "Pune",
            to: "Indore",
            speed: 60, // speed in km/h
            leaveTime: "2024-10-26T08:30:00Z", // ISO string for date and time
            totalDistance: 600, // in km
            lorryNumber: "MH G02 1912 ",
            eta: "2024-10-27T18:00:00Z" // ISO string for ETA
        },
        {
            from: "Mumbai",
            to: "Delhi",
            speed: 80,
            leaveTime: "2024-09-01T07:00:00Z",
            totalDistance: 1450,
            lorryNumber: "MH G02 1912 ",
            eta: "2024-09-02T10:00:00Z"
        },
        {
            from: "Bangalore",
            to: "Hyderabad",
            speed: 55,
            leaveTime: "2024-09-01T06:00:00Z",
            totalDistance: 570,
            lorryNumber: "MH G02 1912 ",
            eta: "2024-09-01T12:00:00Z"
        },
        {
            from: "Chennai",
            to: "Kolkata",
            speed: 70,
            leaveTime: "2024-09-01T05:30:00Z",
            totalDistance: 1670,
            lorryNumber: "MH G02 1912 ",
            eta: "2024-09-02T14:00:00Z"
        }
    ];

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

    // const calculateEstimatedTime = (status) => {
    //     // Calculate estimated time based on totalDistance and speed
    //     const hours = status.totalDistance / status.speed;
    //     const minutes = (hours - Math.floor(hours)) * 60;
    //     return `${Math.floor(hours)} hours and ${Math.floor(minutes)} minutes`;
    // };

    return (
        <div className="col-span-12 xl:col-span-8 dark:bg-black dark:text-white rounded-t-xl ">


            <div className=' w-full flex flex-wrap justify-start gap-2 '>
                {trips.map((status, index) => {
                    {/* const progress = calculateProgress(status);
                    const estimatedTime = calculateEstimatedTime(status); */}
                    const isExpanded = expanded === index; // Track which card is expanded

                    return (
                        <div className=' w-full sm:max-w-[20rem]' key={index}>
                            <TripCard isExpanded={isExpanded} index={index} setExpanded={setExpanded} LorryRunningStatus={status} />
                        </div>

                    );
                })}
            </div>
        </div>

    );
}



// import { FaTruckArrowRight } from 'react-icons/fa';

const TripCard = ({ isExpanded, setExpanded, index, LorryRunningStatus }) => {
    const {

        Party_contact,
        Party_name,
        advance,
        balance,
        createdAt,
        cumition,
        distance_km,
        driver_contact,
        driver_name,
        freigth,
        load_goods,
        load_weigth,
        loading_city,
        speed_per_hr,
        trip_id,
        unloading_city,
        updatedAt,
        user_id,
        vehicale_number,
    } = LorryRunningStatus;


    const progress = calculateProgress(LorryRunningStatus);
    const estimatedTime = calculateEstimatedTime(LorryRunningStatus);
    // const isExpanded = expanded === index; // Track which card is expanded


    return (
        <div
            key={index}
            className={`w-full mx-auto bg-white shadow-md rounded-lg p-4 my-2 transition-all duration-700 ease-in-out ${isExpanded ? 'max-h-[1000px]' : 'max-h-[160px] overflow-hidden'
                }`}
        >
            {/* Header Section */}
            <div className="flex justify-between items-center">
                <div className="text-blue-600 font-bold text-sm flex items-center gap-2"> <FaUserCircle className=' text-black' size={20} />{Party_name}</div>
                <div className="text-black bg-slate-100 rounded-xl px-4  font-semibold">₹{freigth}</div>
            </div>

            {/* Route Information */}
            <div className="flex h-10 justify-between text-black-2 items-center ">
                <div className="text-gray-700 leading-none font-semibold">
                    <p>{loading_city.cityName}</p>
                    <p className="text-[8px] text-slate-600">{new Date(createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center">
                    <span className="w-10 border-[0.5px] border-dashed border-blue-600"></span>
                    <div className="text-center rounded-full border p-1 text-gray-500">
                        <FaTruckArrowRight />
                    </div>
                    <span className="w-10 border-[0.5px] border-dashed border-blue-600"></span>
                </div>
                <div className="text-gray-700 leading-none font-semibold">
                    <p>{unloading_city.cityName}</p>
                    <p className="text-[8px] text-slate-600">{estimatedTime}</p>
                </div>
            </div>

            <div className="text-[10px]   text-gray-500 w-full flex text-center items-center justify-center gap-2 text-black">
                <p>{vehicale_number}</p>
                <p className=' font-bold flex items-center justify-center gap-1'>
                    <PiSteeringWheelFill className=' font-bold' size={15} />{driver_name}</p>
            </div>

            <div className="relative w-full  h-[2px] rounded-full bg-slate-600 dark:bg-slate-400">
                {/* Progress bar */}
                <div
                    className={`absolute top-0 h-[2px] rounded-full ${progress >= 100 ? 'bg-green-600 dark:bg-green-400' : 'bg-blue-600 dark:bg-blue-400'}`}
                    style={{ width: `${progress}%` }}
                />
                <FaTruckMoving
                    className={`absolute top-0 transform -translate-y-1/2 -translate-x-1/2 text-green-600 dark:text-green-400}`}
                    style={{ left: `${progress}%`, top: '0%' }}
                    size={20}
                />
                <p className="text-sm text-gray-600 dark:text-gray-400 text-right mt-1">
                    {progress.toFixed(2)}% Completed
                </p>
            </div>

            {isExpanded && (
                <>
                    {/* Action Buttons */}
                    <div className="flex justify-between items-center mt-6">
                        <button className="bg-white border border-green-600 text-green-600 px-4 py-2 rounded-md">
                            Complete Trip
                        </button>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md">View Bill</button>
                    </div>

                    {/* Freight Details */}
                    <div className="mt-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700 font-semibold">Freight Amount</span>
                            <div className="flex items-center">
                                <span className="text-gray-700 font-semibold">₹{freigth}</span>
                            </div>
                        </div>

                        {/* Freight Adjustments */}
                        <div className="mt-2 text-sm">
                            <div className="flex justify-between text-gray-500">
                                <span>(-) Advance</span>
                                <span>₹{advance}</span>
                            </div>
                            <div className="flex justify-between mt-2 text-gray-500">
                                <span>(+) cumition</span>
                                <span>₹{cumition}</span>
                            </div>
                            <div className="flex justify-between mt-2 text-gray-500">
                                <span>(-) Payments</span>
                                <span>₹0</span>
                            </div>
                        </div>
                    </div>

                    {/* Pending Balance */}
                    <div className="mt-4 border-t pt-4 border-dashed border-blue-600">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700 font-semibold">Pending Balance</span>
                            <span className="text-gray-700 font-semibold">₹{balance}</span>
                        </div>

                        {/* Note and Request Money */}
                        <div className="flex justify-end items-center mt-4">
                            {/* <div className="flex items-center text-blue-600 cursor-pointer">
                                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                                <span>Note</span>
                            </div> */}
                            <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md">Request Money</button>
                        </div>
                    </div>
                </>
            )}

            {/* See More / See Less */}
            <div
                onClick={() => setExpanded(isExpanded ? null : index)}
                className="mt-4 text-blue-600 text-sm text-center cursor-pointer"
            >
                <small>{isExpanded ? 'See Less' : 'See More'}</small>
            </div>
        </div>
    );
};

// export default TripCard;


export { TripCard };


{/* <div key={index} className={`bg-white h-full  mb-4  bg-gray-100 border border-dashed dark:bg-gray-800 rounded-lg shadow-sm transition-all duration-1000 ${isExpanded ? 'h-auto' : 'h-[200px] sm:h-[150px] overflow-hidden'}`}>

                            <div className={` px-3 pt-3  `}>
                                <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
                                    <div className="flex items-center space-x-3">
                                        <FaTruck className="text-blue-600 dark:text-blue-400" size={25} />
                                        <div className=' leading-none'>
                                            <h5 className="text-lg font-semibold">{status.from} to {status.to} </h5>
                                            <small className='text-[10px]'>{status.lorryNumber}</small>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                                Leave Time: {new Date(status.leaveTime).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-left md:text-right">
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            <FaTachometerAlt className="inline-block text-green-600 dark:text-green-400 mr-1" />
                                            {status.speed} km/h
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            <FaClock className="inline-block text-yellow-600 dark:text-yellow-400 mr-1" />
                                            ETA: {new Date(status.eta).toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 relative">
                                    <div className="relative w-full h-1 rounded-full bg-slate-600 dark:bg-slate-400">
                                        Progress bar
                                        <div
                                            className={`absolute top-0 h-full rounded-full ${progress >= 100 ? 'bg-green-600 dark:bg-green-400' : 'bg-blue-600 dark:bg-blue-400'}`}
                                            style={{ width: `${progress}%` }}
                                        />
                                        <FaTruckMoving
                                            className={`absolute top-0 transform -translate-y-1/2 -translate-x-1/2 text-green-600 dark:text-green-400}`}
                                            style={{ left: `${progress}%`, top: '0%' }}
                                            size={20}
                                        />
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 text-right mt-1">
                                        {progress.toFixed(2)}% Completed
                                    </p>
                                </div>
                            </div>
                            {isExpanded && (
                                <div className=" w-full bg-red-500 rounded-xl">
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                        <strong>Estimated Time: </strong> {estimatedTime}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                        <strong>Total Distance: </strong> {status.totalDistance} km
                                    </p>
                                </div>
                            )}
                            <div className=' grid grid-cols-6 items-center'>
                                <span className=' w-full  col-span-2 border-[0.5px] border-dashed border-blue-600'></span>

                                <button
                                    className=" col-span-2 text-blue-500 dark:text-blue-400 focus:outline-none"
                                    onClick={() => setExpanded(isExpanded ? null : index)}
                                >
                                    <small>{isExpanded ? 'See Less' : 'See More'}</small>
                                </button>
                                <span className='w-full  col-span-2 border-[0.5px] border-dashed border-blue-600'></span>
                            </div>
                        </div> */}

