import logo from './logo.svg';
import './App.css';
import './Responsive.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Home from './pages/home';
import HowItWorks from './pages/howItWorks';
import CustomerAuth from './pages/customer/auth';
import Contact from './pages/contact';
import Location from './pages/location';
import PartnerAuth from './pages/partner/auth';
import CustomerDashboard from './pages/customer/dashboard';
import PartnerDashboard from './pages/partner/dashboard';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/howItWorks" element={<HowItWorks />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/partnersLocation" element={<Location />} />
          <Route path="/customer/auth/*" element={<CustomerAuth />} />
          <Route path="/partner/auth/*" element={<PartnerAuth />} />
          <Route path="/customer/dashboard/*" element={<CustomerDashboard />} />
          <Route path="/partner/dashboard/*" element={<PartnerDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
