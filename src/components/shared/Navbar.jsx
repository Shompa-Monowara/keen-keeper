import React, { useState } from 'react';
import MyNavLink from './MyNavLink';
import { RiHome2Line, RiMenuLine, RiCloseLine } from 'react-icons/ri';
import { IoTimeOutline } from 'react-icons/io5';
import { ImStatsDots } from 'react-icons/im';

const navItems = [
    { path: "/", text: "Home", icon: <RiHome2Line /> },
    { path: "/timeline", text: "Timeline", icon: <IoTimeOutline /> },
    { path: "/statsPage", text: "Stats", icon: <ImStatsDots />}
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className='bg-white shadow-sm py-4 sticky top-0 z-[100]'>
            <div className='flex justify-between items-center container mx-auto px-4'>
                
                
                <div className='md:hidden flex items-center'>
                    <button 
                        onClick={() => setIsOpen(true)} 
                        className="text-2xl text-gray-700 focus:outline-none"
                    >
                        <RiMenuLine />
                    </button>
                </div>

              
                <h2 className="text-[20px] md:text-[24px] font-bold order-1 md:order-none">
                    <span className="text-[#1F2937]">Keen</span><span className="text-[#244D3F]">Keeper</span>
                </h2>

                {/* 💻 Desktop Navigation (Hidden on SM) */}
                <ul className='hidden md:flex gap-6 items-center'>
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <MyNavLink to={item.path} icon={item.icon}>
                                {item.text}
                            </MyNavLink>
                        </li>
                    ))}
                </ul>

               
                <div className={`
                    fixed inset-0 h-screen w-full transition-all duration-300 md:hidden
                    ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
                `} style={{ zIndex: 1000 }}>
                    
                   
                    <div 
                        className="absolute inset-0 bg-black/30" 
                        onClick={() => setIsOpen(false)}
                    ></div>

                    {/* Sidebar Content */}
                    <div className={`
                        absolute top-0 left-0 h-full w-[280px] bg-white shadow-2xl transition-transform duration-300 ease-out p-6
                        ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    `}>
                        {/* Sidebar Header */}
                        <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-[#1F2937]">Menu</h2>
                            <button onClick={() => setIsOpen(false)} className="text-2xl text-gray-500">
                                <RiCloseLine />
                            </button>
                        </div>

                        {/* Mobile Nav Links */}
                        <ul className='flex flex-col gap-4'>
                            {navItems.map((item, index) => (
                                <li key={index} onClick={() => setIsOpen(false)}>
                                    <MyNavLink to={item.path} icon={item.icon}>
                                        <span className=" font-medium">{item.text}</span>
                                    </MyNavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;