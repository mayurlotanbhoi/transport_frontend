import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import LogoDark from '../../images/logo/logo-dark.svg';
// import Logo from '../../images/logo/logo.svg';
import { FaAddressCard, FaAsterisk, FaCity, FaCreditCard, FaHospitalUser, FaIdCard, FaImage, FaLandmark, FaMapMarkerAlt, FaPhoneAlt, FaRupeeSign, FaTruckMoving, } from 'react-icons/fa';
import InputField from '../../components/Forms/formsInputs/InputField';
import { ApiSearchDropDown, SelectInput } from '../../components/Forms/formsInputs';
import { useForm } from 'react-hook-form';
import { FaLocationDot, FaRegUser, } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import { MdImageSearch, MdOutlineMobileScreenShare, MdOutlineHomeWork, MdLockOutline, MdOutlineMailOutline, MdOutlineDescription } from "react-icons/md";
import InputTextarea from '../../components/Forms/formsInputs/InputTextarea';
import { showSuccessAlert } from '../../components/Aleart/Sweeralert';
import { appInfo } from '../../common/appInfo/app.info';
import { useRegisterMutation } from '../../services/auth-service';
import { Field } from '@headlessui/react';
import { TbWeight } from "react-icons/tb";
import { TrukErrorDialog, TrukLoaderMoveForword, TrukProcessDialog } from '../../components/loaders/truck_move_forword';
import { handleRequest } from '../../util/handleRequest';
import { BsTruck } from 'react-icons/bs';
import { FormDataConverter } from '../../util/ConvertInFormData';
import DatePicker from '../../components/Forms/formsInputs/DatePicker';
import { GiCartwheel, GiCarWheel, GiModernCity, GiSteeringWheel, GiWeight } from 'react-icons/gi';
import SearchDropdown from '../../components/Forms/formsInputs/SearchDropdown';
import { vehicleCapacities, vehicleTypes } from '../../common/static/static';
import { useRegisterVehicleMutation } from '../../services/vehicle.services';
import { useCreateTripMutation } from '../../services/trip_history.service';
import { IoMdSpeedometer } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { CITY_API } from '../../util/config';
const { Logo, appName } = appInfo



const tripFeilds = {
    user_id: '',
    vehicles_numbers: '',
    Party_name: '',
    Party_contact: '',
    loading_city: {
        cityID: '',
        cityName: '',
        stateID: '',
        stateName: '',
        stateShortName: '',
        countryName: '',
        countryID: '',
    },
    unloading_city: {
        cityID: '',
        cityName: '',
        stateID: '',
        stateName: '',
        stateShortName: '',
        countryName: '',
        countryID: '',
    },
    freigth: '',
    advance: '',
    balance: '',
    cumition: '',
    payment_date: '',
    driver_contact: '',
    driver_name: '',
    distance_km: '',
    speed_per_hr: '',
    load_goods: '',
    load_weigth: '',
};

export default function CreatTrip() {
    // const [createTrip, { isLoading, error }] = useCreateTripMutation();
    // const [registation, { data, isLoading, isError, isSuccess }] = useRegisterMutation()
    const [createTrip, { data, isLoading, isError, isSuccess }] = useCreateTripMutation();
    const { register, setValue, setError, getValues, clearErrors, handleSubmit, formState: { errors } } = useForm(tripFeilds);
    const { error, loading, vehicles_numbers } = useSelector(vehicle => vehicle.vehicle)
    const { error: partieError, loading: partieLading, partiess } = useSelector(party => party.party)

    // console.log('partiess', partiess)
    // console.log("vehicalesNumber", vehicles_numbers)

    const handleSelect = (setKey, option) => {
        console.log(setKey, option);
        setValue(setKey, option, { shouldValidate: true });
    };

    const handleChange = (fieldName, e) => {

        console.log("fieldName, e", fieldName, e)
        let value = e.target.value
        setValue(fieldName, value, { shouldValidate: true });
    };

    const dateHandleChange = (fieldName, date) => {
        // Assuming the DatePicker provides the `date` directly
        setValue(fieldName, date, { shouldValidate: true });
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

        console.log("trip details", data);
        // return;
        // const formData = FormDataConverter(data)
        // console.log("formData", formData)

        const handleFormSubmission = async () => {
            await handleRequest(
                () => createTrip(data),  // The API call function
                {
                    loadingMessage: "Trip Creating...",
                    successMessage: "Your Trip has been Created. ",
                    errorMessage: "There was an issue while your Trip Creating. Please try again later."
                }
            );
        };
        handleFormSubmission()
    };



    // const handleRegister = (vehicleData) => {
    //   registerVehicle(vehicleData)
    //     .then((response) => {
    //       // Handle successful registration (e.g., show a success message, redirect)
    //       console.log('Vehicle registered successfully:', response.data);
    //     })
    //     .catch((error) => {
    //       // Handle registration errors (e.g., show an error message)
    //       console.error('Error registering vehicle:', error);
    //     });
    // };

    return (
        <>
            {/* <Breadcrumb pageName="Sign Up" /> */}
            {isLoading && <TrukLoaderMoveForword />}
            <div className="rounded-sm border  border-stroke bg-white   shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex flex-wrap  ">

                    <div className="w-full  border-stroke dark:border-strokedark ">
                        <div className="w-full  p-4 sm:p-12.5 xl:p-17.5">
                            {/* <span className="mb-1.5 block font-medium">Start for free</span> */}
                            <h2 className="mb-9 text-2xl font-bold  dark:text-white sm:text-title-xl2">
                                {/* Sign Up to {appName} */}
                                <BsTruck />  Add Trip
                            </h2>
                            <form className='text-black dark:text-white      grid grid-cols-1 sm:grid-cols-2 gap-x-2' onSubmit={handleSubmit(onSubmit)}>
                                {/* Enter Party Name */}
                                {/* <InputField
                                    type="text"
                                    placeholder="Enter Party Name..."
                                    label="Party Name"
                                    className={`w-full capitalize rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus-visible:shadow-none 
                    ${errors.Party_name ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 " : " border-stroke focus:border-green-500 dark:focus:border-green-500 "} 
                     dark:border-form-strokedark dark:bg-form-input dark:text-white uppercase `}
                                    {...register("Party_name", {
                                        required: "Please enter the Party Name",

                                        minLength: {
                                            value: 3,
                                            message: "Party Name should be at least 3 characters long"
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: "Party Name should be at most 100 characters long"
                                        }
                                    })}
                                    onChange={(e) => {

                                        handleChange("Party_name", e);
                                    }}
                                    icon={<FaAsterisk size={22} />}
                                    errorSms={errors.Party_name && <p className="text-red-500 text-xs mt-1 ">{errors.Party_name.message}</p>}
                                />
                                {Party_contact}
                                <InputField
                                    type="tel"
                                    placeholder="Party Mobile number..."
                                    label="Party Mobile Number"
                                    className={`w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus-visible:shadow-none 
                   ${errors.Party_contact ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 " : " border-stroke focus:border-green-500 dark:focus:border-green-500 "} 
                    dark:border-form-strokedark dark:bg-form-input dark:text-white `}
                                    {...register("Party_contact", {
                                        required: "Please enter the mobile number",
                                        pattern: {
                                            value: /^[0-9]{10}$/,
                                            message: "Please enter a valid 10-digit mobile number"
                                        },
                                    })}
                                    onChange={(e) => handleChange("Party_contact", e)}
                                    icon={<FaPhoneAlt size={22} />}
                                    errorSms={errors.Party_contact && <p className="text-red-500 text-xs mt-1 ">{errors.Party_contact.message}</p>}
                                /> */}


                                <SelectInput
                                    // apiUrl={CITY_API}
                                    onSelect={handleSelect}
                                    searchingKey="Select Your Party"
                                    setKey='Party'
                                    // className="w-full  rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10  outline-none focus:border-green-500 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-green-500"
                                    icon={<FaHospitalUser size={22} />}
                                    label="Select Partie's"
                                    option={partiess.map((party) => (party?.name + " " + "ID =" + party?.party_id))}
                                    optionIcon={<FaHospitalUser className=' me-2' />}
                                />

                                {/* loading_city */}
                                <ApiSearchDropDown
                                    apiUrl={CITY_API}
                                    onSelect={handleSelect}
                                    searchingKey="cityName"
                                    setKey='loading_city'
                                    className="w-full  rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10  outline-none focus:border-green-500 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-green-500"
                                    icon={<FaLocationDot size={22} />}
                                    label="Loading city"
                                    optionIcon={<GiModernCity className=' me-2' />}

                                />

                                {/* unloading_city */}
                                <ApiSearchDropDown
                                    apiUrl={CITY_API}
                                    onSelect={handleSelect}
                                    searchingKey="cityName"
                                    setKey='unloading_city'
                                    className="w-full  rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10  outline-none focus:border-green-500 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-green-500"
                                    icon={<FaLocationDot size={22} />}
                                    label="Unloading city"
                                    optionIcon={<GiModernCity className=' me-2' />}
                                />
                                {/* load_goods */}

                                <InputField
                                    type="text"
                                    placeholder="Enter load goods..."
                                    label="Load goods"
                                    className={`w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus-visible:shadow-none 
          ${errors.load_goods ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 " : " border-stroke focus:border-green-500 dark:focus:border-green-500 "} 
          dark:border-form-strokedark dark:bg-form-input dark:text-white `}
                                    {...register("load_goods", {
                                        required: "Please enter the owner's name",
                                        minLength: {
                                            value: 3,
                                            message: "Name should be greater than 3 letters"
                                        },
                                        maxLength: {
                                            value: 40,
                                            message: "Name should be less than 40 letters"
                                        }
                                    })}
                                    onChange={(e) => handleChange("load_goods", e)}
                                    icon={<FaRegUser size={22} />}
                                    errorSms={errors.load_goods && <p className="text-red-500 text-xs mt-1 ">{errors.load_goods.message}</p>}
                                />
                                {/* load_weigth */}
                                <SelectInput
                                    // apiUrl={CITY_API}
                                    onSelect={handleSelect}
                                    searchingKey="vehicale_capacity"
                                    setKey='load_weigth'
                                    // className="w-full  rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10  outline-none focus:border-green-500 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-green-500"
                                    icon={<TbWeight size={22} />}
                                    label="Load weigth"
                                    option={vehicleCapacities}
                                    optionIcon={<GiWeight className=' me-2' />}
                                />
                                {/* Freight */}
                                <InputField
                                    type="text"
                                    placeholder="Freigth amount in rupees..."
                                    label="Freigth Amount"
                                    className={`w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus-visible:shadow-none 
  ${errors.freigth ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 " : " border-stroke focus:border-green-500 dark:focus:border-green-500 "} 
  dark:border-form-strokedark dark:bg-form-input dark:text-white `}
                                    {...register("freigth", {
                                        required: "Please enter the freigth amount",
                                        pattern: {
                                            value: /^[0-9]+$/,
                                            message: "Amount should be a valid number"
                                        },
                                        min: {
                                            value: 1,
                                            message: "Amount should be greater than 0"
                                        }
                                    })}
                                    onChange={(e) => handleChange("freigth", e)}
                                    icon={<FaRupeeSign size={22} />}
                                    errorSms={errors.freigth && <p className="text-red-500 text-xs mt-1 ">{errors.freigth.message}</p>}
                                />

                                {/* Advance */}
                                <InputField
                                    type="text"
                                    placeholder="Advance amount in rupees..."
                                    label="Advance Amount"
                                    className={`w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus-visible:shadow-none 
  ${errors.advance ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 " : " border-stroke focus:border-green-500 dark:focus:border-green-500 "} 
  dark:border-form-strokedark dark:bg-form-input dark:text-white `}
                                    {...register("advance", {
                                        required: "Please enter the advance amount",
                                        pattern: {
                                            value: /^[0-9]+$/,
                                            message: "Amount should be a valid number"
                                        },
                                        min: {
                                            value: 0,
                                            message: "Amount should be 0 or greater"
                                        }
                                    })}
                                    onChange={(e) => handleChange("advance", e)}
                                    icon={<FaRupeeSign size={22} />}
                                    errorSms={errors.advance && <p className="text-red-500 text-xs mt-1 ">{errors.advance.message}</p>}
                                />

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

                                {/* driver_contact */}

                                <InputField
                                    type="tel"
                                    placeholder="Driver Mobile number..."
                                    label="Driver Mobile Number"
                                    className={`w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus-visible:shadow-none 
                   ${errors.driver_contact ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 " : " border-stroke focus:border-green-500 dark:focus:border-green-500 "} 
                    dark:border-form-strokedark dark:bg-form-input dark:text-white `}
                                    {...register("driver_contact", {
                                        required: "Please enter the mobile number",
                                        pattern: {
                                            value: /^[0-9]{10}$/,
                                            message: "Please enter a valid 10-digit mobile number"
                                        },
                                    })}
                                    onChange={(e) => handleChange("driver_contact", e)}
                                    icon={<FaPhoneAlt size={22} />}
                                    errorSms={errors.driver_contact && <p className="text-red-500 text-xs mt-1 ">{errors.driver_contact.message}</p>}
                                />


                                {/* load_weigth */}
                                <SelectInput
                                    // apiUrl={CITY_API}
                                    onSelect={handleSelect}
                                    searchingKey="lorry_number"
                                    setKey='vehicale_number'
                                    className="w-full  rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10  outline-none focus:border-green-500 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-green-500"
                                    icon={<FaTruckMoving size={22} />}
                                    label="vehicale Number"
                                    option={vehicles_numbers}
                                    optionIcon={<FaTruckMoving className=' me-2' />}
                                />

                                {/* driver_name: '',
    distance_km: '',
    speed_per_km: '', */}

                                {/* driver_name */}
                                <InputField
                                    type="text"
                                    placeholder="Driver name..."
                                    label="Driver Name"
                                    className={`w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus-visible:shadow-none 
          ${errors.driver_name ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 " : " border-stroke focus:border-green-500 dark:focus:border-green-500 "} 
          dark:border-form-strokedark dark:bg-form-input dark:text-white `}
                                    {...register("driver_name", {
                                        required: "Please enter the driver name",
                                        minLength: {
                                            value: 3,
                                            message: "Name should be greater than 3 letters"
                                        },
                                        maxLength: {
                                            value: 40,
                                            message: "Name should be less than 40 letters"
                                        }
                                    })}
                                    onChange={(e) => handleChange("driver_name", e)}
                                    icon={<GiSteeringWheel size={22} />}
                                    errorSms={errors.driver_name && <p className="text-red-500 text-xs mt-1 ">{errors.driver_name.message}</p>}
                                />

                                {/* Distance (in km) */}
                                <InputField
                                    type="text"
                                    placeholder="Enter distance in kilometers..."
                                    label="Distance (in km)"
                                    className={`w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus-visible:shadow-none 
  ${errors.distance_km ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 " : " border-stroke focus:border-green-500 dark:focus:border-green-500 "} 
  dark:border-form-strokedark dark:bg-form-input dark:text-white `}
                                    {...register("distance_km", {
                                        required: "Please enter the distance in kilometers",
                                        pattern: {
                                            value: /^[0-9]+$/,
                                            message: "Distance should be a valid number"
                                        },
                                        min: {
                                            value: 1,
                                            message: "Distance should be 1 km or greater"
                                        }
                                    })}
                                    onChange={(e) => handleChange("distance_km", e)}
                                    icon={<FaMapMarkerAlt size={22} />}  // Replace with any relevant icon, or keep as is
                                    errorSms={errors.distance_km && <p className="text-red-500 text-xs mt-1 ">{errors.distance_km.message}</p>}
                                />

                                {/* speed_per_hr */}
                                <InputField
                                    type="text"
                                    placeholder="Enter Speed Per Hour..."
                                    label="speed Per Hour  (in km)"
                                    className={`w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus-visible:shadow-none 
  ${errors.speed_per_hr ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 " : " border-stroke focus:border-green-500 dark:focus:border-green-500 "} 
  dark:border-form-strokedark dark:bg-form-input dark:text-white `}
                                    {...register("speed_per_hr", {
                                        required: "Please enter the Speed Per Hour",
                                        pattern: {
                                            value: /^[0-9]+$/,
                                            message: "Speed Per Hour should be a valid number"
                                        },
                                        min: {
                                            value: 1,
                                            message: "Speed Per Hour should be 1 km or greater"
                                        }
                                    })}
                                    onChange={(e) => handleChange("speed_per_hr", e)}
                                    icon={<IoMdSpeedometer size={22} />}  // Replace with any relevant icon, or keep as is
                                    errorSms={errors.speed_per_hr && <p className="text-red-500 text-xs mt-1 ">{errors.speed_per_hr.message}</p>}
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
                                        // required: "Please Select fitness expire date",
                                    })}
                                    errorSms={errors.payment_date && <p className="text-red-500 text-xs mt-1">{errors.payment_date.message}</p>}
                                />


                                <div className="my-5 col-span-full">
                                    <input
                                        type="submit"
                                        value="Add Trip"
                                        className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
