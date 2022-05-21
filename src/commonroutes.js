import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
  import Home from './pages/Home/Home';
  import Search from './pages/Search/Search';
  import Step1 from './pages/BookingSteps/step1';

export default function Commonroutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/booking1" element={<Step1 />} />
      </Routes>
    </BrowserRouter> 
  )
}
