// import { Package } from '../../../types/package';

import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { useSelector } from "react-redux";
import { useState } from "react";

import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';
import withReactContent from 'sweetalert2-react-content';
import { FaTruck } from "react-icons/fa";
// import TruckMoveForwordIcon from "../../images/loading/forword_move_truck.gif";
import TruckMoveForwordIcon from "../../../../images/loading/forword_move_truck.svg"
import { calculateProgress } from "./TripHistory";

const MySwal = withReactContent(Swal);

const packageData = [
    {
        name: 'Free package',
        price: 0.0,
        invoiceDate: `Jan 13,2023`,
        status: 'Paid',
    },
    {
        name: 'Standard Package',
        price: 59.0,
        invoiceDate: `Jan 13,2023`,
        status: 'Paid',
    },
    {
        name: 'Business Package',
        price: 99.0,
        invoiceDate: `Jan 13,2023`,
        status: 'Unpaid',
    },
    {
        name: 'Standard Package',
        price: 59.0,
        invoiceDate: `Jan 13,2023`,
        status: 'Pending',
    },
];

const LorryTable = () => {

    const { error, loading, vehicles } = useSelector(vehicle => vehicle.vehicle)

    console.log("vehicles", vehicles)

    return (
        <div className=" w-full rounded-sm border border-stroke   pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className=" flex justify-between items-center px-2">
                <h2 className=" font-bold mb-2 text-black dark:text-white xl:pl-11">Your Lorry's</h2>
                {/* <Link className=" bg-primary btn" to={'add-lorry'}></Link> */}
                <Link to={'/dashboard/add-lorry'} type="button" class="text-white flex items-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                    <IoMdAdd size={22} />  Add Lorry</Link>
            </div>
            <div className=" w-full  flex flex-wrap justify-between   ">
                {!(error && loading) && vehicles.map((vehicle, index) => {
                    return (
                        <div className=" w-full md:w-80    " key={index}>
                            <VehicleDetails vehicle={vehicle} />
                        </div>
                    )
                })}

                {/* <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                Package
                            </th>
                            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                Invoice date
                            </th>
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                Status
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark:text-white">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {packageData.map((packageItem, key) => (
                            <tr key={key}>
                                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                    <h5 className="font-medium text-black dark:text-white">
                                        {packageItem.name}
                                    </h5>
                                    <p className="text-sm">${packageItem.price}</p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {packageItem.invoiceDate}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p
                                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${packageItem.status === 'Paid'
                                            ? 'bg-success text-success'
                                            : packageItem.status === 'Unpaid'
                                                ? 'bg-danger text-danger'
                                                : 'bg-warning text-warning'
                                            }`}
                                    >
                                        {packageItem.status}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <div className="flex items-center space-x-3.5">
                                        <button className="hover:text-primary">
                                            <svg
                                                className="fill-current"
                                                width="18"
                                                height="18"
                                                viewBox="0 0 18 18"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                                                    fill=""
                                                />
                                                <path
                                                    d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                                                    fill=""
                                                />
                                            </svg>
                                        </button>
                                        <button className="hover:text-primary">
                                            <svg
                                                className="fill-current"
                                                width="18"
                                                height="18"
                                                viewBox="0 0 18 18"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                                                    fill=""
                                                />
                                                <path
                                                    d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                                                    fill=""
                                                />
                                                <path
                                                    d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                                                    fill=""
                                                />
                                                <path
                                                    d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                                                    fill=""
                                                />
                                            </svg>
                                        </button>
                                        <button className="hover:text-primary">
                                            <svg
                                                className="fill-current"
                                                width="18"
                                                height="18"
                                                viewBox="0 0 18 18"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M16.8754 11.6719C16.5379 11.6719 16.2285 11.9531 16.2285 12.3187V14.8219C16.2285 15.075 16.0316 15.2719 15.7785 15.2719H2.22227C1.96914 15.2719 1.77227 15.075 1.77227 14.8219V12.3187C1.77227 11.9812 1.49102 11.6719 1.12539 11.6719C0.759766 11.6719 0.478516 11.9531 0.478516 12.3187V14.8219C0.478516 15.7781 1.23789 16.5375 2.19414 16.5375H15.7785C16.7348 16.5375 17.4941 15.7781 17.4941 14.8219V12.3187C17.5223 11.9531 17.2129 11.6719 16.8754 11.6719Z"
                                                    fill=""
                                                />
                                                <path
                                                    d="M8.55074 12.3469C8.66324 12.4594 8.83199 12.5156 9.00074 12.5156C9.16949 12.5156 9.31012 12.4594 9.45074 12.3469L13.4726 8.43752C13.7257 8.1844 13.7257 7.79065 13.5007 7.53752C13.2476 7.2844 12.8539 7.2844 12.6007 7.5094L9.64762 10.4063V2.1094C9.64762 1.7719 9.36637 1.46252 9.00074 1.46252C8.66324 1.46252 8.35387 1.74377 8.35387 2.1094V10.4063L5.40074 7.53752C5.14762 7.2844 4.75387 7.31252 4.50074 7.53752C4.24762 7.79065 4.27574 8.1844 4.50074 8.43752L8.55074 12.3469Z"
                                                    fill=""
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table> */}
            </div>
        </div>
    );
};

export default LorryTable;
// import React, { useState } from 'react';

const VehicleDetails = ({ vehicle }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [running, setrunning] = useState(false);
    const [truckDetails, setTruckDetails] = useState({ city: '', routes: '' });
    const toggleExpand = () => setIsExpanded(!isExpanded);
    const { logo, company_name, owner_name: transport, city: transpoterCity, mobile_number } = useSelector((state) => state.auth.user)
    running

    // console.log("city", city)
    const {
        aadharcard_number, createdAt, fitness_expire_date, insurance_expire_date,
        insurance_photo, lorry_id, lorry_number, owner_addres, owner_city,
        owner_mobile_number, owner_name, owner_pancard_number, owner_photo,
        permit_expire_date, permit_photo, updatedAt, user_id, vehicale_capacity,
        vehicale_length, vehicale_type, trip_start_date, speed_per_hr, distance_km
    } = vehicle;

    // Function to show the input popup
    const showInputPopup = async () => {
        const { value: formValues } = await MySwal.fire({
            title: '<h2 class="text-blue-500">Enter Truck Details</h2>',
            html: `
                        <div class="m-0 p-0 text-start w-full">
                <label class="m-0 p-0 block text-black dark:text-white">
                  Available truck in city
                </label>
                <input
                id="swal-input1" 
                  type="text"
                  placeholder="Available truck in city"
                  class="  w-full m-0 p-0swal2-input rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                />
              </div>
              <div class="m-0 p-0 text-start w-full mt-4">
                <label class="m-0 p-0 block text-black dark:text-white">
                  Routes covered
                </label>
                <input
                  type="text"
                  id="swal-input2"
                  placeholder="Routes covered"
                  class="w-full m-0 p-0 swal2-input rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                />
              </div>

        
      `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: '<span class="text-white">Submit</span>',
            cancelButtonText: '<span class="text-white">Cancel</span>',
            confirmButtonColor: '#34D399', // Tailwind emerald color
            cancelButtonColor: '#F87171',  // Tailwind red color
            preConfirm: () => {
                return [
                    document.getElementById('swal-input1').value,
                    document.getElementById('swal-input2').value
                ];
            }
        });

        if (formValues && formValues[0] && formValues[1]) {
            setTruckDetails({ city: formValues[0], routes: formValues[1] });
            showDetailsPopup(formValues[0], formValues[1]);
        } else {
            MySwal.fire({
                icon: 'warning',
                title: 'Incomplete Information',
                text: 'Please enter both fields!',
                confirmButtonColor: '#F87171',
            });
        }
    };

    // <input id="swal-input1" class="swal2-input w-full" placeholder="Available truck in city">
    // <input id="swal-input2" class="swal2-input w-full" placeholder="Routes covered (e.g., City A to City B)">

    // Function to show details with a share option
    const showDetailsPopup = (city, routes) => {
        MySwal.fire({
            title: '<h2 class="text-blue-500">Truck Details</h2>',
            html: `
            <div id="shareContent" style="margin: 0; padding: 0; width: 100vw; max-width: 400px; text-align: start; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); overflow: hidden;">
                <!-- Profile Section -->
                <div class="golden-gradian" style="width: 100%; height: 60px;  padding: 8px; display: flex; align-items: center; color: #333;">
                    <div style="flex: 0 0 10%; display: flex; align-items: center; justify-content: center;">
                        <img style="width: 30px; height: 30px; max-width: 30px; border-radius: 50%;" src="${logo}" alt="Profile" />
                    </div>
                    <div style="margin-left: 12px; flex: 1;">
                        <h2 style="font-weight: 600; font-size: 1rem;">${transport}</h2>
                        <p style="font-size: 0.875rem; color: #333; display: flex; align-items: center;">
                            <svg style="width: 14px; height: 14px; margin-right: 4px; fill: #fff;" viewBox="0 0 24 24">
                                <path d="M12 2C8.1 2 5 5.1 5 9c0 4.4 4.3 9.6 6.4 11.6c.4.4 1 .4 1.4 0c2.1-2 6.4-7.2 6.4-11.6c0-3.9-3.1-7-7-7zM12 12.5c-1.9 0-3.5-1.6-3.5-3.5S10.1 5.5 12 5.5s3.5 1.6 3.5 3.5S13.9 12.5 12 12.5z"></path>
                            </svg>
                            ${transpoterCity?.cityName} ${transpoterCity?.stateShortName}
                        </p>
                    </div>
                </div>
                
                <!-- Truck Details Section -->
                <div style="padding: 8px;">
                    <h3 style="font-size: 0.875rem; color: #333;">Truck Available in <span style="color: #d97706; font-weight: bold;">${city}</span></h3>
                    <div style="margin-top: 8px;  margin-bottom: 8px; display: flex; align-items: center; background-color: #f1f5f9; padding: 8px; border-radius: 8px;">
                        <div style="flex: 0 0 15%; display: flex; align-items: center; justify-content: center;">
                            <img style="width: 100%; height: auto; max-width: 38px; border-radius: 50%;" src="https://cdn-icons-png.flaticon.com/128/713/713311.png" alt="Truck Icon" />
                        </div>
                        <div style="margin-left: 8px; flex: 1;">
                            <h4 style="font-size: 1rem; font-weight: 600; color: #2563eb;">${vehicale_capacity}, ${vehicale_type}</h4>
                            <p style="font-size: 0.875rem; color: #333;">${vehicale_length}</p>
                        </div>
                    </div>
                    <p style="font-size: 0.875rem; color: #333; margin-top: 8px;"><strong>Routes:</strong> ${routes}</p>
                </div>
    
                <!-- Contact Section -->
                <div class="golden-gradian" style="display: flex; align-items: center; justify-content: center; height: 36px; font-size: 0.875rem; color: #333; font-weight: 500;">
                    &#9743; Contact: ${mobile_number}
                </div>
            </div>
            `,
            showCancelButton: true,
            confirmButtonText: '<span style="color: #ffffff;">Share</span>',
            cancelButtonText: '<span style="color: #4b5563;">Close</span>',
            confirmButtonColor: '#34D399',
            cancelButtonColor: '#F87171',
            preConfirm: () => handleShare(),
        });
    };

    // Function to capture and share the details
    const handleShare = async () => {
        const shareContent = document.getElementById('shareContent');

        const canvas = await html2canvas(shareContent, { backgroundColor: null, useCORS: true });

        canvas.toBlob(async (blob) => {
            const file = new File([blob], 'truck_info.png', { type: 'image/png' });

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                try {
                    await navigator.share({
                        files: [file],
                        title: 'Truck Availability',
                        text: 'Check out this truck availability and route details!',
                    });
                } catch (error) {
                    console.error('Error sharing:', error);
                    MySwal.fire({
                        icon: 'error',
                        title: 'Sharing Error',
                        text: 'Unable to share the details!',
                    });
                }
            } else {
                MySwal.fire({
                    icon: 'info',
                    title: 'Sharing Not Supported',
                    text: 'Your device does not support sharing.',
                });
            }
        });
    };

    console.log("calculateProgress(trip_start_date)", calculateProgress(trip_start_date, speed_per_hr, distance_km))

    return (
        <div className="w-full relative md:max-w-md   bg-white  shadow-lg  overflow-hidden  mb-4">
            {/* Header with basic details */}
            {/* trip_start_date(pin):"2024-11-03T03:11:46.872Z"
speed_per_hr(pin):1
distance_km(pin):500 */}
            {/* <span className=" text-black rounded-bl-2xl px-4 bg-green-300">Nunning</span> */}
            {calculateProgress(trip_start_date, speed_per_hr, distance_km) < 100 && <div className=" absolute top-0  w-full flex justify-end items-center gap-2 p-2 ">
                <p className=" flex justify-center items-center w-2 h-2 rounded-full bg-green-600">
                    <p className=" w-2 h-2 rounded-full animate-ping bg-green-400">

                    </p>
                </p>
                <small className="text-black-2 font-extrabold"> On Trip</small>
            </div>}

            <div className="flex items-center px-4 py-2 text-black-2  ">


                <img src={owner_photo} alt="Owner" className="w-16 h-16 rounded-2xl mr-4" />
                <div>
                    <h2 className="text-lg font-bold text-black-2 ">{owner_name}</h2>
                    <p className="text-sm text-purple-700"> {lorry_number}</p>
                    <p className="text-sm"> {vehicale_type} + {vehicale_length} + {vehicale_capacity}</p>
                </div>
            </div>

            {/* Expand/Collapse Button */}
            <button
                onClick={toggleExpand}
                className="w-full text-[12px] text-center  bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
                {isExpanded ? 'Show Less' : 'Show More'}
            </button>

            {isExpanded && (
                <>
                    {/* Action Buttons */}
                    <div className="flex justify-between items-center mt-6 px-4  ">
                        <button className="bg-white border border-green-600 text-green-600 px-4 py-2 rounded-md">
                            Call Woner
                        </button>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Chat</button>
                        <button onClick={showInputPopup} className="bg-blue-600 text-white px-4 py-2 rounded-md">Shear Avalible</button>
                        {/* <button className="bg-blue-600 text-white px-4 py-2 rounded-md">View Bill</button> */}
                    </div>

                    {/* Freight Details */}
                    <div className="px-4  my-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700 font-semibold">Vehicle ID</span>
                            <div className="flex items-center">
                                <span className="text-gray-700 font-semibold">{lorry_id}</span>
                            </div>
                        </div>

                        {/* Freight Adjustments */}
                        <div className="mt-2 text-sm">
                            <div className="flex justify-between text-gray-500">
                                <span>Owner Mobile:</span>
                                <span>{owner_mobile_number}</span>
                            </div>
                            <div className="flex justify-between mt-2 text-gray-500">
                                <span>Capacity</span>
                                <span>{vehicale_capacity}</span>
                            </div>
                            <div className="flex justify-between mt-2 text-gray-500">
                                <span>Location</span>
                                <span>{owner_city.cityName}, {owner_city.stateName}</span>
                            </div>
                        </div>



                        <div className="mt-2 text-sm">
                            <div className="flex justify-between text-gray-500">
                                <span>Aadhar Number:</span>
                                <span>{aadharcard_number}</span>
                            </div>
                            <div className="flex justify-between mt-2 text-gray-500">
                                <span>PAN Number</span>
                                <span>{owner_pancard_number}</span>
                            </div>
                            <div className="flex justify-between mt-2 text-gray-500">
                                <span>Owner Address</span>
                                <span>{owner_addres}</span>
                            </div>
                        </div>


                        <div className="mt-2 text-sm">
                            <div className="flex justify-between text-gray-500">
                                <span>Permit Expiry:</span>
                                <span>{new Date(permit_expire_date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between mt-2 text-gray-500">
                                <span>Fitness Expiry</span>
                                <span>{new Date(fitness_expire_date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between mt-2 text-gray-500">
                                <span>Insurance Expiry</span>
                                <span>{new Date(insurance_expire_date).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Pending Balance */}
                    <div className="px-4 border-t pt-4 border-dashed border-blue-600">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700 font-semibold">Total Trips</span>
                            <span className="text-gray-700 font-semibold">0</span>
                        </div>

                        {/* Note and Request Money */}
                        <div className="flex justify-end items-center px-4">
                            {/* <div className="flex items-center text-blue-600 cursor-pointer">
                                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                                <span>Note</span>
                            </div> */}
                            <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md">Request Money</button>
                        </div>
                        {/* Photos */}
                        <div className="px-4">
                            <h4 className="font-semibold">Documents:</h4>
                            <div className="flex space-x-4 mt-2">
                                <div>
                                    <img src={insurance_photo} alt="Insurance" className="w-20 h-20 object-cover rounded" />
                                    <p className="text-xs text-center mt-1">Insurance</p>
                                </div>
                                <div>
                                    <img src={permit_photo} alt="Permit" className="w-20 h-20 object-cover rounded" />
                                    <p className="text-xs text-center mt-1">Permit</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Expanded Section */}

        </div>
    );
};




function TruckDetailsPopup() {
    const [truckDetails, setTruckDetails] = useState({ city: '', routes: '' });



    return (
        <div className="flex flex-col items-center p-4">
            <button
                onClick={showInputPopup}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Enter Truck Details
            </button>
        </div>
    );
}

// export default TruckDetailsPopup;


export { VehicleDetails };

