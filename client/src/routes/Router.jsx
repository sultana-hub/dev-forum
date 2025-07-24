// src/Router.jsx
import React,{ Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import your pages/components
import Home from '../pages/Home';
import ProtectedRoute from './isAuth'
import Navbar from '../layouts/Navbar';
import Profiles from '../pages/Profiles';
import Login from '../pages/Login';
import Register from '../pages/Register'
import NotFound from '../pages/NotFound';
import Footer from '../layouts/Footer';
import SingleProfile from '../pages/SingleProfile'
import Dashboard from '../pages/dashboard/Dashboard';

const ErrorPage=lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("../pages/ErrorPage"))

      , 2000);
  });
});

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
         <Suspense fallback={
          <h3>
            ...Loading
          </h3>
        }>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/profiles/profile/:userId" element={<SingleProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
          {/* protected route */}
          <Route element={<ProtectedRoute/>}>
          <Route path="/dashboard" element={<Dashboard />} />
            </Route>
        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
          <Route path="/error" element={<ErrorPage />} />
      </Routes>
      </Suspense>
      <Footer/>
    </BrowserRouter>
  );
};

export default Router;