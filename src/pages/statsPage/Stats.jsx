import React, { useContext } from "react";
import { Legend, Pie, PieChart, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { FriendContext } from "../../context/FriendContext";

const Stats = () => {
  const { timeline } = useContext(FriendContext);

  const callCount = timeline?.filter((item) => item.type === "Call").length || 0;
  const textCount = timeline?.filter((item) => item.type === "Text").length || 0;
  const videoCount = timeline?.filter((item) => item.type === "Video").length || 0;

  const totalInteractions = callCount + textCount + videoCount;

  const data = [
    { name: "Call", value: callCount, fill: "#244D3F" },
    { name: "Text", value: textCount, fill: "#7F37F5" },
    { name: "Video", value: videoCount, fill: "#37A163" },
  ];

  return (
    /* ✅ min-h-screen bad diye h-auto ebong flex-grow kora hoyeche */
    <div className="bg-[#fcfcfc] w-full h-auto flex-grow flex flex-col items-center py-6 md:py-10 px-4 md:px-6">
      <div className="w-full max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-6 md:mb-10 text-left">Friendship Analytics</h2>

        {/* Chart Card */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 md:p-10">
          <p className="text-[#1e3a3a] font-bold mb-4 text-[16px]">By Interaction Type</p>
          
          <div className="w-full flex justify-center items-center py-6">
            {totalInteractions > 0 ? (
              /* ✅ Responsive Height adjust kora hoyeche */
              <div className="h-[250px] md:h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      innerRadius="65%"
                      outerRadius="90%"
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Legend 
                      verticalAlign="bottom" 
                      align="center"
                      iconType="square"
                      iconSize={12}
                      wrapperStyle={{ paddingTop: "20px", fontSize: "14px", fontWeight: "500" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="text-center w-full py-10">
                <p className="text-[#8e9faf] font-normal text-[15px]">
                  No interactions logged yet.
                </p>
              </div>
            )}
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default Stats;