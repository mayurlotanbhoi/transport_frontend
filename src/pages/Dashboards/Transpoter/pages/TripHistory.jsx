import React, { useLayoutEffect, useState } from 'react';
import { FaTruck, FaClock, FaTachometerAlt, FaTruckMoving, FaUserCircle, FaRupeeSign } from 'react-icons/fa';
import { FaTruckArrowRight, FaUser } from 'react-icons/fa6';
import { IoMdAdd } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { PiSteeringWheelFill } from "react-icons/pi";
import { FcCallback } from "react-icons/fc";
import { Modal } from '../../../../components/popups/Modal';
import DatePicker from '../../../../components/Forms/formsInputs/DatePicker';
import InputField from '../../../../components/Forms/formsInputs/InputField';
import { useForm } from 'react-hook-form';
import { handleRequest } from '../../../../util/handleRequest';
import { useCreateTripMutation, useUpdayeTripPaymentMutation } from '../../../../services/trip_history.service';
// import { Modal } from '../../../../components/ModalSettings';


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


export const calculateProgress = (trip_start_date, speed_per_hr, distance_km,) => {
    const now = new Date();
    const leaveTime = new Date(trip_start_date);

    // Calculate the estimated arrival time (eta) based on distance and speed
    const hours = distance_km / speed_per_hr;
    const eta = new Date(leaveTime.getTime() + hours * 60 * 60 * 1000);

    const totalTime = eta - leaveTime; // Total time for the journey in milliseconds
    const elapsedTime = now - leaveTime; // Elapsed time in milliseconds

    // Calculate progress percentage
    const progress = (elapsedTime / totalTime) * 100;

    // Ensure progress is between 0% and 100%
    return Math.min(Math.max(progress, 0), 100);
};

export const calculateEstimatedTime = (status) => {
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

    // console.log("trips", trips)
    const { register, setValue, setError, getValues, reset, clearErrors, handleSubmit, formState: { errors } } = useForm();
    const [updayeTripPayment, { data, isLoading, isError, isSuccess }] = useUpdayeTripPaymentMutation();

    const [expanded, setExpanded] = useState(null); // To track the expanded state of each card
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updatePayment, setUpdatePayment] = useState({ trip_id: "", cumition: "", balance: "" })

    useLayoutEffect(() => {
        setValue("cumition", updatePayment?.cumition)
        setValue("balance", updatePayment?.balance)
    }, [updatePayment?.trip_id,])


    const dateHandleChange = (fieldName, date) => {
        // Assuming the DatePicker provides the `date` directly
        setValue(fieldName, date, { shouldValidate: true });
    };

    const handleChange = (fieldName, e) => {

        console.log("fieldName, e", fieldName, e)
        let value = e.target.value
        setValue(fieldName, value, { shouldValidate: true });
    };


    const onSubmit = async (data) => {
        // const formData = new FormData();

        // for (const key in data) {
        //   if (key === 'logo') {
        //     formData.append(key, data[key][0]); // Assuming `data[key]` is a FileList
        //   } else if (key === 'city') {
        //     formData.append(key, JSON.stringify(data[key])); // Convert city object to JSON
        //   } else {
        //     formData.append(key, data[key]);
        //   }
        // }
        data.trip_id = updatePayment.trip_id


        // console.log("trip details", data);

        // return
        // return;
        // const formData = FormDataConverter(data)
        // console.log("formData", formData)

        const handleFormSubmission = async () => {
            await handleRequest(
                () => updayeTripPayment(data),  // The API call function
                {
                    loadingMessage: "Updating Trip Final Payment...",
                    successMessage: "Your  Trip Final Payment Update SuccessFully. ",
                    errorMessage: "There was an issue while your Updating Trip Final Payment. Please try again later."
                }
            );
        };
        handleFormSubmission()
    };

    const modelClose = () => {
        setUpdatePayment({ trip_id: "", cumition: "", balance: "" })
        setIsModalOpen(false)
        reset()
    }

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
        <>


            {/* Modal Component */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => modelClose()}
            >
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">Complet Trip Add Final Payment {updatePayment?.trip_ids}</h2>
                <form className='  text-black  dark:text-white       grid grid-cols-1 sm:grid-cols-2 gap-x-2' onSubmit={handleSubmit(onSubmit)}>
                    <div className=' mt-[0.6rem]'>
                        <InputField
                            type="text"
                            placeholder="Payment amount in rupees..."
                            label="Payment Amount"
                            className={`w-full rounded-lg border  bg-transparent py-3 pl-6 pr-10 outline-none focus-visible:shadow-none 
  ${errors.full_payment ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 " : " border-stroke focus:border-green-500 dark:focus:border-green-500 "} 
  dark:border-form-strokedark dark:bg-form-input dark:text-white `}
                            {...register("full_payment", {
                                required: "Please enter the payment amount",
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "Amount should be a valid number"
                                },
                                min: {
                                    value: 0,
                                    message: "Amount should be 0 or greater"
                                }
                            })}
                            onChange={(e) => handleChange("full_payment", e)}
                            icon={<FaRupeeSign size={20} />}
                            errorSms={errors.full_payment && <p className="text-red-500 text-xs mt-1 ">{errors.full_payment.message}</p>}
                        />
                    </div>
                    {/* Balance */}
                    <InputField
                        type="text"
                        placeholder="Balance amount in rupees..."
                        label="Balance Amount"
                        className={`w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus-visible:shadow-none 
  ${errors.balance ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 " : " border-stroke focus:border-green-500 dark:focus:border-green-500 "} 
  dark:border-form-strokedark dark:bg-form-input dark:text-white `}
                        {...register("balance", {
                            required: "Please enter the balance amount",
                            pattern: {
                                value: /^[0-9]+$/,
                                message: "Amount should be a valid number"
                            },
                            min: {
                                value: 0,
                                message: "Amount should be 0 or greater"
                            }
                        })}
                        onChange={(e) => handleChange("balance", e)}
                        icon={<FaRupeeSign size={22} />}
                        errorSms={errors.balance && <p className="text-red-500 text-xs mt-1 ">{errors.balance.message}</p>}
                    />
                    {/* Cumition */}
                    <InputField
                        type="text"
                        placeholder="Cumition amount in rupees..."
                        label="Cumition Amount"
                        className={`w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus-visible:shadow-none 
  ${errors.cumition ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 " : " border-stroke focus:border-green-500 dark:focus:border-green-500 "} 
  dark:border-form-strokedark dark:bg-form-input dark:text-white `}
                        {...register("cumition", {
                            required: "Please enter the cumition amount",

                            pattern: {
                                value: /^[0-9]+$/,
                                message: "Amount should be a valid number"
                            },
                            min: {
                                value: 0,
                                message: "Amount should be 0 or greater"
                            }
                        })}
                        onChange={(e) => handleChange("cumition", e)}
                        icon={<FaRupeeSign size={22} />}
                        errorSms={errors.cumition && <p className="text-red-500 text-xs mt-1 ">{errors.cumition.message}</p>}
                    />
                    {/* payment_date */}
                    <DatePicker
                        label="Payment Date"
                        placeholder="Select Paymentssss date"
                        // onChange={(e) => handleChange("payment_date", e)}
                        setValue={setValue}
                        setKey="payment_date"
                        dateFormat="d M, Y"
                        className={`w-full cursor-pointer rounded-lg border bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:bg-white file:py-3 file:px-5 file:hover:bg-primary file:hover:text-white file:hover:bg-opacity-10
                                   ${errors.payment_date ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 " : " border-stroke focus:border-green-500 dark:focus:border-green-500"} 
                                    disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white`}
                        {...register("payment_date", {
                            required: "Please payment  date",
                        })}
                        errorSms={errors.payment_date && <p className="text-red-500 text-xs mt-1">{errors.payment_date.message}</p>}
                    />
                    {errors.payment_date && <p className="text-red-500 text-xs mt-1">{errors.payment_date.message}</p>}



                    <div className="my-5 col-span-full">
                        <input
                            type="submit"
                            value="Add Trip"
                            className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                        />
                    </div>
                </form>
            </Modal>

            <div className="col-span-12 xl:col-span-8 dark:bg-black dark:text-white rounded-t-xl ">


                <div className=' w-full flex flex-wrap justify-start gap-2 '>
                    {trips.map((status, index) => {
                        {/* const progress = calculateProgress(status);
                    const estimatedTime = calculateEstimatedTime(status); */}
                        const isExpanded = expanded === index; // Track which card is expanded

                        return (
                            <div className=' w-full sm:max-w-[20rem]' key={index}>
                                <TripCard isExpanded={isExpanded} index={index} setExpanded={setExpanded} LorryRunningStatus={status} setIsModalOpen={setIsModalOpen} setUpdatePayment={setUpdatePayment} />
                            </div>

                        );
                    })}
                </div>
            </div>
        </>
    );
}



// import { FaTruckArrowRight } from 'react-icons/fa';

const TripCard = ({ isExpanded, setExpanded, index, LorryRunningStatus, setIsModalOpen, setUpdatePayment }) => {



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
        payment_date,
        full_payment

    } = LorryRunningStatus;

    const setUpateData = (trip_id, cumition, balance) => {
        console.log("trip_id, cumition ", trip_id, cumition, balance)
        setUpdatePayment({ trip_id, cumition, balance });
        setIsModalOpen(true);
    };

    const progress = calculateProgress(LorryRunningStatus?.createdAt, LorryRunningStatus?.speed_per_hr, LorryRunningStatus?.distance_km,);
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
                        <button
                            onClick={() => window.location.href = `tel:${driver_contact}`}

                            className="bg-white border flex items-center gap-2 border-green-600 text-green-600 px-4 py-2 rounded-md">
                            {/* call Driver btn */}
                            <FcCallback /> Driver
                        </button>
                        <button
                            onClick={() => window.location.href = `tel:${Party_contact}`}

                            className="bg-white border flex items-center gap-2 border-green-600 text-green-600 px-4 py-2 rounded-md">
                            {/* call Driver btn */}
                            <FcCallback /> Party
                        </button>                    </div>

                    {/* Freight Details */}
                    <div className="mt-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700 font-semibold">Trip Detail</span>
                            <div className="flex items-center">
                                <span className="text-gray-700 font-semibold"> {distance_km} km</span>
                            </div>
                        </div>

                        {/* Freight Adjustments */}
                        <div className="mt-2 text-sm">
                            <div className="flex justify-between text-gray-500">
                                <span>Speed</span>
                                <span>{speed_per_hr} H/P</span>
                            </div>
                            {payment_date && <div className="flex justify-between mt-2 text-gray-500">
                                <span>payment_date</span>
                                <span>{new Date(payment_date)?.toISOString()}</span>
                            </div>}
                            <div className="flex justify-between mt-2 text-gray-500">
                                <span>Trip ID</span>
                                <span>{trip_id}</span>
                            </div>
                        </div>
                    </div>
                    {/* Action Buttons */}
                    <div onClick={() => setUpateData(trip_id, cumition, balance)} className="flex justify-between items-center mt-6">
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
                                <span> Advance</span>
                                <span>₹{advance}</span>
                            </div>
                            <div className="flex justify-between mt-2 text-gray-500">
                                <span> cumition</span>
                                <span>₹{cumition}</span>
                            </div>
                            <div className="flex justify-between mt-2 text-gray-500">
                                <span>Payments</span>
                                <span>₹{full_payment}</span>
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
                        {/* <div className="flex justify-end items-center mt-4"> */}
                        {/* <div className="flex items-center text-blue-600 cursor-pointer">
                                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                                <span>Note</span>
                            </div> */}
                        {/* <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md">Request Money</button> */}
                        {/* </div> */}
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

