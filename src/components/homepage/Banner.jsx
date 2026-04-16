import React from 'react';
import { FaPlus } from 'react-icons/fa';

const Banner = () => {
    return (
       <section className="bg-[#F8F9FA] py-20 px-4">
            <div className="container mx-auto text-center">
                
               
                <h1 className="text-4xl md:text-6xl font-extrabold text-[#1A202C] mb-6 tracking-tight">
                    Friends to keep close in your life
                </h1>
                
               
                <p className="max-w-2xl mx-auto text-[#64748B] text-lg md:text-xl mb-10 leading-relaxed">
                    Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
                </p>

                {/* Action Button */}
                <div className="flex justify-center">
                    <button className="bg-[#244D3F] text-white px-8 py-3 rounded-md font-semibold flex items-center gap-2 hover:bg-[#1a3a2f] transition-all shadow-lg active:scale-95">
                        <FaPlus className="text-sm" />
                        Add a Friend
                    </button>
                </div>

            </div>
        </section>
    );
};

export default Banner;