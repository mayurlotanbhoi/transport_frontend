import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import LogoDark from '../../images/logo/logo-dark.svg';
// import Logo from '../../images/logo/logo.svg';
import { FaAddressCard, FaAsterisk, FaCity, FaCreditCard, FaIdCard, FaImage, FaLandmark, FaPhoneAlt, FaTruck, } from 'react-icons/fa';
import InputField from '../../components/Forms/formsInputs/InputField';
import { ApiSearchDropDown, SelectInput } from '../../components/Forms/formsInputs';
import { useForm } from 'react-hook-form';
import { FaRegUser, } from "react-icons/fa6";
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
import { GiCartwheel, GiCarWheel, GiModernCity, GiWeight } from 'react-icons/gi';
import SearchDropdown from '../../components/Forms/formsInputs/SearchDropdown';
import { vehicleCapacities, vehicleLength, vehicleTypes } from '../../common/static/static';
import { useRegisterVehicleMutation } from '../../services/vehicle.services';
import { CITY_API } from '../../util/config';
const { Logo, appName } = appInfo
export default function AddLorry() {
  // const [registation, { data, isLoading, isError, isSuccess }] = useRegisterMutation()
  const [registerVehicle, { data, isLoading, isError, isSuccess }] = useRegisterVehicleMutation();
  const { register, setValue, setError, getValues, clearErrors, handleSubmit, formState: { errors } } = useForm();

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

    console.log("lorry data", data);
    const formData = FormDataConverter(data)
    console.log("formData", formData)

    const handleFormSubmission = async () => {
      await handleRequest(
        () => registerVehicle(formData),  // The API call function
        {
          loadingMessage: "Adding your Vehicale...",
          successMessage: "Your registration has been completed. ",
          errorMessage: "There was an issue with your Vehicale registration. Please try again later."
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
      <div className="rounded-sm border  border-stroke bg-white  shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap  ">

          <div className="w-full  border-stroke dark:border-strokedark ">
            <div className="w-full  p-4 sm:p-12.5 xl:p-17.5">
              {/* <span className="mb-1.5 block font-medium">Start for free</span> */}
              <h2 className="mb-9 text-2xl font-bold  dark:text-white sm:text-title-xl2">
                {/* Sign Up to {appName} */}
                <BsTruck />  Add Lorry's in Your Account
              </h2>

              <form className='text-black   grid grid-cols-1 sm:grid-cols-2 gap-x-2' onSubmit={handleSubmit(onSubmit)}>
                {/* Lorry Number */}
                <InputField
                  type="text"
                  placeholder="Lorry number..."
                  label="Lorry Number"
                  className={`w-full capitalize rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus-visible:shadow-none 
    ${errors.lorry_number ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 " : " border-stroke focus:border-green-500 dark:focus:border-green-500 "} 
    dark:border-form-strokedark dark:bg-form-input dark:text-white uppercase `}
                  {...register("lorry_number", {
                    required: "Please enter the lorry number",
                    pattern: {
                      value: /^[A-Z]{2}\d{1,2}[A-Z]{1,2}\d{4}$/,
                      message: "Invalid lorry number format. Expected format: XX 00 XX 0000"
                    },
                    minLength: {
                      value: 10,
                      message: "Lorry number should be at least 10 characters long"
                    },
                    maxLength: {
                      value: 13,
                      message: "Lorry number should be at most 13 characters long"
                    }
                  })}
                  onChange={(e) => {
                    e.target.value = e.target.value.toUpperCase();
                    handleChange("lorry_number", e);
                  }}
                  icon={<FaAsterisk size={22} />}
                  errorSms={errors.lorry_number && <p className="text-red-500 text-xs mt-1 ">{errors.lorry_number.message}</p>}
                />


                {/* Owner Name */}
                <InputField
                  type="text"
                  placeholder="Owner name..."
                  label="Owner Name"
                  className={`w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus-visible:shadow-none 
          ${errors.owner_name ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 " : " border-stroke focus:border-green-500 dark:focus:border-green-500 "} 
          dark:border-form-strokedark dark:bg-form-input dark:text-white `}
                  {...register("owner_name", {
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
                  onChange={(e) => handleChange("owner_name", e)}
                  icon={<FaRegUser size={22} />}
                  errorSms={errors.owner_name && <p className="text-red-500 text-xs mt-1 ">{errors.owner_name.message}</p>}
                />

                {/* Mobile Number */}
                <InputField
                  type="tel"
                  placeholder="Owner Mobile number..."
                  label="Owner Mobile Number"
                  className={`w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus-visible:shadow-none 
                   ${errors.owner_mobile_number ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 " : " border-stroke focus:border-green-500 dark:focus:border-green-500 "} 
                    dark:border-form-strokedark dark:bg-form-input dark:text-white `}
                  {...register("owner_mobile_number", {
                    required: "Please enter the mobile number",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Please enter a valid 10-digit mobile number"
                    },
                  })}
                  onChange={(e) => handleChange("owner_mobile_number", e)}
                  icon={<FaPhoneAlt size={22} />}
                  errorSms={errors.owner_mobile_number && <p className="text-red-500 text-xs mt-1 ">{errors.owner_mobile_number.message}</p>}
                />


                {/* Owner Address */}
                <InputField
                  type="text"
                  placeholder="Owner address..."
                  label="Owner Address"
                  className={`w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus-visible:shadow-none 
          ${errors.owner_addres ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 " : " border-stroke focus:border-green-500 dark:focus:border-green-500 "} 
          dark:border-form-strokedark dark:bg-form-input dark:text-white `}
                  {...register("owner_addres", {
                    required: "Please enter the owner's address",
                  })}
                  onChange={(e) => handleChange("owner_addres", e)}
                  icon={<FaAddressCard size={22} />}
                  errorSms={errors.owner_addres && <p className="text-red-500 text-xs mt-1 ">{errors.owner_addres.message}</p>}
                />

                {/* Owner City */}
                <ApiSearchDropDown
                  apiUrl={CITY_API}
                  onSelect={handleSelect}
                  searchingKey="cityName"
                  setKey='owner_city'
                  className="w-full  rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10  outline-none focus:border-green-500 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-green-500"
                  icon={<FaCity size={22} />}
                  label="City"
                  optionIcon={<GiModernCity className=' me-2' />}

                />
                {/* <ApiSearchDropDown
                  apiUrl={CITY_API}
                  onSelect={handleSelect}
                  searchingKey="cityName"
                  setKey='owner_city'
                  className="w-full  rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10  outline-none focus:border-green-500 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-green-500"
                  icon={<FaCity size={22} />}
                  label="Vehicale Type"
                  optionIcon={<GiModernCity className=' me-2' />}
                /> */}

                <SelectInput
                  // apiUrl={CITY_API}
                  onSelect={handleSelect}
                  searchingKey="vehicale_type"
                  setKey='vehicale_type'
                  className="w-full  rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10  outline-none focus:border-green-500 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-green-500"
                  icon={<GiCartwheel size={22} />}
                  label="Vehicale Wheels"
                  option={vehicleTypes}
                  optionIcon={<GiCarWheel className=' me-2' />}
                />


                <SelectInput
                  // apiUrl={CITY_API}
                  onSelect={handleSelect}
                  searchingKey="length"
                  setKey='vehicale_length'
                  className="w-full  rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10  outline-none focus:border-green-500 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-green-500"
                  icon={<FaTruck size={22} />}
                  label="Vehicale Length"
                  option={vehicleLength}
                  optionIcon={<FaTruck className=' me-2' />}
                />

                <SelectInput
                  // apiUrl={CITY_API}
                  onSelect={handleSelect}
                  searchingKey="vehicale_capacity"
                  setKey='vehicale_capacity'
                  className="w-full  rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10  outline-none focus:border-green-500 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-green-500"
                  icon={<TbWeight size={22} />}
                  label="Vehicale Capacity"
                  option={vehicleCapacities}
                  optionIcon={<GiWeight className=' me-2' />}
                />


                <DatePicker
                  label="Permit Expire Date"
                  placeholder="Select permit expire date"
                  // onChange={(e) => handleChange("permit_expire_date", e)}
                  setValue={setValue}
                  setKey="permit_expire_date"
                  dateFormat="d M, Y"
                  className={`w-full cursor-pointer rounded-lg border bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:bg-white file:py-3 file:px-5 file:hover:bg-primary file:hover:text-white file:hover:bg-opacity-10
        ${errors.permit_expire_date ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 " : " border-stroke focus:border-green-500 dark:focus:border-green-500"} 
        disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white`}
                  {...register("permit_expire_date", {
                    required: "Please Select permit expire date",
                  })}
                  errorSms={errors.permit_expire_date && <p className="text-red-500 text-xs mt-1">{errors.permit_expire_date.message}</p>}
                />


                <DatePicker
                  label="Insurance Expire Date"
                  placeholder="Select Insurance expire date"
                  onChange={(e) => handleChange("insurance_expire_date", e)}
                  setKey="insurance_expire_date"
                  setValue={setValue}
                  dateFormat="d M, Y"
                  className={`w-full cursor-pointer rounded-lg border bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:bg-white file:py-3 file:px-5 file:hover:bg-primary file:hover:text-white file:hover:bg-opacity-10
        ${errors.insurance_expire_date ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 " : " border-stroke focus:border-green-500 dark:focus:border-green-500"} 
        disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white`}
                  {...register("insurance_expire_date", {
                    required: "Please Select insurance expire date",
                  })}
                  errorSms={errors.insurance_expire_date && <p className="text-red-500 text-xs mt-1">{errors.insurance_expire_date.message}</p>}

                />

                <DatePicker
                  label="Fitness Expire Date"
                  placeholder="Select fitness expire date"
                  // onChange={(e) => handleChange("fitness_expire_date", e)}
                  setValue={setValue}
                  setKey="fitness_expire_date"
                  dateFormat="d M, Y"
                  className={`w-full cursor-pointer rounded-lg border bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:bg-white file:py-3 file:px-5 file:hover:bg-primary file:hover:text-white file:hover:bg-opacity-10
        ${errors.fitness_expire_date ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 " : " border-stroke focus:border-green-500 dark:focus:border-green-500"} 
        disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white`}
                  {...register("fitness_expire_date", {
                    required: "Please Select fitness expire date",
                  })}
                  errorSms={errors.fitness_expire_date && <p className="text-red-500 text-xs mt-1">{errors.fitness_expire_date.message}</p>}

                />


                {/* Permit Photo */}
                <InputField
                  type="file"
                  placeholder="Permit photo "
                  accept="image/png, image/jpeg, image/jpg"
                  label="Permit Photo"
                  className={`w-full cursor-pointer rounded-lg border bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:bg-white file:py-3 file:px-5 file:hover:bg-primary file:hover:text-white file:hover:bg-opacity-10
                  ${errors.permit_photo ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 " : " border-stroke focus:border-green-500 dark:focus:border-green-500"} 
                  disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white`}
                  {...register("permit_photo", {
                    required: "Please enter the permit photo URL",
                  })}
                  // onChange={(e) => handleChange("permit_photo", e)}
                  icon={<FaImage size={22} />}
                  errorSms={errors.permit_photo && <p className="text-red-500 text-xs mt-1 ">{errors.permit_photo.message}</p>}
                />

                {/* Owner Photo */}
                <InputField
                  type="file"
                  placeholder="Owner photo "
                  accept="image/png, image/jpeg, image/jpg"
                  label="Owner Photo"
                  className={`w-full cursor-pointer rounded-lg border bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:bg-white file:py-3 file:px-5 file:hover:bg-primary file:hover:text-white file:hover:bg-opacity-10
                  ${errors.owner_photo ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 " : " border-stroke focus:border-green-500 dark:focus:border-green-500"} 
                  disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white`}
                  {...register("owner_photo", {
                    required: "Please enter the owner photo",
                  })}
                  // onChange={(e) => handleChange("permit_photo", e)}
                  icon={<FaImage size={22} />}
                  errorSms={errors.owner_photo && <p className="text-red-500 text-xs mt-1 ">{errors.owner_photo.message}</p>}
                />

                {/* <InputField
                  type="file"
                  placeholder="Owner photo "
                  label="Owner Photo"
                  accept="image/png, image/jpeg, image/jpg"
                  className={`w-full cursor-pointer rounded-lg border bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:bg-white file:py-3 file:px-5 file:hover:bg-primary file:hover:text-white file:hover:bg-opacity-10
                  ${errors.owner_photo ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 " : " border-stroke focus:border-green-500 dark:focus:border-green-500"} 
                  disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white`}
                  {...register("owner_photo", {
                    required: "Please enter the owner's photo URL",
                  })}
                  // onChange={(e) => handleChange("owner_photo", e)}
                  icon={<FaImage size={22} />}
                  errorSms={errors.owner_photo && <p className="text-red-500 text-xs mt-1 ">{errors.owner_photo.message}</p>}

                /> */}

                {/* Insurance Photo */}
                <InputField
                  type="file"
                  placeholder="Insurance photo URL..."
                  label="Insurance Photo"
                  accept="image/png, image/jpeg, image/jpg"
                  className={`w-full cursor-pointer rounded-lg border bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:bg-white file:py-3 file:px-5 file:hover:bg-primary file:hover:text-white file:hover:bg-opacity-10
                  ${errors.insurance_photo ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 " : " border-stroke focus:border-green-500 dark:focus:border-green-500"} 
                  disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white`}
                  {...register("insurance_photo", {
                    required: "Please enter the insurance photo URL",
                  })}
                  // onChange={(e) => handleChange("insurance_photo", e)}
                  icon={<FaImage size={22} />}
                  errorSms={errors.insurance_photo && <p className="text-red-500 text-xs mt-1 ">{errors.insurance_photo.message}</p>}

                />

                {/* Owner Pancard Number */}
                <InputField
                  type="text"
                  placeholder="Owner PAN card number..."
                  label="Owner Pancard Number"
                  className={`w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus-visible:shadow-none 
    ${errors.owner_pancard_number ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 " : " border-stroke focus:border-green-500 dark:focus:border-green-500 "} 
    dark:border-form-strokedark dark:bg-form-input dark:text-white `}  // 'uppercase' class added here
                  {...register("owner_pancard_number", {
                    required: "Please enter the owner's PAN card number",
                    pattern: {
                      value: /^[A-Z]{5}\d{4}[A-Z]{1}$/,
                      message: "Invalid PAN card number format"
                    },
                    minLength: {
                      value: 10,
                      message: "PAN card number should be 10 characters long"
                    },
                    maxLength: {
                      value: 10,
                      message: "PAN card number should be 10 characters long"
                    }
                  })}
                  onChange={(e) => {
                    // Convert the value to uppercase before validation
                    e.target.value = e.target.value.toUpperCase();
                    handleChange("owner_pancard_number", e); // Assuming this handles the value update
                  }}
                  icon={<FaCreditCard size={22} />}
                  errorSms={errors.owner_pancard_number && (
                    <p className="text-red-500 text-xs mt-1 ">
                      {errors.owner_pancard_number.message}
                    </p>
                  )}
                />




                {/* Aadhar Card Number */}
                <InputField
                  type="number"
                  placeholder="Aadhar card number..."
                  label="Aadhar Card Number"
                  className={`w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus-visible:shadow-none 
          ${errors.aadharcard_number ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 " : " border-stroke focus:border-green-500 dark:focus:border-green-500 "} 
          dark:border-form-strokedark dark:bg-form-input dark:text-white `}
                  {...register("aadharcard_number", {
                    required: "Please enter the Aadhar card number",
                    pattern: {
                      value: /^\d{12}$/,
                      message: "Aadhar card number should be 12 digits long"
                    }
                  })}
                  onChange={(e) => handleChange("aadharcard_number", e)}
                  icon={<FaIdCard size={22} />}
                  errorSms={errors.aadharcard_number && <p className="text-red-500 text-xs mt-1 ">{errors.aadharcard_number.message}</p>}

                />

                <div className="my-5 col-span-full">
                  <input
                    type="submit"
                    value="Add Lorry"
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
