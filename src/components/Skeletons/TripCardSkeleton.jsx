import React from 'react';
import { FaTruckMoving, FaUserCircle } from 'react-icons/fa';
import { FaTruckArrowRight } from 'react-icons/fa6';
import { PiSteeringWheelFill } from 'react-icons/pi';

const TripCardSkeleton = () => {
    return (
        <div

            className={` mx-auto w-full sm:max-w-[23rem]  bg-white shadow-md rounded-lg p-4 my-2 transition-all duration-700 ease-in-out  max-h-[150px] overflow-hidden
                }`}
        >
            {/* Header Section */}
            <div className="flex w-full justify-between items-center">
                <div className="text-blue-600    font-bold text-sm flex items-center gap-2">
                    <FaUserCircle className=' text-slate-200' size={20} />
                    <span className='bg-slate-200 w-30 h-4 animate-pulse rounded-3xl'></span>
                </div>
                <div className="bg-slate-200 w-30 h-4 animate-pulse rounded-3xl">

                </div>
            </div>

            {/* Route Information */}
            <div className="flex h-10 justify-between text-black-2 items-center ">
                <div className="text-gray-700  leading-none font-semibold">
                    <p className='animate-pulse w-25 h-2 bg-slate-200 rounded-3xl'></p>
                    {/* <p className="text-[10px] text-slate-600">{new Date(createdAt).toLocaleDateString()}</p> */}
                </div>

                <div className="flex items-center">
                    <span className="w-10 border-[0.5px] border-dashed border-slate-200"></span>
                    <div className="text-center rounded-full border border-slate-200 p-1 text-gray-500">
                        <FaTruckArrowRight className='animate-pulse  text-slate-200 rounded-3xl' />
                    </div>
                    <span className="w-10 border-[0.5px] border-dashed border-slate-200"></span>
                </div>
                <div className="text-gray-700 leading-none font-semibold">
                    <p className='animate-pulse w-25 h-2 bg-slate-200 rounded-3xl'></p>
                    {/* <p className="text-[10px] text-slate-600">{estimatedTime}</p> */}
                </div>
            </div>



            <div className="relative w-full   h-[2px] rounded-full animate-pulse bg-slate-200 dark:bg-slate-200">
                {/* Progress bar */}
                {/* <div
                    className={`absolute top-0 h-[2px] rounded-full ${progress >= 100 ? 'bg-green-600 dark:bg-green-400' : 'bg-blue-600 dark:bg-blue-400'}`}
                    style={{ width: `${progress}%` }}
                /> */}
                <FaTruckMoving
                    className={`absolute top-0 transform -translate-y-1/2 -translate-x-1/2 text-slate-200 dark:text-green-400}`}
                    // style={{ left: `${progress}%`, top: '0%' }}
                    size={20}
                />

            </div>




        </div>
    );
};

export default TripCardSkeleton;
