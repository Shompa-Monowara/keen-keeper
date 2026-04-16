import React from "react";
import { Link } from "react-router"; 
import useFriends from "../../hooks/useFriends";
import { HashLoader } from "react-spinners";

const FriendSection = () => {
  const { friends, loading } = useFriends();

  const getStatusColor = (status) => {
    const s = status?.toLowerCase();
    if (s === "overdue") return "bg-[#EF4444]";
    if (s === "almost due") return "bg-[#EFAD44]";
    return "bg-[#244D3F]";
  };

  return (
    <div className="container mx-auto mt-[40px] mb-[60px] px-4">
      {/* ✅ Change: text-center theke text-left kora holo */}
      <div className="mb-8 text-left">
        <h2 className="font-bold text-2xl lg:text-3xl mb-2 text-gray-800">Your Friends</h2>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[300px] w-full">
          <HashLoader color="#244D3F" size={60} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {friends && friends.length > 0 ? (
            friends.map((friend) => (
              <Link 
                to={`/friend/${friend.id}`} 
                key={friend.id}
                className="group bg-white rounded-2xl shadow-md p-6 flex flex-col items-center border border-gray-100 hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-24 h-24 mb-4 overflow-hidden rounded-full  ">
                  <img
                    src={friend.picture}
                    alt={friend.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-xl font-semibold text-[#1F2937] ">
                  {friend.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {friend.days_since_contact} days ago
                </p>

                <div className="flex flex-wrap gap-2 justify-center mb-5">
                  {friend.tags?.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-[#CBFADB] text-[#244D3F] text-[12px] font-semibold rounded-full uppercase tracking-tighter">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className={`mt-auto px-5 py-1.5 rounded-full text-white text-xs font-bold ${getStatusColor(friend.status)}`}>
                  {friend.status}
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-400">No friends found!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FriendSection;