import React from 'react';
import { FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { PiInstagramLogoFill } from 'react-icons/pi';

const Footer = () => {
    return (
        <footer className="bg-[#244D3F] text-white py-12 px-4 w-full overflow-hidden">
            <div className="container mx-auto text-center px-2">
                
                {/* Logo Section */}
                <h1 className="text-4xl md:text-5xl font-bold mb-4">KeenKeeper</h1>
                
                {/* Description */}
                <p className="max-w-2xl mx-auto text-gray-300 mb-8 text-sm md:text-base leading-relaxed">
                    Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
                </p>

                {/* Social Links Section */}
                <div className="flex justify-center gap-4 mb-10">
                    <a href="#" className="bg-white text-black p-3 rounded-full hover:bg-gray-200 transition-all flex items-center justify-center">
                        <PiInstagramLogoFill size={20} /> 
                    </a>
                    <a href="#" className="bg-white text-black p-3 rounded-full hover:bg-gray-200 transition-all flex items-center justify-center">
                        <FaFacebook size={20} />
                    </a>
                    <a href="#" className="bg-white text-black p-3 rounded-full hover:bg-gray-200 transition-all flex items-center justify-center">
                        <FaXTwitter size={20} />
                    </a>
                </div>

              
                <hr className="border-gray-600 mb-8" />

             
                <div className="flex flex-col md:flex-row justify-between items-center text-[12px] md:text-sm text-gray-400 gap-y-6">
                    
                    
                    <div className="flex flex-col min-[350px]:flex-row flex-wrap justify-center items-center gap-x-4 gap-y-3 order-1 md:order-2 w-full">
                        <a href="#" className="hover:text-white transition-all whitespace-nowrap">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-all whitespace-nowrap">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-all whitespace-nowrap">Cookies</a>
                    </div>

                    <p className="order-2 md:order-1 w-full text-center md:text-left mt-2 md:mt-0">
                        © 2026 KeenKeeper. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;