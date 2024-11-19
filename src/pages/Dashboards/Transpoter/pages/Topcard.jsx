import React from 'react'
import { FaTruck, FaTruckMoving } from 'react-icons/fa'
import { FaIndianRupeeSign, FaPersonRunning } from "react-icons/fa6";
import { MdEmojiTransportation } from 'react-icons/md';
import { calculateProgress } from './TripHistory';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetTripsQuery } from '../../../../services/trip_history.service';

const Topcard = ({ partiess, vehicles }) => {
    const { logo = "", company_name = "", owner_name = "" } = useSelector((state) => state?.auth?.user || {});  // const { logo, company_name, owner_name } = user
    const { data: trips, isLoading, error, refetch } = useGetTripsQuery();

    const Earnings = trips && trips.length > 0
        ? trips.reduce((total, trip) => total + (trip?.freigth || 0), 0)
        : 0;

    const runningVehicles = vehicles && vehicles.length > 0
        ? vehicles.reduce((total, vehicle) => {
            console.log(vehicle?.trip_start_date, vehicle?.speed_per_hr, vehicle?.distance_km)
            const progress = calculateProgress(vehicle?.trip_start_date, vehicle?.speed_per_hr, vehicle?.distance_km);
            return progress.toFixed(2) < 100 ? total + 1 : total;
        }, 0)
        : 0;
    // console.log("vehicles", vehicles)
    // const runningVehicales = vehicles.filter((vehicle) => { console.log("(vehicle?.trip_start_date, vehicle?.speed_per_hr, vehicle?.distance_km)", calculateProgress(vehicle?.trip_start_date, vehicle?.speed_per_hr, vehicle?.distance_km)); return (calculateProgress(vehicle?.trip_start_date, vehicle?.speed_per_hr, vehicle?.distance_km) < 100) })

    return (
        <>
            <div className=' col-span-12 xl:col-span-8   dark:bg-black dark:text-white rounded-xl     shadow-md overflow-hidden'>
                <div className='w-full  flex flex-col   gap-4'>
                    <div className="   flex gap-4 px-2 justify-between">
                        {[
                            {
                                icon: <FaPersonRunning />,
                                count: runningVehicles || 0,
                                label: "Running",
                            },
                            {
                                icon: <FaTruckMoving />,
                                count: vehicles?.length || 0,
                                label: "Vehicles",
                            },
                            {
                                icon: <MdEmojiTransportation />,
                                count: partiess || 0,
                                label: "Parties",
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center bg-white w-40 px-4 py-1 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                <figure className="text-xl font-bold text-black flex items-center gap-2">
                                    {item.icon} {item.count}
                                </figure>
                                <small className="text-gray-600 text-base font-satoshi ">{item.label}</small>
                            </div>

                        ))}

                    </div>
                    <div className='flex  primary-color  items-center gap-4 my-2 px-4 py-2  rounded-lg bg-white'>
                        <div className=' w-full  flex justify-between items-center'>
                            <FaTruck size={30} />
                            <h1>Yout Transport Code</h1>
                            <figure>TRA7845</figure>
                        </div>
                    </div>
                </div>

                <div>
                    <h1 className='  rounded-t-lg flex items-center font-bold text-xl bg-white px-4 py-2'>  <FaIndianRupeeSign size={22} /> <p>{Earnings} <small className='text-sm text-clip'>Total Earnings</small></p>  </h1>
                    <span className='  flex   border border-dashed '></span>
                    <Link
                        className="flex   items-center gap-4 px-4 py-2  rounded-lg  clip-innerRounded bg-white"
                        to="#"
                    >

                        <span className="h-12 w-12 rounded-full ">
                            <img className="h-12 w-12 rounded-full" src={logo} alt="User" />
                        </span>
                        <span>
                            <span className="block text-xl font-medium text-black dark:text-white">
                                {company_name}
                            </span>
                            <span className="block text-xs">{owner_name}</span>
                        </span>
                    </Link>
                </div>

            </div>

            {/* <div className='col-span-12 xl:col-span-8 primary-color rounded-t-xl p-5    shadow-md overflow-hidden'>
                <div className=' w-full flex justify-between items-center'>
                    <FaTruck size={30} />
                    <figure>TRA7845</figure>
                </div>

                <div className='mt-2 w-full flex justify-between items-center'>
                    <div className=' flex items-center flex-col'>
                        <figure className=' font-extrabold text-2xl'>
                            {runningVehicales?.length}
                        </figure>
                        <div className='flex justify-between items-center'>
                            <FaPersonRunning />
                            <small className='text-[15px]'>Runing..</small>
                        </div>

                    </div>

                    <div className=' flex items-center flex-col'>
                        <figure className=' font-extrabold text-2xl'>
                            {vehicles?.length}
                        </figure>
                        <div className='flex justify-between items-center'>
                            <FaTruckMoving />
                            <small className='text-[15px]'>Vehicals..</small>
                        </div>

                    </div>
                    <div className=' flex items-center flex-col'>
                        <figure className=' font-extrabold text-2xl'>
                            {partiess}
                        </figure>
                        <div className='flex justify-between items-center'>
                            <MdEmojiTransportation />
                            <small className='text-[15px]'>Parties..</small>
                        </div>

                    </div>

                </div>


            </div> */}

        </>
    )
}

export default Topcard
