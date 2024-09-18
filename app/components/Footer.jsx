/**
 * @module Footer
 * @description A footer component for the MaxiMart website.
 * @requires react-icons/fa
 */

import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

/**
 * Footer component displaying company information and social media links.
 * @returns {JSX.Element} The rendered Footer component
 */
const Footer = () => {
  return (
    <footer className="bg-white shadow-lg text-black py-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">MaxiMart</h3>
          <p className="text-md font-semibold">Everything Under One Roof!</p>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <div className="flex justify-center space-x-4">
            <a href="#" className="hover:text-gray-400">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaTwitter size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-4 mb-2 font-bold text-center text-md">
        &copy; 2024 | Nomusa Mtshali | MaxiMart
      </div>
    </footer>
  );
};

export default Footer;
