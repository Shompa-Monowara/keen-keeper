import { useState } from "react";
import { FriendContext } from "./FriendContext";

const FriendsInfoProvider = ({ children }) => {
  const [timeline, setTimeline] = useState([]);

  
  const addInteraction = (entry) => {
    setTimeline([entry, ...timeline]); 
  };

  const data = {
    timeline,
    addInteraction,
  };

  return (
    <FriendContext.Provider value={data}>
      {children}
    </FriendContext.Provider>
  );
};

export default FriendsInfoProvider;