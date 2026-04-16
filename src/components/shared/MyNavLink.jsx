import React from 'react';
import { NavLink } from 'react-router';

const MyNavLink = ({ to, icon, children }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md font-semibold transition-all w-full ${
                    isActive 
                    ? "bg-[#244D3F] text-white" // ✅ isActive obosthay oboshshoi text-white hobe
                    : "text-gray-600 hover:bg-gray-100"
                }`
            }
        >
            
            <span className={`text-lg transition-colors`}>{icon}</span>
            
            
            <span className="transition-colors">{children}</span>
        </NavLink>
    );
};

export default MyNavLink;