import React from 'react';
import { FaTruck, FaCog, FaUsers, FaShieldAlt } from 'react-icons/fa';
import truc_banner from "../../images/appimg/truck_banner.webp"
import { IoMdAddCircle } from 'react-icons/io';
import { GiChecklist } from 'react-icons/gi';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            {/* Header Section */}
            {/* <header className="bg-blue-600 text-white p-6">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Transporter Hub</h1>
                    <nav>
                        <ul className="flex space-x-4">
                            <li><a href="#features" className="hover:underline">Features</a></li>
                            <li><a href="#about" className="hover:underline">About</a></li>
                            <li><a href="#contact" className="hover:underline">Contact</a></li>
                        </ul>
                    </nav>
                </div>
            </header> */}

            {/* Hero Section */}
            <section className="bg-cover bg-center h-96 flex items-center justify-center text-white " style={{ backgroundImage: `url(${truc_banner})` }}>
                <div className="text-center">
                    <h2 className="text-4xl font-semibold mb-4">Empower Your Transport Business</h2>
                    <p className="text-lg mb-8">Streamline your transport data management with our comprehensive solutions.</p>
                    <Link to="/auth/signup" className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600">Get Started</Link>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-12">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">Our Features</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <FaTruck className="text-blue-500 text-4xl mb-4 mx-auto" />
                            <h3 className="text-xl font-semibold mb-2">Manage Vehicles</h3>
                            <p>Efficiently manage and track your fleet with ease.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <FaCog className="text-blue-500 text-4xl mb-4 mx-auto" />
                            <h3 className="text-xl font-semibold mb-2">Customizable</h3>
                            <p>Adapt the system to fit your unique business needs.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <FaUsers className="text-blue-500 text-4xl mb-4 mx-auto" />
                            <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
                            <p>Facilitate seamless communication among team members.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <FaShieldAlt className="text-blue-500 text-4xl mb-4 mx-auto" />
                            <h3 className="text-xl font-semibold mb-2">Data Security</h3>
                            <p>Ensure the safety and confidentiality of your data.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="bg-gray-200 py-12">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">About Us</h2>
                    <p className="text-lg mb-4">We are dedicated to providing transporters with the best tools to manage their data efficiently. Our platform is designed to simplify processes and improve overall productivity.</p>
                    <img src="https://via.placeholder.com/800x400" alt="About Us" className="mx-auto rounded-lg shadow-lg" />
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-12">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
                    <p className="text-lg mb-4">Have any questions or want to get started? Reach out to us today!</p>
                    <a href="mailto:support@transporterhub.com" className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600">Contact Support</a>
                </div>
            </section>


            {/* Footer */}
            <footer className="bg-blue-600 text-white py-4 text-center">
                <p>&copy; {new Date().getFullYear()} Transporter Hub. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
