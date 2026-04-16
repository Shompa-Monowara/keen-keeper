import { useState, useEffect } from "react";

const useFriends = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
     
      setLoading(true); 
      
      try {
        const res = await fetch("/data.json");
        const data = await res.json();

      
        setTimeout(() => {
          setFriends(data);
          setLoading(false);
        }, 1500); 

      } catch (err) {
        console.error("Fetch error:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { friends, loading };
};

export default useFriends;