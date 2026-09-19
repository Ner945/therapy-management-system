import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TherapistPage from './pages/TherapistPage';
import ClientPage from './pages/ClientPage';
import SessionPage from './pages/SessionPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/therapists" element={<TherapistPage />} />
        <Route path="/clients" element={<ClientPage />} />
        <Route path="/sessions" element={<SessionPage />} />
      </Routes>
    </div>
  );
}

export default App;
