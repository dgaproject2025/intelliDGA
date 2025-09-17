import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Equipment from './pages/Equipment';
import Analysis from './pages/Analysis';
import History from './pages/History';
import Report from './pages/Report';
import Documentation from './pages/Documentation';
import DataInputPortal from './pages/DataInputPortal';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow bg-gray-50 px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/equipment" element={<Equipment />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/history" element={<History />} />
            <Route path="/report" element={<Report />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/data-input" element={<DataInputPortal />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
