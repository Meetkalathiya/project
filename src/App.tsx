import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserTypeSelection from './components/UserTypeSelection';
import VendorDashboard from './components/vendor/VendorDashboard';
import CustomerDashboard from './components/customer/CustomerDashboard';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserTypeSelection />} />
        <Route path="/vendor" element={<VendorDashboard />} />
        <Route path="/customer" element={<CustomerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;