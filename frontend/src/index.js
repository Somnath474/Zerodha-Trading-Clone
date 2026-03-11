import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import './index.css';
import Homepage from './landing_page/home/Homepage';
import Signup from "./landing_page/signup/Signup";
import Login from './landing_page/login/Login';
import Dashboard from './landing_page/dashboard/Dashboard';
import About from "./landing_page/about/Aboutpage";
import Products from "./landing_page/products/ProductsPage"
import Pricing from "./landing_page/pricing/Pricingpage"
import Support from "./landing_page/support/Supportpage"
import Navbar from './landing_page/Navbar';
import Footer from './landing_page/Footer';
import NotFound from './landing_page/Notfound';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Navbar/>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/signup"element={<Signup/>}/>
       <Route path="/login" element={<Login/>}/>       {/* added */}
       <Route path="/dashboard" element={<Dashboard/>}/> {/* added */}
      <Route path="/about" element={<About/>}/>
      <Route path="/products" element={<Products/>}/>
      <Route path="/pricing" element={<Pricing/>}/>
      <Route path="/support" element={<Support/>}/>
      <Route path='*' element={<NotFound/>} />
    </Routes>
    <Footer/>
  </BrowserRouter>
);


