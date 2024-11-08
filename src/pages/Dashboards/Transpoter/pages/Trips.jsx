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


export default function Trips() {
    const [format, setFormat] = useState(null)
    const [isDownloading, setDownloading] = useState(false)

    const { data: trips, isLoading, error, refetch } = useGetTripsQuery();


    // useEffect(() => {
    //     // Define an async function inside useEffect to handle async/await
    //     const handleDownload = async () => {
    //         const token = getToken()
    //         setDownloading(true)
    //         try {
    //             const response = await fetch(`${API_BASE_URL}/trips/downloadExelFormatAllTripHistories/${format}`, {
    //                 method: 'GET',
    //                 credentials: 'include', // Ensure cookies are senthe
    //                 headers: {
    //                     'Authorization': `Bearer ${token}`
    //                 }
    //             });
    //             if (!response.ok) {
    //                 throw new Error(`Error: ${response.statusText}`);
    //             }
    //             const blob = await response.blob();
    //             // Create a download link for the file immediately
    //             const url = window.URL.createObjectURL(blob);
    //             const link = document.createElement('a');
    //             link.href = url;
    //             link.setAttribute('download', `trip_history.${format === 'excel' ? 'xlsx' : 'pdf'}`);
    //             document.body.appendChild(link);
    //             link.click();
    //             link.remove();
    //             console.log("Download initiated successfully");
    //         } catch (error) {
    //             console.error("Error downloading file:", error);
    //         } finally {
    //             setFormat(null)
    //             setDownloading(false)
    //         }
    //     };

    //     // Call the download function only if format is defined
    //     if (format) {
    //         handleDownload();
    //     }
    // }, [format]); // Dependency array includes `format`


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
                    <Link to={'/dashboard/creat-trip'} type="button" className="flex items-center justify-center bg-green-500 text-white px-4  rounded-md transition-transform duration-150 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-gre-400 focus:ring-offset-2 transform hover:scale-105 active:scale-95">
                        <IoMdAdd />
                        <span className="text-sm sm:text-base"> Add Trip</span>
                    </Link>
                </div>
                {/* </div> */}
            </div>
            {/* <div className=' w-full flex justify-start items-center flex-wrap m-0 p-0'> */}
            <TripsHistory trips={trips} />
            {/* </div> */}
        </div>
    )
}
