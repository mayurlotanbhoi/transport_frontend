import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { handleShare } from '../../../../util/ShareAndDownload';

export const PostLoadCard = () => {
    const [loadDetails, setLoadDetails] = useState({
        origin: '',
        destination: '',
        loadType: '',
        weight: '',
        price: '',
    });
    const { logo, company_name, owner_name } = useSelector((state) => state?.auth?.user)


    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoadDetails({ ...loadDetails, [name]: value });
    };

    // WhatsApp share handler
    // const shareOnWhatsApp = () => {
    //     const { origin, destination, loadType, weight, price } = loadDetails;
    //     const message = `🚛 *Load Details* 🚛\n\n` +
    //         `*From:* ${origin}\n` +
    //         `*To:* ${destination}\n` +
    //         `*Load Type:* ${loadType}\n` +
    //         `*Weight:* ${weight} tons\n` +
    //         `*Price:* ₹${price}\n\n` +
    //         `Contact us for more details!`;

    //     const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    //     window.open(whatsappUrl, '_blank');
    // };

    return (
        <>
            <div className=" w-full h-[100%]  flex justify-center my-4">
                <div id='load_shear' className=" w-full sm:max-w-md h-[100%]  relative rounded-lg bg-white border border-dashed border-golden-gradian">
                    <Link
                        className="flex items-center gap-4 px-4 py-2 rounded-lg golden-gradian"
                        to="#"
                    >
                        <span className="h-12 w-12 rounded-full overflow-hidden">
                            <img className="h-12 w-12 rounded-full" src={logo} alt="User" />
                        </span>
                        <span>
                            <span className="block text-xl font-medium text-black dark:text-white">
                                {company_name}
                            </span>
                            <span className="block text-xs">{owner_name}</span>
                        </span>
                    </Link>
                    <div className=" w-full max-w-full p-4 text-center bg-white rounded-lg shadow-md dark:bg-gray-800">
                        <span className="block w-full text-lg font-semibold text-gray-700 dark:text-gray-300 break-words">
                            {loadDetails.load_detail}
                        </span>
                    </div>



                    <div className="w-full golden-gradian rounded-lg  flex items-center justify-center text-center gap-4 px-4 py-2">
                        <p className="font-medium text-gray-800 dark:text-gray-200">Contact: 7709433561</p>
                    </div>
                </div>
            </div>



            <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Post a Load</h2>

                {/* <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Origin</label>
                    <input
                        type="text"
                        name="origin"
                        value={loadDetails.origin}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="City of origin"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Destination</label>
                    <input
                        type="text"
                        name="destination"
                        value={loadDetails.destination}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Destination city"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Load Type</label>
                    <input
                        type="text"
                        name="loadType"
                        value={loadDetails.loadType}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Type of load"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Weight (tons)</label>
                    <input
                        type="number"
                        name="weight"
                        value={loadDetails.weight}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Load weight"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                    <input
                        type="number"
                        name="price"
                        value={loadDetails.price}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Price"
                    />
                </div> */}

                <div className="mb-5.5">
                    <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="Username"
                    >
                        Load Detail
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
                            name="load_detail"
                            id="load_detail"
                            rows={6}
                            value={loadDetails.load_detail}
                            onChange={handleChange}
                            placeholder="Write your bio here"
                        // defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere fermentum urna, eu condimentum mauris tempus ut. Donec fermentum blandit aliquet."
                        ></textarea>
                    </div>
                </div>

                <button
                    onClick={() => handleShare('load_shear', 'load_shear')}
                    className=' btn w-full text-black golden-gradian rounded-lg py-2 '> Shear</button>
            </div>
        </>
    );
};

//  default PostLoadCard;
