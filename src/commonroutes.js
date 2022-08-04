import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
  import Home from './pages/Home/Home';
  import Search from './pages/Search/Search';
import Index from './pages/BookingSteps/Index';
import Step1 from './pages/BookingSteps/step1';
import Step2 from './pages/BookingSteps/Step2';

export default function Commonroutes() {
  return (
    <BrowserRouter>
      <Routes>


        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />

        <Route path="/booking/:id" element={<Index />} />
        {/* <Route path="/booking" element={<Index />} >
          <Route path=":id" element={<Step1/>} />
          <Route path="passangers" element={<Step2/>}/>

        </Route> */}


        {/* <Route path="/booking/:id" element={<Index />} /> */}


        
      </Routes>
    </BrowserRouter> 
  )
}
