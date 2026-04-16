import React, { useContext, useState } from "react";
import { FriendContext } from "../../context/FriendContext";
import { FaChevronDown, FaCheck } from "react-icons/fa";
import { TbPhoneCall } from "react-icons/tb";
import { BiMessageDots } from "react-icons/bi";
import { FiVideo } from "react-icons/fi";

const Timeline = () => {
  const { timeline } = useContext(FriendContext);
  const [filter, setFilter] = useState("All");

  const filteredTimeline = filter === "All" 
    ? timeline 
    : timeline.filter(t => t.type === filter);

  const getIcon = (type) => {
    switch (type) {
      case "Call": return <TbPhoneCall className=" text-xl" />;
      case "Text": return <BiMessageDots className=" text-xl" />;
      case "Video": return <FiVideogit className=" text-xl" />;
      default: return null;
    }
  };

  const handleFilterChange = (value) => {
    setFilter(value);
    if (document.activeElement) {
      document.activeElement.blur();
    }
  };

  return (
    <div className="bg-[#fcfcfc] w-full min-h-[600px] flex flex-col items-center">
      <div className="w-full max-w-6xl py-12 px-6">
        <div className="mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a1a] mb-8">Timeline</h2>
          
          <div className="mb-8">
            <div className="dropdown w-full"> 
              <label 
                tabIndex={0} 
               
                className="btn btn-outline border-gray-300 bg-white hover:bg-white hover:border-gray-400 text-[#444] font-normal normal-case max-w-[320px] w-full justify-between shadow-sm min-h-0 h-11"
              >
                <span className="text-[15px] truncate">{filter === "All" ? "Filter timeline" : filter}</span>
                <FaChevronDown className="text-[12px] opacity-70 flex-shrink-0" />
              </label>
              
           
              <ul tabIndex={0} className="dropdown-content z-[10] menu p-0 py-1 shadow-2xl bg-base-100 rounded-lg max-w-[320px] w-full mt-1 border border-gray-100">
                <li>
                  <button 
                    onClick={() => handleFilterChange("All")} 
                    className="flex items-center gap-3 py-2 px-4 text-[#555] hover:bg-gray-100 rounded-none"
                  >
                    <div className="w-4 flex justify-center">
                      {filter === "All" && <FaCheck className="text-[12px] text-gray-400" />}
                    </div>
                    <span>Filter timeline</span>
                  </button>
                </li>
                
                {["Text", "Call", "Video"].map((item) => (
                  <li key={item}>
                    <button 
                      onClick={() => handleFilterChange(item)} 
                      className="flex items-center gap-3 py-2 px-4 text-[#1a1a1a] hover:bg-gray-100 rounded-none font-medium"
                    >
                      <div className="w-4 flex justify-center">
                        {filter === item && <FaCheck className="text-[12px] text-black" />}
                      </div>
                      <span>{item}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-4"> 
            {filteredTimeline.length === 0 ? (
              <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <p className="text-gray-400 font-medium italic">No data found!</p>
              </div>
            ) : (
              filteredTimeline.map(item => (
                <div 
                  key={item.id} 
                  className="flex items-center gap-4 md:gap-6 p-5 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 flex items-center justify-center bg-[#f8f9fa] rounded-full">
                    {getIcon(item.type)}
                  </div>

                  <div className="flex-grow">
                    <h4 className="text-[15px] md:text-[17px] text-[#64748B] font-normal leading-tight">
                      <span className="font-medium  text-[#244D3F]">{item.type}</span> with {item.title.split('with ')[1] || 'Friend'}
                    </h4>
                    <p className="text-[12px] md:text-[13px] text-[#64748B] font-medium mt-0.5">
                      {item.date}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;