import React, { useState } from 'react';
import { FaPhone, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import QRCode from 'react-qr-code';
import { useSelector } from 'react-redux';
import { handleShare } from '../../../../util/ShareAndDownload';

const BusinessCard = () => {
    const { logo, avatar, company_name, owner_name, route, mobile_number, email: userEmail, city } = useSelector((state) => state.auth.user)
    const [profileImg, setProfileImg] = useState(avatar);
    const [name, setName] = useState(owner_name);
    const [contact, setContact] = useState(mobile_number);
    const [email, setEmail] = useState(userEmail);
    const [address, setAddress] = useState(city?.cityName + " " + city?.stateShortName);
    const [qrData, setQrData] = useState(mobile_number);
    const [bgImg, setBgImg] = useState('');
    const [textColor, setTextColor] = useState('#ffffff'); // Default to white

    return (
        <div style={{ color: textColor }} className={`flex flex-col items-center gap-6 p-4 bg-gray-100 min-h-screen `}>
            {/* Business Card Display */}
            <div id='visiting-card'
                className="w-[3.5in] h-[2in] flex flex-col items-center  shadow-lg  bg-black bg-opacity-50  p-3 rounded-lg overflow-hidden"
                style={{
                    backgroundImage: `url(${bgImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="w-full h-full flex justify-end ">
                    {/* Profile Image */}
                    {profileImg && (
                        <img
                            src={profileImg}
                            alt="Profile"
                            className="w-16 h-16 rounded-full border-2 border-white shadow-lg mr-4"
                        />
                    )}


                    {/* Card Details */}
                    <div className="flex-1 w-full ">
                        {/* Name */}
                        <h2 className="text-xl font-bold ">{name}</h2>
                        {/* transport name */}
                        <h2 className="text-xl font-bold">{company_name}</h2>

                        {/* Contact Info */}
                        <div className="text-sm mt-2 space-y-1 leading-none ">
                            {contact && (
                                <p className="flex items-center gap-2 justify-end">
                                    <FaPhone /> {contact}
                                </p>
                            )}
                            {email && (
                                <p className="flex items-center gap-2 justify-end">
                                    <FaEnvelope /> {email}
                                </p>
                            )}
                            {address && (
                                <p className="flex items-center gap-2 justify-end">
                                    <FaMapMarkerAlt /> {address}
                                </p>
                            )}

                        </div>
                        {/* QR Code - Full Width */}
                        {qrData && (
                            <div className="ml-4 p-1 flex justify-end    rounded ">
                                <QRCode value={qrData} size={40} />
                            </div>
                        )}

                    </div>

                </div>
                <p className='w-[3in] mt-[-8px]    '>{route} </p>
            </div>

            <div className=' w-full flex gap-4 overflow-x-auto scrollbar-hide  '>
                <img onClick={(e) => setBgImg(e.target.src)} className='w-[3.5in] h-[2in] flex items-center  rounded-lg shadow-lg' src='https://tse3.mm.bing.net/th?id=OIP.BC4HN-c_bAqWQw0w1KVOjAHaDe&pid=Api&P=0&h=180' />
                <img onClick={(e) => setBgImg(e.target.src)} className='w-[3.5in] h-[2in] flex items-center  rounded-lg shadow-lg' src='https://tse1.mm.bing.net/th?id=OIP.XrL0XUrc14xJr7I5bEJUUwHaDe&pid=Api&P=0&h=180' />
                <img onClick={(e) => setBgImg(e.target.src)} className='w-[3.5in] h-[2in] flex items-center  rounded-lg shadow-lg' src='https://tse1.mm.bing.net/th?id=OIP.bPp7RCh2IOcsD4YnfUwu5AAAAA&pid=Api&P=0&h=180' />
                <img onClick={(e) => setBgImg(e.target.src)} className='w-[3.5in] h-[2in] flex items-center  rounded-lg shadow-lg' src='https://tse4.mm.bing.net/th?id=OIP.J8ciI-hxuJeFpQeRE_tzhAHaDe&pid=Api&P=0&h=180' />
                <img onClick={(e) => setBgImg(e.target.src)} className='w-[3.5in] h-[2in] flex items-center  rounded-lg shadow-lg' src='https://tse2.mm.bing.net/th?id=OIP.due4SAQELCQkyKXyob9CvwHaE7&pid=Api&P=0&h=180' />
            </div>

            {/* Input Form for Business Card Details */}
            {/* <div className="flex flex-col gap-2 w-full max-w-md p-4 bg-white shadow-lg rounded-lg">
                <input
                    type="text"
                    placeholder="Profile Image URL"
                    value={profileImg}
                    onChange={(e) => setProfileImg(e.target.value)}
                    className="border rounded p-2"
                />
                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border rounded p-2"
                />
                <input
                    type="text"
                    placeholder="Contact Number"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="border rounded p-2"
                />
                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border rounded p-2"
                />
                <input
                    type="text"
                    placeholder="Physical Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="border rounded p-2"
                />
                <input
                    type="text"
                    placeholder="QR Code Data (URL or Text)"
                    value={qrData}
                    onChange={(e) => setQrData(e.target.value)}
                    className="border rounded p-2"
                />
                <input
                    type="text"
                    placeholder="Background Image URL"
                    value={bgImg}
                    onChange={(e) => setBgImg(e.target.value)}
                    className="border rounded p-2"
                />
            </div> */}
            <label htmlFor="favcolor" className="mb-2">Select your favorite color:</label>

            <input
                onChange={(e) => setTextColor(e.target.value)}
                type="color"
                id="favcolor"
                name="favcolor"
                value={textColor}
            />

            <button onClick={() => handleShare('visiting-card', 'visiting-card')} className=' btn w-full text-black golden-gradian rounded-lg py-2 '> Shear</button>
        </div>
    );
};

export default BusinessCard;
