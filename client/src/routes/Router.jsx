// src/Router.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import your pages/components
import Home from '../pages/Home';
import Navbar from '../layouts/Navbar';
import Profiles from '../pages/Profiles';
import Login from '../pages/Login';
import Register from '../pages/Register'
import NotFound from '../pages/NotFound';
import Footer from '../layouts/Footer';
import SingleProfile from '../pages/SingleProfile'
const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/profiles/profile/:userId" element={<SingleProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default Router;