import React, { useContext } from "react";
import { useParams } from "react-router";
import useFriends from "../../hooks/useFriends";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import { FaRegClock, FaRegTrashAlt } from "react-icons/fa";
import { FiArchive, FiVideo,  } from "react-icons/fi";
import { FriendContext } from "../../context/FriendContext";
import { TbPhoneCall } from "react-icons/tb";
import { BiMessageDots } from "react-icons/bi";

const FriendDetails = () => {
  const { id } = useParams();
  const { friends, loading } = useFriends();
  const { addInteraction } = useContext(FriendContext);

  const friend = friends ? friends.find((f) => String(f.id) === id) : null;

  // ✅ Hex codes specifically for backgrounds
  const statusColors = {
    "overdue": "#EF4444",    // Red
    "on-track": "#244D3F",   // Dark Green
    "almost due": "#EFAD44", // Yellow/Orange
    "snoozed": "#60A5FA",    // Blue
    "archived": "#6B7280"    // Gray
  };

  if (loading) return (
    <div className="h-screen flex justify-center items-center">
      <HashLoader color="#244D3F" />
    </div>
  );

  if (!friend) return (
    <div className="h-screen flex justify-center items-center text-[#244D3F] font-bold">
      Friend not found!
    </div>
  );

  const handleAction = (type) => {
    const newEntry = {
      id: Date.now(),
      title: `${type} with ${friend.name}`,
      type: type,
      date: new Date().toLocaleDateString(),
    };
    addInteraction(newEntry);
    toast.success(`${type} logged for ${friend.name}`);
  };

  // ✅ Extract and normalize status for color matching
  const currentStatus = friend.status?.toLowerCase() || "";
  const bgColor = statusColors[currentStatus] || "#9CA3AF"; // Default Gray if no match

  return (
    <div className="bg-gray-50 h-auto py-10 pb-20 px-5">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Profile Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
              <img 
                src={friend.picture} 
                alt={friend.name} 
                className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white shadow-sm"
              />
              <h2 className="text-xl font-bold mt-4 text-gray-800">{friend.name}</h2>
              
              
              <span 
                className="inline-block px-4 py-1 rounded-full text-[12px] font-medium  tracking-wider mt-2 text-white"
                style={{ backgroundColor: bgColor }}
              >
                {friend.status}
              </span>

              <div className="mt-3">
                <span className="bg-[#CBFADB] text-[#244D3F] px-3 py-1 rounded-full text-[12px] font-medium uppercase tracking-tighter">
                  {friend.tags?.[0] || "FRIEND"}
                </span>
              </div>

              <p className="text-gray-500 text-sm italic mt-4">
                "{friend.bio || 'Former colleague, great mentor'}"
              </p>

              <p className="text-gray-400 text-xs mt-2 break-all">
                Preferred: <span className="font-medium text-slate-600">{friend.email || 'N/A'}</span>
              </p>
            </div>

            <div className="space-y-2">
              <button className="w-full py-3 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-700 font-medium flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors">
                 <FaRegClock className="text-lg" /> Snooze 2 Weeks
              </button>
              <button className="w-full py-3 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-700 font-medium flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors">
                 <FiArchive className="text-lg" /> Archive
              </button>
              <button className="w-full py-3 bg-white border border-red-100 rounded-lg shadow-sm text-red-500 font-medium flex items-center justify-center gap-3 hover:bg-red-50 transition-colors">
                 <FaRegTrashAlt className="text-lg" /> Delete
              </button>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            {/* Stats Cards and other UI remain the same... */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <h3 className="text-3xl font-bold text-[#244D3F]">{friend.days_since_contact}</h3>
                <p className="text-[#64748B] font-normal text-[16px] mt-1">Days Since Contact</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <h3 className="text-3xl font-bold text-[#244D3F]">{friend.goal}</h3>
                <p className="text-[#64748B] font-normal text-[16px] mt-1">Goal (Days)</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <h3 className="text-xl font-normal text-[#244D3F] mt-1">{friend.next_due_date}</h3>
                <p className="text-[#64748B] text-[16px] mt-2">Next Due</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-[#244D3F] tracking-tight">Relationship Goal</h3>
                <button className="bg-[#E9E9E9] hover:bg-gray-200 text-[#1F2937] px-4 py-1 rounded text-sm font-medium transition-colors">Edit</button>
              </div>
              <p className="text-[#64748B]">Connect every <span className="font-bold text-[#1F2937]">{friend.goal} days</span></p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-[#244D3F] tracking-tight mb-6 uppercase text-sm">Quick Check-In</h3>
              <div className="grid grid-cols-3 gap-4">
                <button onClick={() => handleAction("Call")} className="flex flex-col items-center justify-center gap-3 p-6 bg-gray-50 rounded-xl hover:bg-[#E2E2E2]  transition-all ">
                  <TbPhoneCall size={22} className="text-[#1F2937]" />
                  <span className="font-medium">Call</span>
                </button>
                <button onClick={() => handleAction("Text")} className="flex flex-col items-center justify-center gap-3 p-6 bg-gray-50 rounded-xl hover:bg-[#E2E2E2]  transition-all ">
                  <BiMessageDots size={22} className="text-[#1F2937]" />
                  <span className="font-medium">Text</span>
                </button>
                <button onClick={() => handleAction("Video")} className="flex flex-col items-center justify-center gap-3 p-6 bg-gray-50 rounded-xl hover:bg-[#E2E2E2]  transition-all ">
                  <FiVideo size={22} className="text-[#1F2937]" />
                  <span className="font-medium">Video</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FriendDetails;