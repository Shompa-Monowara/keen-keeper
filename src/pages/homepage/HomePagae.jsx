import React from 'react';
import Banner from '../../components/homepage/Banner';
import FriendSection from '../../components/homepage/Friend';
import CounterPage from '../../components/homepage/Counter';




const Homepage = () => {
    return (
        <>
        <Banner/>
         <CounterPage/>
         <FriendSection/>
       
        </>
           
        
    );
};

export default Homepage;