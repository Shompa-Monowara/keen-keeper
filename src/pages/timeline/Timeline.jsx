import React, { useContext, useState } from "react";
import { FriendContext } from "../../context/FriendContext";
import { FaChevronDown, FaCheck, FaSearch, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { TbPhoneCall } from "react-icons/tb";
import { BiMessageDots } from "react-icons/bi";
import { FiVideo } from "react-icons/fi";

const Timeline = () => {
  const { timeline } = useContext(FriendContext);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");


  const filteredTimeline = [...timeline]
    .filter((item) => {
     
      const isTypeMatch = filter === "All" || item.type === filter;

      
      const searchLower = searchTerm.toLowerCase();
      const isSearchMatch = 
        item.title.toLowerCase().includes(searchLower) || 
        item.type.toLowerCase().includes(searchLower);

      return isTypeMatch && isSearchMatch;
    })
    .sort((a, b) => {
      const idA = parseFloat(a.id);
      const idB = parseFloat(b.id);
      return sortOrder === "newest" ? idB - idA : idA - idB;
    });

  const getIcon = (type) => {
    switch (type) {
      case "Call": return <TbPhoneCall className="text-xl" />;
      case "Text": return <BiMessageDots className="text-xl" />;
      case "Video": return <FiVideo className="text-xl" />;
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
          
          <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
           
            <div className="dropdown w-full md:w-auto"> 
              <label tabIndex={0} className="btn btn-outline border-gray-300 bg-white hover:bg-white hover:border-gray-400 text-[#444] font-normal normal-case w-full md:w-[240px] justify-between shadow-sm min-h-0 h-11">
                <span className="text-[15px] truncate">{filter === "All" ? "Filter timeline" : filter}</span>
                <FaChevronDown className="text-[12px] opacity-70 flex-shrink-0" />
              </label>
              <ul tabIndex={0} className="dropdown-content z-[10] menu p-0 py-1 shadow-2xl bg-base-100 rounded-lg w-full md:w-[240px] mt-1 border border-gray-100">
                <li><button onClick={() => handleFilterChange("All")} className="flex items-center gap-3 py-2 px-4 text-[#555] hover:bg-gray-100 rounded-none"><div className="w-4 flex justify-center">{filter === "All" && <FaCheck className="text-[12px] text-gray-400" />}</div><span>Filter timeline</span></button></li>
                {["Text", "Call", "Video"].map((item) => (
                  <li key={item}><button onClick={() => handleFilterChange(item)} className="flex items-center gap-3 py-2 px-4 text-[#1a1a1a] hover:bg-gray-100 rounded-none font-medium"><div className="w-4 flex justify-center">{filter === item && <FaCheck className="text-[12px] text-[#1F2937]" />}</div><span>{item}</span></button></li>
                ))}
              </ul>
            </div>

           
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-grow md:w-64">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} // Instant State Update
                  className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-400 shadow-sm h-11" 
                />
              </div>

              <button 
                onClick={() => setSortOrder(sortOrder === "newest" ? "oldest" : "newest")}
                className="flex items-center justify-center gap-2 px-4 h-11 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all shadow-sm text-sm font-medium text-gray-600 min-w-[110px]"
              >
                {sortOrder === "newest" ? <FaSortAmountDown /> : <FaSortAmountUp />}
                <span>{sortOrder === "newest" ? "Newest" : "Oldest"}</span>
              </button>
            </div>
          </div>

          <div className="space-y-4"> 
            {filteredTimeline.length === 0 ? (
              <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <p className="text-gray-400 font-medium italic">No matches found!</p>
              </div>
            ) : (
              filteredTimeline.map(item => (
                <div key={item.id} className="flex items-center gap-4 md:gap-6 p-5 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 flex items-center justify-center bg-[#f8f9fa] rounded-full">
                    {getIcon(item.type)}
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-[15px] md:text-[17px] text-[#64748B] font-normal leading-tight">
                      <span className="font-medium text-[#244D3F]">{item.type}</span> with {item.title.split('with ')[1] || 'Friend'}
                    </h4>
                    <p className="text-[12px] md:text-[13px] text-[#64748B] font-medium mt-0.5">{item.date}</p>
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