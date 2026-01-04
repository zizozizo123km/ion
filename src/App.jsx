import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// --- Page Components (Assumed to exist in src/pages/) ---
import LandingPage from './pages/LandingPage';
import BrowsePage from './pages/BrowsePage';
import DetailPage from './pages/DetailPage';
import NotFoundPage from './pages/NotFoundPage';
import AuthPage from './pages/AuthPage'; 

// --- Layout Components (Assumed to exist in src/components/) ---
import MainLayout from './components/MainLayout';
import ProtectedRoute from './components/ProtectedRoute'; // Placeholder for Auth logic

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white font-sans antialiased">
        <Routes>
          {/* Marketing/Landing Page - accessible without login */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Authentication (Login/Signup) */}
          <Route path="/login" element={<AuthPage mode="login" />} />
          <Route path="/signup" element={<AuthPage mode="signup" />} />

          {/* Protected Routes - require authentication */}
          {/* We wrap the authenticated section in a layout that provides the standard header/footer/etc. */}
          <Route element={<MainLayout />}>
             
             {/* The actual browsing dashboard */}
             <Route 
                path="/browse" 
                element={<ProtectedRoute><BrowsePage /></ProtectedRoute>} 
             />

             {/* Movie/Series Detail Page */}
             <Route 
                path="/watch/:type/:id" 
                element={<ProtectedRoute><DetailPage /></ProtectedRoute>} 
             />

             {/* My List / Profiles / etc. can go here */}
             {/* Example: <Route path="/mylist" element={<ProtectedRoute><MyListPage /></ProtectedRoute>} /> */}

          </Route>
          
          {/* 404 Not Found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;