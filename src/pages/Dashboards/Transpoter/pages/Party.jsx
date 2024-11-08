import React, { useEffect, useState } from 'react'
import RunningStatus from './RunningSatatus'
import TripsHistory from './TripHistory'
import { useGetDownloadExelFormatAllTripHistoriesQuery, useGetTripsQuery } from '../../../../services/trip_history.service';
import TripCardSkeleton from '../../../../components/Skeletons/TripCardSkeleton';
import { IoMdAdd } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../../../../util/config';
import { getToken } from '../../../../util/localStorage';

import DownloadButton from '../../../../util/ExcelAndPdfDown';
import { useGetPartyQuery } from '../../../../services/party.services';


export default function Party() {
    const [format, setFormat] = useState(null)
    const [isDownloading, setDownloading] = useState(false)

    const { data: parties, isLoading, error, refetch } = useGetPartyQuery();
    console.log("parties", parties)



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
            <div className='flex justify-between  shadow-md col-span-12 xl:col-span-8 dark:bg-black dark:text-white rounded-t-xl p-2'>
                {/* <h2 className="text-2xl font-semibold mb-5">Trips History</h2> */}


                {/* <div className="p-4 max-w-md mx-auto"> */}
                {/* <h1 className="text-xl font-semibold mb-4">Download Trip History</h1> */}
                <div className="flex flex-wrap sm:flex-row gap-2 mt-4 justify-center">
                    <DownloadButton
                        fileType="excel"
                        endpoint={`${API_BASE_URL}/trips/downloadExelFormatAllTripHistories/excel`}
                        buttonLabel="Download as Excel"
                    />
                    <DownloadButton
                        fileType="pdf"
                        endpoint={`${API_BASE_URL}/trips/downloadExelFormatAllTripHistories/pdf`}
                        buttonLabel="Download as PDF"
                    />
                    <Link to={'/dashboard/creat-party'} type="button" className="flex items-center justify-center bg-green-500 text-white px-4  rounded-md transition-transform duration-150 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-gre-400 focus:ring-offset-2 transform hover:scale-105 active:scale-95">
                        <IoMdAdd />
                        <span className="text-sm sm:text-base"> Add Trip</span>
                    </Link>
                </div>
                {/* </div> */}
            </div>
            {/* <div className=' w-full flex justify-start items-center flex-wrap m-0 p-0'> */}
            <PartyCard parties={parties} />
            {/* </div> */}
        </div>
    )
}

import { FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const PartyCard = ({ parties }) => {
    return (
        <div className="flex flex-wrap gap-6 justify-center">
            {parties.map((party, index) => {
                const { logo, address, contact, name, city } = party;
                return (
                    <div
                        key={index}
                        className=" w-full sm:max-w-xs bg-gradient-to-b from-yellow-200 to-yellow-500 shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
                    >
                        {/* Header with Logo and Name */}
                        <div className="flex items-center p-4 bg-yellow-300">
                            {logo ? (
                                <img
                                    src={logo}
                                    alt={`${name} logo`}
                                    className="w-16 h-16 object-cover rounded-full shadow-lg border-2 border-white mr-4"
                                />
                            ) : (
                                <div className="w-16 h-16 bg-gray-200 rounded-full mr-4" />
                            )}
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">{name}</h3>
                                <p className="text-sm font-medium text-gray-600">{city.cityName}, {city.stateShortName}</p>
                            </div>
                        </div>

                        {/* Contact and Address Details */}
                        <div className="p-4 bg-white">
                            <div className="flex items-center text-gray-700 mb-2">
                                <FaPhone className="text-green-500 mr-2" />
                                <p className="font-semibold">Contact: <span className="font-normal">{contact}</span></p>
                            </div>
                            <div className="flex items-start text-gray-700">
                                <FaMapMarkerAlt className="text-red-500 mr-2 mt-1" />
                                <p className="font-semibold">Address: <span className="font-normal">{address}</span></p>
                            </div>
                        </div>

                        {/* Footer with CTA Button */}
                        <div className="p-4 bg-yellow-400 text-center">
                            <button
                                className="px-4 py-2 text-sm font-semibold text-yellow-900 bg-yellow-100 rounded-lg hover:bg-yellow-200 transition duration-200"
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};



