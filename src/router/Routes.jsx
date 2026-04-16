import React from 'react';

import RootLayout from '../layout/RootLayout';
import Stats from '../pages/statsPage/Stats';
import Timeline from '../pages/timeline/Timeline';
import Homepage from '../pages/homepage/HomePagae';
import { createBrowserRouter } from 'react-router';
import NotFound from '../pages/notFoundPage/NotFound';
import FriendDetails from '../pages/friendsdetails/FriendDetails';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
   children: [
    {
      // path: "/",
      index: true, 
      element: <Homepage></Homepage>,
      loader: () => fetch("/data.json")
    },
    {
       path: "/friend/:id",
     element: <FriendDetails></FriendDetails>
    },
     {
      path: "/timeline",
      element: <Timeline/>,
      
    },
    {
     path: "/statsPage",
     element: <Stats></Stats>
    },
   
   ],
    errorElement: <NotFound></NotFound>
  },
]);
