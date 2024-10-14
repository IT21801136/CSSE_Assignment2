// frontend/src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import Navbar from './components/Navbar';
import Appointments from './components/Appointments';
import MedicalRecords from './components/MedicalRecords';
import Payment from './components/Payment';
import Report from './components/Report';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      {!user ? (
        <Auth setUser={setUser} />
      ) : (
        <>
          <Navbar setUser={setUser} />
          <Routes>
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/medical-records" element={<MedicalRecords />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/report" element={<Report />} />
          </Routes>
        </>
      )}
    </Router>
  );
};

export default App;
