import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import LogoDark from '../../images/logo/logo-dark.svg';
// import Logo from '../../images/logo/logo.svg';
import { FaAddressCard, FaAsterisk, FaCity, FaCreditCard, FaIdCard, FaImage, FaLandmark, FaMapMarkerAlt, FaPhoneAlt, FaRupeeSign, FaTruckMoving, } from 'react-icons/fa';
import InputField from '../../components/Forms/formsInputs/InputField';
import { ApiSearchDropDown, SelectInput } from '../../components/Forms/formsInputs';
import { useForm } from 'react-hook-form';
import { FaRegUser, } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import { MdImageSearch, MdOutlineMobileScreenShare, MdOutlineHomeWork, MdLockOutline, MdOutlineMailOutline, MdOutlineDescription } from "react-icons/md";
import InputTextarea from '../../components/Forms/formsInputs/InputTextarea';
import { showSuccessAlert } from '../../components/Aleart/Sweeralert';
import { appInfo } from '../../common/appInfo/app.info';
import { Field } from '@headlessui/react';
import { TrukErrorDialog, TrukLoaderMoveForword, TrukProcessDialog } from '../../components/loaders/truck_move_forword';
import { handleRequest } from '../../util/handleRequest';
import { BsTruck } from 'react-icons/bs';
import { FormDataConverter } from '../../util/ConvertInFormData';
import DatePicker from '../../components/Forms/formsInputs/DatePicker';
import SearchDropdown from '../../components/Forms/formsInputs/SearchDropdown';
import { IoMdSpeedometer } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { CITY_API } from '../../util/config';
import { useCreatePartyMutation } from '../../services/party.services';



const tripFeilds = {
    name: "",
    contact: "",
    city: "",
    address: "",
    logo: ""
};

export default function CreatParty() {
    // const [createParty, { isLoading, error }] = usecreatePartyMutation();
    // const [registation, { data, isLoading, isError, isSuccess }] = useRegisterMutation()
    const [createParty, { data, isLoading, isError, isSuccess }] = useCreatePartyMutation();
    const { register, setValue, setError, getValues, clearErrors, handleSubmit, formState: { errors } } = useForm(tripFeilds);
    const { error, loading, vehicles_numbers } = useSelector(vehicle => vehicle.vehicle)
    console.log("vehicalesNumber", vehicles_numbers)
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
        const formData = FormDataConverter(data)
        const handleFormSubmission = async () => {
            await handleRequest(
                () => createParty(formData),  // The API call function
                {
                    loadingMessage: "Party Creating...",
                    successMessage: "Your Party has been Created. ",
                    errorMessage: "There was an issue while your Trip Creating. Please try again later."
                }
            );
        };
        handleFormSubmission()
    };





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
                                <BsTruck />  Add Party
                            </h2>
                            <form className='text-black dark:text-white      grid grid-cols-1 sm:grid-cols-2 gap-x-2' onSubmit={handleSubmit(onSubmit)}>
                                {/* Enter Party Name */}
                                <InputField
                                    type="text"
                                    placeholder="Enter Party Name..."
                                    label="Party Name"
                                    className={`w-full capitalize rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus-visible:shadow-none 
                    ${errors.name ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 " : " border-stroke focus:border-green-500 dark:focus:border-green-500 "} 
                     dark:border-form-strokedark dark:bg-form-input dark:text-white uppercase `}
                                    {...register("name", {
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

                                        handleChange("name", e);
                                    }}
                                    icon={<FaAsterisk size={22} />}
                                    errorSms={errors.name && <p className="text-red-500 text-xs mt-1 ">{errors.name.message}</p>}
                                />
                                {/* {contact} */}
                                <InputField
                                    type="tel"
                                    placeholder="Party Mobile number..."
                                    label="Party Mobile Number"
                                    className={`w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus-visible:shadow-none 
                   ${errors.contact ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 " : " border-stroke focus:border-green-500 dark:focus:border-green-500 "} 
                    dark:border-form-strokedark dark:bg-form-input dark:text-white `}
                                    {...register("contact", {
                                        required: "Please enter the mobile number",
                                        pattern: {
                                            value: /^[0-9]{10}$/,
                                            message: "Please enter a valid 10-digit mobile number"
                                        },
                                    })}
                                    onChange={(e) => handleChange("contact", e)}
                                    icon={<FaPhoneAlt size={22} />}
                                    errorSms={errors.contact && <p className="text-red-500 text-xs mt-1 ">{errors.contact.message}</p>}
                                />

                                <ApiSearchDropDown
                                    apiUrl={CITY_API}
                                    onSelect={handleSelect}
                                    searchingKey="cityName"
                                    setKey='city'
                                    label="City"
                                    className="w-full  rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10  outline-none focus:border-green-500 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-green-500"
                                    icon={<IoSearchSharp className="text-gray-500 mt-3" size={22} />}
                                />


                                <InputField
                                    type="file"
                                    placeholder="upload logo,Banner, visiting Card..."
                                    label="Attach Logo ,Banner, visiting Card "
                                    accept="image/png, image/jpeg, image/jpg"
                                    className={`w-full cursor-pointer rounded-lg border bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:bg-white file:py-3 file:px-5 file:hover:bg-primary file:hover:text-white file:hover:bg-opacity-10
                  ${errors.logo ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 " : " border-stroke focus:border-green-500 dark:focus:border-green-500 "} 
                  disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white`}
                                    {...register('logo', { required: "Please Upload Logo" })}
                                    icon={<MdImageSearch className="text-gray-500" size={22} />}
                                    errorSms={errors.logo && <p id="logo-error" className="text-red-500 text-xs mt-1">{errors.logo.message}</p>}
                                />

                                <InputTextarea
                                    type="text"
                                    placeholder="Enter address..."
                                    rows={2}
                                    label="Address"
                                    className={`w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus-visible:shadow-none 
                        ${errors.address ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 " : " border-stroke focus:border-green-500 dark:focus:border-green-500 "} 
                       dark:border-form-strokedark dark:bg-form-input dark:text-white `}
                                    {...register("address", {
                                        required: "Please Enter Address",
                                        minLength: {
                                            value: 10,
                                            message: "Address be greater than 10 letter"
                                        },
                                        maxLength: {
                                            value: 200,
                                            message: "Address should be less than 200 letter"
                                        }
                                    })}
                                    onChange={(e) => handleChange("address", e)}
                                    icon={<MdOutlineHomeWork className=" " size={25} />}
                                    errorSms={errors.address && <p id="username-error" className="text-red-500 text-xs mt-1 ">{errors.address.message}</p>}
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
