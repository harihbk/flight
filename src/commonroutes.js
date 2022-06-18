import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
  import Home from './pages/Home/Home';
  import Search from './pages/Search/Search';
import Index from './pages/BookingSteps/Index';

export default function Commonroutes() {
  return (
    <BrowserRouter>
      <Routes>


        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/booking" element={<Index />} />
      </Routes>
    </BrowserRouter> 
  )
}
