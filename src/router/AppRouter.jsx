import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Page Imports (Assuming these structures exist in '../pages')
import HomePage from '../pages/Home/HomePage';
import LoginPage from '../pages/Auth/LoginPage';
import WatchPage from '../pages/Watch/WatchPage';
import NotFoundPage from '../pages/NotFound/NotFoundPage';
import BrowsePage from '../pages/Browse/BrowsePage'; // Often used for categorized browsing

// Helper component structure for protected routes might be included later, but we define the basic paths now.

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        
        {/* Authentication Routes - accessible without login */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<LoginPage isSignup={true} />} />

        {/* Primary Content Routes - typically protected */}
        {/* In a real app, HomePage usually redirects if not logged in. */}
        <Route path="/" element={<HomePage />} />
        
        {/* Standard browsing/category page */}
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/browse/:category" element={<BrowsePage />} />
        
        {/* Watch/Detail Page (e.g., /watch/movie-id-123) */}
        <Route path="/watch/:mediaType/:id" element={<WatchPage />} />

        {/* Catch all - 404 Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;