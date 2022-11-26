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
import Step3 from './pages/BookingSteps/Step3';
import Test from './pages/test';
import Step4 from './pages/BookingSteps/Step4';

export default function Commonroutes() {
  return (
    <BrowserRouter>
      <Routes>


        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/test" element={<Test />} />

        {/* <Route path="/booking/:id" element={<Index />} /> */}
        <Route path="/booking" element={<Index />} >
          <Route path="flight/:id" element={<Step1/>} />
          <Route path="passangers/:id" element={<Step2/>}/>
          <Route path="step3/:id" element={<Step3/>}/>
          <Route path="step4/:id" element={<Step4/>}/>

        </Route>


        {/* <Route path="/booking/:id" element={<Index />} /> */}


        
      </Routes>
    </BrowserRouter> 
  )
}
