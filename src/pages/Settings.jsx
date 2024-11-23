import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import userThree from '../images/user/user-03.png';
import { useUpdateAvatarMutation, useUpdateLogoMutation, useUpdateUserInfoMutation } from '../services/user.service';
import { Modal } from '../components/popups/Modal';
import { FaUserEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { FaLandmark, } from 'react-icons/fa';
import InputField from '../components/Forms/formsInputs/InputField';
import { ApiSearchDropDown } from '../components/Forms/formsInputs';
import { useForm } from 'react-hook-form';
import { FaRegUser, FaRoadCircleCheck, } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import { MdImageSearch, MdOutlineMobileScreenShare, MdOutlineHomeWork, MdLockOutline, MdOutlineMailOutline, MdOutlineDescription } from "react-icons/md";
import InputTextarea from '../components/Forms/formsInputs/InputTextarea';
// import { showSuccessAlert } from '../../components/Aleart/Sweeralert';
import { appInfo } from '../common/appInfo/app.info';
import { useRegisterMutation } from '../services/auth-service';
import { Field } from '@headlessui/react';
import { TrukErrorDialog, TrukLoaderMoveForword, TrukProcessDialog } from '../components/loaders/truck_move_forword';
import { handleRequest } from '../util/handleRequest';
import { CITY_API } from '../util/config';
import { AllInOneLogo } from '../components/Logo/Logo';

const Settings = () => {

  const [logoUpload, setLogo] = useState(null)
  const [avatarUpload, setAvatar] = useState(null)
  const [preview, setPreview] = useState(null);
  const [uploadFileName, setUploadFileName] = useState(null);
  const { logo, avatar, description, address, email, mobile_number, owner_name, company_name, city: transpoterCity, route, user_code } = useSelector((state) => state.auth.user || {})
  const [updateLogo, { data: logoData, isLoading: logoLoading, isError: logoError, isSuccess: logoSuccess }] = useUpdateLogoMutation();
  const [updateAvatar, { data: AvatarData, isLoading: AvatarLoading, isError: AvatarError, isSuccess: AvatarSuccess }] = useUpdateAvatarMutation();
  const [updateUserInfo, { data: UserInfo, isLoading: UserInfoLoading, isError: UserInfoError, isSuccess: UserInfoSuccess }] = useUpdateUserInfoMutation();


  const { register, setValue, setError, getValues, clearErrors, handleSubmit, formState: { errors } } = useForm({ logo, avatar, description, email, mobile_number, owner_name, company_name, city: transpoterCity, route, user_code });


  const handleSelect = (setKey, option) => {
    console.log(setKey, option);
    setValue(setKey, option, { shouldValidate: true });
  };

  const handleChange = (fieldName, e) => {
    let value = e.target.value
    setValue(fieldName, value, { shouldValidate: true });
  };

  const onUpdateUserInfo = async (data) => {

    const handleFormSubmission = async () => {
      await handleRequest(
        () => updateUserInfo(data),  // The API call function
        {
          loadingMessage: "Updating your Information...",
          successMessage: "Your Information has been Updated.",
          errorMessage: "There was an issue with your Updating. Please try again later."
        }
      );
    };

    handleFormSubmission()




    // showSuccessAlert();

    // try {
    //   setLoading(true);
    //   TrukLoaderMoveForword("Loading your data...");
    //   const response = await registation(formData); // Ensure `registation` handles FormData correctly
    //   console.log("response", response);
    //   // Simulate a successful process
    //   TrukProcessDialog("Process Complete", "Your data has been loaded successfully.");
    // } catch (error) {
    //   console.log('error', error)
    //   TrukErrorDialog("Failed to load data", "<p>There was an issue with the server. Please try again later.</p>");
    // } finally {
    //   setLoading(false);
    // }




  };

  // const reader = new FileReader();
  const handleFileChange = (e) => {
    // Get the selected file from the input element
    const file = e.target.files[0];
    const name = e.target.name
    setUploadFileName(name)
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result); // Set the preview URL
      };
      reader.readAsDataURL(file); // Read the file as a data URL

      if (name === 'logo') {
        setLogo(file);
      } else if (name === 'avatar') {
        setAvatar(file)
      }

    }

  };

  const onSubmit = async () => {
    const formData = new FormData();

    // for (const key in data) {
    //   if (key === 'logo') {
    //     formData.append(key, data[key][0]); // Assuming `data[key]` is a FileList
    //   } else if (key === 'city') {
    //     formData.append(key, JSON.stringify(data[key])); // Convert city object to JSON
    //   } else {
    //     formData.append(key, data[key]);
    //   }
    // }

    if (uploadFileName === 'logo') {
      formData.append('logo', logoUpload); // Assuming `data[key]` is a FileList
    } else if (uploadFileName === 'avatar') {
      formData.append('avatar', avatarUpload); // Assuming `data[key]` is a FileList
    }

    const handleUbdateLogo = async () => {
      await handleRequest(
        () => updateLogo(formData),  // The API call function
        {
          loadingMessage: "Updating  your Logo...",
          successMessage: "Your Updating has been completed. ",
          errorMessage: "There was an issue with your Logo Update. Please try again later."
        }
      );
    };

    const handleUbdateAvatar = async () => {
      await handleRequest(
        () => updateAvatar(formData),  // The API call function
        {
          loadingMessage: "Updating  your Profile Photo...",
          successMessage: "Your Updating has been completed. ",
          errorMessage: "There was an issue with your Profile Photo Update. Please try again later."
        }
      );
    };

    if (uploadFileName === 'logo') {
      handleUbdateLogo()
    } else if (uploadFileName === 'avatar') {
      handleUbdateAvatar()
    }

  };

  const onClose = () => setPreview(null);

  return (
    <>
      <Modal isOpen={preview} onClose={onClose}>
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
          Upload Logo,Banner,Visiting card,
        </h2>

        <div className="min:max-w-sm flex flex-col items-center justify-center">

          {preview ? (
            <img
              src={preview}
              alt="Logo Preview"
              className="w-50 h-auto rounded-lg"
            />
          ) : (
            <p className="text-gray-500">No image selected</p>
          )}

          <Link
            to="#"
            onClick={onSubmit}
            className="inline-flex rounded-lg items-center justify-center gap-2.5 bg-primary py-2 mt-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            <FaUserEdit />
            Update
          </Link>
        </div>
      </Modal>




      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Settings" />
        <div className="grid grid-cols-5 gap-8">

          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Personal Information
                </h3>
              </div>
              <div className="p-7">
                <form className=' text-black' onSubmit={handleSubmit(onUpdateUserInfo)}>
                  {/* <div className="mb-4 ">
                  <label className="mb-2.5 block font-medium  dark:text-white">
                    Owner  Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10  outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M11.0008 9.52185C13.5445 9.52185 15.607 7.5281 15.607 5.0531C15.607 2.5781 13.5445 0.584351 11.0008 0.584351C8.45703 0.584351 6.39453 2.5781 6.39453 5.0531C6.39453 7.5281 8.45703 9.52185 11.0008 9.52185ZM11.0008 2.1656C12.6852 2.1656 14.0602 3.47185 14.0602 5.08748C14.0602 6.7031 12.6852 8.00935 11.0008 8.00935C9.31641 8.00935 7.94141 6.7031 7.94141 5.08748C7.94141 3.47185 9.31641 2.1656 11.0008 2.1656Z"
                            fill=""
                          />
                          <path
                            d="M13.2352 11.0687H8.76641C5.08828 11.0687 2.09766 14.0937 2.09766 17.7719V20.625C2.09766 21.0375 2.44141 21.4156 2.88828 21.4156C3.33516 21.4156 3.67891 21.0719 3.67891 20.625V17.7719C3.67891 14.9531 5.98203 12.6156 8.83516 12.6156H13.2695C16.0883 12.6156 18.4258 14.9187 18.4258 17.7719V20.625C18.4258 21.0375 18.7695 21.4156 19.2164 21.4156C19.6633 21.4156 20.007 21.0719 20.007 20.625V17.7719C19.9039 14.0937 16.9133 11.0687 13.2352 11.0687Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div> */}


                  <InputField
                    type="text"
                    placeholder="Enter Owner  Name..."
                    label="Owner Name"
                    className={`w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus-visible:shadow-none 
                        ${errors.owner_name ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 " : " border-stroke focus:border-green-500 dark:focus:border-green-500 "} 
                       dark:border-form-strokedark dark:bg-form-input dark:text-white `}
                    {...register("owner_name", {
                      value: owner_name,
                      required: "Please Enter Owner Name",
                      minLength: {
                        value: 3,
                        message: "Name should be greater than 3 letter"
                      },
                      maxLength: {
                        value: 40,
                        message: "Name should be less than 40 letter"
                      }
                    })}
                    onChange={(e) => handleChange("owner_name", e)}
                    icon={<FaRegUser className=" " size={25} />}
                  />
                  {errors.owner_name && <p id="username-error" className="text-red-500 text-xs mt-1 ">{errors.owner_name.message}</p>}

                  <InputField
                    type="text"
                    placeholder="Enter Company Name..."
                    label="Company Name"
                    className={`w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus-visible:shadow-none 
                        ${errors.company_name ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 " : " border-stroke focus:border-green-500 dark:focus:border-green-500 "} 
                       dark:border-form-strokedark dark:bg-form-input dark:text-white `}
                    {...register("company_name", {
                      value: company_name,
                      required: "Please Enter Owner Name",
                      minLength: {
                        value: 3,
                        message: "Name should be greater than 3 letter"
                      },
                      maxLength: {
                        value: 40,
                        message: "Name should be less than 40 letter"
                      }
                    })}
                    onChange={(e) => handleChange("company_name", e)}
                    icon={<MdOutlineHomeWork className=" " size={25} />}
                  />
                  {errors.company_name && <p id="username-error" className="text-red-500 text-xs mt-1 ">{errors.company_name.message}</p>}


                  {/* <div className="mb-4">
                  <label className="mb-2.5 block font-medium  dark:text-white">
                    Company Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10  outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M11.0008 9.52185C13.5445 9.52185 15.607 7.5281 15.607 5.0531C15.607 2.5781 13.5445 0.584351 11.0008 0.584351C8.45703 0.584351 6.39453 2.5781 6.39453 5.0531C6.39453 7.5281 8.45703 9.52185 11.0008 9.52185ZM11.0008 2.1656C12.6852 2.1656 14.0602 3.47185 14.0602 5.08748C14.0602 6.7031 12.6852 8.00935 11.0008 8.00935C9.31641 8.00935 7.94141 6.7031 7.94141 5.08748C7.94141 3.47185 9.31641 2.1656 11.0008 2.1656Z"
                            fill=""
                          />
                          <path
                            d="M13.2352 11.0687H8.76641C5.08828 11.0687 2.09766 14.0937 2.09766 17.7719V20.625C2.09766 21.0375 2.44141 21.4156 2.88828 21.4156C3.33516 21.4156 3.67891 21.0719 3.67891 20.625V17.7719C3.67891 14.9531 5.98203 12.6156 8.83516 12.6156H13.2695C16.0883 12.6156 18.4258 14.9187 18.4258 17.7719V20.625C18.4258 21.0375 18.7695 21.4156 19.2164 21.4156C19.6633 21.4156 20.007 21.0719 20.007 20.625V17.7719C19.9039 14.0937 16.9133 11.0687 13.2352 11.0687Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div> */}








                  <InputField
                    type="email"
                    placeholder="Enter Email..."
                    label="Email"
                    className={`w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus-visible:shadow-none 
                       ${errors.email ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 " : " border-stroke focus:border-green-500 dark:focus:border-green-500 "} 
                     dark:border-form-strokedark dark:bg-form-input dark:text-white`}

                    {...register("email", {
                      value: email,
                      required: "Please Enter Email id",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Regular expression for email validation
                        message: "Please Enter valid Email id"
                      }
                    })}
                    onChange={(e) => handleChange("email", e)}
                    icon={<MdOutlineMailOutline className="text-gray-500" size={22} />
                    }
                    errorSms={errors.email && <p id="username-error" className="text-red-500 text-xs mt-1 ">{errors.email.message}</p>}

                  />


                  {/* <ApiSearchDropDown
                    apiUrl={CITY_API}
                    onSelect={handleSelect}
                    searchingKey="cityName"
                    setKey='city'
                    label="City"
                    className="w-full  rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10  outline-none focus:border-green-500 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-green-500"
                    icon={<IoSearchSharp className="text-gray-500 mt-3" size={22} />}
                  /> */}

                  <InputTextarea
                    type="text"
                    placeholder="Enter address..."
                    rows={2}
                    label="Address"
                    className={`w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus-visible:shadow-none 
                        ${errors.address ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 " : " border-stroke focus:border-green-500 dark:focus:border-green-500 "} 
                       dark:border-form-strokedark dark:bg-form-input dark:text-white `}
                    {...register("address", {
                      value: address,
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
                  />
                  {errors.address && <p id="username-error" className="text-red-500 text-xs mt-1 ">{errors.address.message}</p>}


                  <InputTextarea
                    type="text"
                    placeholder="Enter Description About Your Company..."
                    rows={6}
                    label="Description About Your Company"
                    className={`w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus-visible:shadow-none 
                        ${errors.description ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 " : " border-stroke focus:border-green-500 dark:focus:border-green-500  "} 
                       dark:border-form-strokedark dark:bg-form-input dark:text-white `}
                    {...register("description", {
                      value: description,
                      required: "Please Enter Address",
                      minLength: {
                        value: 10,
                        message: "Address be greater than 10 letter"
                      },
                      maxLength: {
                        value: 2000,
                        message: "Address should be less than 200 letter"
                      }
                    })}
                    onChange={(e) => handleChange("description", e)}
                    icon={<MdOutlineDescription className=" " size={25} />}
                    errorSms={errors.description && <p id="username-error" className="text-red-500 text-xs mt-1 ">{errors.description.message}</p>}

                  />


                  <InputTextarea
                    type="text"
                    placeholder="Ex: Pune indore surat all India..."
                    rows={6}
                    label="Enter Your Transport Route"
                    className={`w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus-visible:shadow-none 
                        ${errors.route ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 " : " border-stroke focus:border-green-500 dark:focus:border-green-500  "} 
                       dark:border-form-strokedark dark:bg-form-input dark:text-white `}
                    {...register("route", {
                      value: route,
                      required: "Please Enter Address",
                      minLength: {
                        value: 8,
                        message: "Route be greater than 8 letter"
                      },
                      maxLength: {
                        value: 2000,
                        message: "Route should be less than 2000 letter"
                      }
                    })}
                    onChange={(e) => handleChange("route", e)}
                    icon={<FaRoadCircleCheck className=" " size={25} />}
                    errorSms={errors.route && <p id="route-error" className="text-red-500 text-xs mt-1 ">{errors.route.message}</p>}

                  />






                  {/* <InputField
                    type="password"
                    placeholder="Enter your password..."
                    label="Password"
                    className={`w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus-visible:shadow-none 
    ${errors.password ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 " : " border-stroke focus:border-green-500 dark:focus:border-green-500 "} 
    dark:border-form-strokedark dark:bg-form-input dark:text-white`}
                    {...register("password", {
                      required: "Please enter a password",
                      minLength: {
                        value: 4,
                        message: "Password must be at least 4 characters",
                      },
                    })}
                    onChange={(e) => handleChange("password", e)}
                    icon={<MdLockOutline className="text-gray-500" size={22} />}
                    errorSms={errors.password && <p id="password-error" className="text-red-500 text-xs mt-1">{errors.password.message}</p>}

                  />

                  <InputField
                    type="password"
                    placeholder="Re-type your password..."
                    label="Re-type Password"
                    className={`w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus-visible:shadow-none 
    ${errors.retype_password ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 " : " border-stroke focus:border-green-500 dark:focus:border-green-500 "} 
    dark:border-form-strokedark dark:bg-form-input dark:text-white`}
                    {...register("retype_password", {
                      required: "Please re-type your password",
                      validate: value =>
                        value === getValues("password") || "Passwords do not match",
                    })}
                    onChange={(e) => handleChange("retype_password", e)}
                    icon={<MdLockOutline className="text-gray-500" size={22} />}
                    errorSms={errors.retype_password && <p id="retype-password-error" className="text-red-500 text-xs mt-1">{errors.retype_password.message}</p>}

                  /> */}


                  <div className="my-5">
                    <input
                      type="submit"
                      value="Update Information"
                      className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                    />
                  </div>




                </form>
                {/* <form action="#">
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        Full Name
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <svg
                            className="fill-current"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.8">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                                fill=""
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                                fill=""
                              />
                            </g>
                          </svg>
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="fullName"
                          id="fullName"
                          placeholder="Devid Jhon"
                          defaultValue="Devid Jhon"
                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Phone Number
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        placeholder="+990 3343 7865"
                        defaultValue="+990 3343 7865"
                      />
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="emailAddress"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="email"
                        name="emailAddress"
                        id="emailAddress"
                        placeholder="devidjond45@gmail.com"
                        defaultValue="devidjond45@gmail.com"
                      />
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Username"
                    >
                      Username
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="Username"
                      id="Username"
                      placeholder="devidjhon24"
                      defaultValue="devidjhon24"
                    />
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Username"
                    >
                      BIO
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8" clipPath="url(#clip0_88_10224)">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                              fill=""
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_88_10224">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>

                      <textarea
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        name="bio"
                        id="bio"
                        rows={6}
                        placeholder="Write your bio here"
                        defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere fermentum urna, eu condimentum mauris tempus ut. Donec fermentum blandit aliquet."
                      ></textarea>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="submit"
                    >
                      Cancel
                    </button>
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </form> */}
              </div>
            </div>
          </div>

          <div className=' col-span-5 xl:col-span-2'>
            <div className="col-span-5 xl:col-span-2">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Your Photo
                  </h3>
                </div>
                <div className="p-7">
                  <form action="#">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="h-14 w-14 rounded-full">
                        <img src={avatar} alt="User" />
                      </div>
                      <div>
                        <span className="mb-1.5 text-black dark:text-white">
                          Edit your photo
                        </span>
                        <span className="flex gap-2.5">
                          <button className="text-sm hover:text-primary">
                            Delete
                          </button>
                          <button className="text-sm hover:text-primary">
                            Update
                          </button>
                        </span>
                      </div>
                    </div>

                    <div
                      id="FileUpload"
                      className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        name="logo"
                        onChange={handleFileChange}
                        className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                      />
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                              fill="#3C50E0"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                              fill="#3C50E0"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                              fill="#3C50E0"
                            />
                          </svg>
                        </span>
                        <p>
                          <span className="text-primary">Click to upload</span> or
                          drag and drop
                        </p>
                        <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                        <p>(max, 800 X 800px)</p>
                      </div>
                    </div>

                    <div className="flex justify-end gap-4.5">
                      <button
                        className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                        type="submit"
                      >
                        Cancel
                      </button>
                      <button
                        className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                        type="submit"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>


            <div className="col-span-5 xl:col-span-2">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Your Logo, Banner, Visiting card
                  </h3>
                </div>
                <div className="p-7">
                  <form action="#">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="h-14 w-14 rounded-full">
                        <img src={logo} alt="User" />
                      </div>
                      <div>
                        <span className="mb-1.5 text-black dark:text-white">
                          Edit your photo
                        </span>
                        <span className="flex gap-2.5">
                          <button className="text-sm hover:text-primary">
                            Delete
                          </button>
                          <button className="text-sm hover:text-primary">
                            Update
                          </button>
                        </span>
                      </div>
                    </div>

                    <div
                      id="FileUpload"
                      className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                    >
                      <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                      />
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                              fill="#3C50E0"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                              fill="#3C50E0"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                              fill="#3C50E0"
                            />
                          </svg>
                        </span>
                        <p>
                          <span className="text-primary">Click to upload</span> or
                          drag and drop
                        </p>
                        <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                        <p>(max, 800 X 800px)</p>
                      </div>
                    </div>

                    <div className="flex justify-end gap-4.5">
                      <button
                        className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                        type="submit"
                      >
                        Cancel
                      </button>
                      <button
                        className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                        type="submit"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Settings;
