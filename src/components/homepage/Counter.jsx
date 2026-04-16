import React from 'react';

const CounterPage = () => {
    const stats = [
        { id: 1, label: "Total Friends", value: "10" },
        { id: 2, label: "On Track", value: "3" },
        { id: 3, label: "Need Attention", value: "6" },
        { id: 4, label: "Interactions This Month", value: "12" },
    ];

    return (
       
        <section className="container mx-auto px-4 mt-[60px] mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div 
                        key={stat.id} 
                        
                        className="bg-white rounded-2xl shadow-sm min-h-[137px] flex flex-col items-center justify-center text-center border border-gray-100 hover:shadow-md transition-all duration-300 px-4"
                    >
                     
                        <h2 className="text-4xl font-bold text-[#244D3F] mb-1">
                            {stat.value}
                        </h2>
                        
                       
                        <p className="text-[#64748B] font-normal text-[16px]">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CounterPage;