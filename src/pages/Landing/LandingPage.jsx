import React from 'react';
// import { FaTruck, FaCog, FaUsers, FaShieldAlt } from 'react-icons/fa';
import truc_banner from "../../images/appimg/truck_banner.webp"
import { IoMdAddCircle } from 'react-icons/io';
import { GiChecklist } from 'react-icons/gi';
import { Link } from "react-router-dom";
import Screenshot1 from "../../images/appScht/screenshot1.png";
import Screenshot2 from "../../images/appScht/screenshot2.png";
import Screenshot3 from "../../images/appScht/screenshot3.png";
import Screenshot4 from "../../images/appScht/screenshot4.png";
import Screenshot5 from "../../images/appScht/screenshot5.png";
import Screenshot6 from "../../images/appScht/screenshot6.png";
import {
    FaTruck,
    FaCog,
    FaUsers,
    FaShieldAlt,
    FaCalendarAlt,
    FaFileExcel,
    FaCalculator,
    FaBuilding,
} from "react-icons/fa";
import { motion } from "framer-motion";

const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const stagger = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 },
    },
};

const LandingPage = () => {
    const screenshots = [
        Screenshot1,
        Screenshot2,
        Screenshot3,
        Screenshot4,
        Screenshot5,
        Screenshot6,
    ];
    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen flex flex-col">
            {/* Header Section */}
            {/* <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 shadow-lg">
                <div className="container mx-auto flex justify-between items-center">
                    <motion.h1
                        className="text-3xl font-extrabold"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        TransBook
                    </motion.h1>
                    <nav>
                        <ul className="flex space-x-6 text-lg">
                            {["Features", "About", "Contact"].map((item, index) => (
                                <motion.li
                                    key={index}
                                    initial="hidden"
                                    animate="visible"
                                    variants={fadeIn}
                                >
                                    <a href={`#${item.toLowerCase()}`} className="hover:underline">
                                        {item}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </header> */}

            {/* Hero Section */}
            <section
                className="bg-cover bg-center h-[70vh] flex items-center justify-center text-white relative"
                style={{ backgroundImage: `url(https://img.freepik.com/premium-photo/wireframe-grand-tour-bus-moving-fast-dark-blue-background_207634-5535.jpg?w=826)` }}
            >
                <div className="absolute inset-0 bg-black/40 z-0" />
                <div className="relative z-10 text-center">
                    <motion.h2
                        className="text-5xl font-extrabold mb-6"
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                    >
                        Empower Your Transport Business
                    </motion.h2>
                    <motion.p
                        className="text-lg mb-8"
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                    >
                        Simplify transport management with tools tailored for you.
                    </motion.p>
                    <Link
                        to="/auth/signup"
                        className="bg-gradient-to-r from-indigo-600 to-blue-500 px-8 py-4 text-lg rounded-full shadow-md hover:scale-105 transition-transform"
                    >
                        Get Started
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <motion.section
                id="features"
                className="py-16 bg-gray-100"
                initial="hidden"
                animate="visible"
                variants={stagger}
            >
                <div className="container mx-auto">
                    <motion.h2
                        className="text-4xl font-extrabold text-center mb-12"
                        variants={fadeIn}
                    >
                        Key Features
                    </motion.h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: <FaTruck className="text-blue-500 text-5xl mb-4" />,
                                title: "Manage Vehicles",
                                description: "Add, track, and manage your fleet effortlessly.",
                            },
                            {
                                icon: <FaCalendarAlt className="text-blue-500 text-5xl mb-4" />,
                                title: "Estimate Arrival",
                                description: "Track vehicle arrival times accurately.",
                            },
                            {
                                icon: <FaUsers className="text-blue-500 text-5xl mb-4" />,
                                title: "Party Management",
                                description: "Keep your transport parties organized.",
                            },
                            {
                                icon: <FaFileExcel className="text-blue-500 text-5xl mb-4" />,
                                title: "Trip History in Excel",
                                description: "Download your trip records in a click.",
                            },
                            {
                                icon: <FaCalculator className="text-blue-500 text-5xl mb-4" />,
                                title: "Trip Cost Calculator",
                                description: "Calculate trip expenses with ease.",
                            },
                            {
                                icon: <FaBuilding className="text-blue-500 text-5xl mb-4" />,
                                title: "Digital Business Card",
                                description: "Create and share your business identity digitally.",
                            },
                            {
                                icon: <FaShieldAlt className="text-blue-500 text-5xl mb-4" />,
                                title: "Data Security",
                                description: "Keep your data safe and secure.",
                            },
                            {
                                icon: <FaCog className="text-blue-500 text-5xl mb-4" />,
                                title: "Customizable Plans",
                                description: "Adapt features to meet your business needs.",
                            },
                        ].map((feature, index) => (
                            <div className='bg-white'>
                                <motion.div
                                    key={index}
                                    className="  bg-gradient-to-r from-blue-500 to-pink-500 text-transparent bg-clip-text p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all"
                                    variants={fadeIn}
                                >
                                    {feature.icon}
                                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                    <p>{feature.description}</p>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* App Screens Section */}
            <section id="screens" className="py-16 bg-gray-50">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-extrabold mb-12">Screenshots</h2>
                    <div className="flex overflow-x-auto space-x-4 px-6">
                        {screenshots.map((screenshot, index) => (
                            <motion.div
                                key={index}
                                className="min-w-[200px] bg-white rounded-lg shadow-lg overflow-hidden"
                                variants={fadeIn}
                            >
                                <img
                                    src={screenshot}
                                    alt={`App Screen ${index + 1}`}
                                    className="w-full h-auto object-cover"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-6 text-center">
                <p>&copy; {new Date().getFullYear()} TransBook. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
