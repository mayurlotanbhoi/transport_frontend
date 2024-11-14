import { FaFacebook, FaInstagram, FaTwitter, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-200 py-10">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-0">

                {/* Company Info */}
                <div>
                    <h2 className="text-xl font-bold text-white mb-4">Transport Company</h2>
                    <p className="mb-4">
                        We provide reliable transport services across the country, connecting businesses with their transportation needs.
                    </p>
                    <p><FaMapMarkerAlt className="inline mr-2" /> Nandurbar, Maharashtra, India</p>
                    <p><FaPhoneAlt className="inline mr-2" />8766988606</p>
                    <p><FaEnvelope className="inline mr-2" />mayurbhoi200@gmail.com</p>
                </div>

                {/* Quick Links */}
                <div>
                    <h2 className="text-xl font-bold text-white mb-4">Quick Links</h2>
                    <ul>
                        <li className="mb-2"><a href="/about" className="hover:text-gray-400">About Us</a></li>
                        <li className="mb-2"><a href="/services" className="hover:text-gray-400">Our Services</a></li>
                        <li className="mb-2"><a href="/contact" className="hover:text-gray-400">Contact</a></li>
                        <li className="mb-2"><a href="/faq" className="hover:text-gray-400">FAQ</a></li>
                        <li className="mb-2"><a href="/support" className="hover:text-gray-400">Customer Support</a></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h2 className="text-xl font-bold text-white mb-4">Follow Us</h2>
                    <div className="flex space-x-4 mb-4">
                        <a href="https://facebook.com" className="hover:text-gray-400"><FaFacebook size={24} /></a>
                        <a href="https://instagram.com" className="hover:text-gray-400"><FaInstagram size={24} /></a>
                        <a href="https://twitter.com" className="hover:text-gray-400"><FaTwitter size={24} /></a>
                    </div>
                    <p className="text-gray-400">Stay connected through our social channels for updates and offers.</p>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
                <p>&copy; {new Date().getFullYear()} Transport Company. All rights reserved.</p>
                <p>Designed by Mayur Bhoi Co.</p>
            </div>
        </footer>
    );
};

export default Footer;
