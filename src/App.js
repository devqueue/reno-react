import logo from './logo.svg';
import './App.css';
import { ToastContainer } from 'react-toastify';
import './Responsive.css';
import "react-toastify/dist/ReactToastify.css";
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
import AllMerchantData from './pages/admin/MerchantsData'
import AdminLogin from './components/adminComponents/AdminLogin'
import AllMerchants from './pages/admin/MerchantsData'
import AllCustomers from './pages/admin/CustomersData'
import AllFinancialRequests from './pages/admin/FinancialRequests'
import AllQuotes from './pages/admin/QuotesData'
import AllTickets from './pages/admin/TicketSupport'
import AdminProfile from './pages/admin/ProfilePage'
import ViewFinanceReport from './pages/admin/ViewFinanceRequest'

function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={2000} />
      <Router >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/howItWorks" element={<HowItWorks />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/partnersLocation" element={<Location />} />
          <Route path="/customer/auth/*" element={<CustomerAuth />} />
          <Route path="/partner/auth/*" element={<PartnerAuth />} />
          <Route path="/customer/dashboard/*" element={<CustomerDashboard />} />
          <Route path="/partner/dashboard/*" element={<PartnerDashboard />} />
          <Route path="/admin/*" element={<AllMerchantData />} />
          <Route exact path='/admin/login' element={<AdminLogin />} />
          <Route exact path='/admin/merchantsData' element={<AllMerchants />} />
          <Route exact path='/admin/customersData' element={<AllCustomers />} />
          <Route exact path='/admin/quotesData' element={<AllQuotes />} />
          <Route exact path='/admin/financialRequestsData' element={<AllFinancialRequests />} />
          <Route exact path='/admin/customer-issues' element={<AllTickets />} />
          <Route exact path='/admin/profile' element={<AdminProfile />} />
          <Route path='/view-finance-request/:id' element={<ViewFinanceReport />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
