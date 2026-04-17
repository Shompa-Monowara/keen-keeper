import React, { useContext, useState } from "react";
import { FriendContext } from "../../context/FriendContext";
import { FaChevronDown, FaCheck, FaSearch, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { TbPhoneCall } from "react-icons/tb";
import { BiMessageDots } from "react-icons/bi";
import { FiVideo } from "react-icons/fi";

const Timeline = () => {
  const { timeline } = useContext(FriendContext);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState(""); // ✅ Search state
  const [sortOrder, setSortOrder] = useState("newest"); // ✅ Sort state

  // 1. Filter Logic (By Type & Search)
  const filteredTimeline = timeline
    .filter((item) => {
      const matchesFilter = filter === "All" || item.type === filter;
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           item.type.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    })
    // 2. Sort Logic (By ID or Date)
    .sort((a, b) => {
      return sortOrder === "newest" ? b.id - a.id : a.id - b.id;
    });

  const getIcon = (type) => {
    switch (type) {
      case "Call": return <TbPhoneCall className="text-xl " />;
      case "Text": return <BiMessageDots className="text-xl " />;
      case "Video": return <FiVideo className="text-xl " />;
      default: return null;
    }
  };

  const handleFilterChange = (value) => {
    setFilter(value);
    if (document.activeElement) document.activeElement.blur();
  };

  return (
    <div className="bg-[#fcfcfc] w-full min-h-screen flex flex-col items-center">
      <div className="w-full max-w-6xl py-12 px-6">
        <h2 className="text-3xl font-bold text-[#1a1a1a] mb-8">Timeline</h2>

        {/* 🔍 Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
          
          {/* Search Input */}
          <div className="relative w-full md:max-w-sm">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or type..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#244D3F]/20 focus:border-[#244D3F] transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            {/* Sort Toggle */}
            <button 
              onClick={() => setSortOrder(sortOrder === "newest" ? "oldest" : "newest")}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-600"
            >
              {sortOrder === "newest" ? <FaSortAmountDown /> : <FaSortAmountUp />}
              {sortOrder === "newest" ? "Newest First" : "Oldest First"}
            </button>

            {/* Filter Dropdown */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-outline border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 text-[#444] font-normal normal-case justify-between shadow-sm min-h-0 h-10 px-4">
                <span className="text-[14px]">{filter === "All" ? "All Types" : filter}</span>
                <FaChevronDown className="ml-2 text-[10px] opacity-70" />
              </label>
              <ul tabIndex={0} className="dropdown-content z-[10] menu p-1 shadow-xl bg-base-100 rounded-lg w-40 mt-1 border border-gray-100">
                {["All", "Text", "Call", "Video"].map((item) => (
                  <li key={item}>
                    <button onClick={() => handleFilterChange(item)} className="py-2 px-4 text-sm">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Timeline List */}
        <div className="space-y-4">
          {filteredTimeline.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <p className="text-gray-400 font-medium italic">No matches found for your search!</p>
            </div>
          ) : (
            filteredTimeline.map((item) => (
              <div key={item.id} className="flex items-center gap-4 md:gap-6 p-5 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 flex items-center justify-center bg-[#f8f9fa] rounded-full">
                  {getIcon(item.type)}
                </div>
                <div className="flex-grow">
                  <h4 className="text-[15px] md:text-[17px] text-[#64748B] font-normal leading-tight">
                    <span className="font-semibold text-[#244D3F]">{item.type}</span> with {item.title.split("with ")[1] || "Friend"}
                  </h4>
                  <p className="text-[12px] md:text-[13px] text-[#64748B] font-medium mt-0.5">{item.date}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Timeline;