import React, { useState } from "react";
import Panel from "../../components/partner/Panel";
import Sidebar from "../../components/partner/Sidebar";
import { Routes, Route } from "react-router-dom";
import NewApllication from "./NewApplication";
import Dashboard from "../../components/partner/Dashboard";
import ManageQuotes from "../../components/partner/ManageQuotes";
import Applications from "../../components/partner/Applications";
import AllCustomerApprovedQuotes from "../../components/partner/AllQuotesToBeDelivered";
import MerchantsTickets from "../../components/partner/MerchantTickets";
import Profile from "../../components/partner/Profile";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const PartnerDashboard = () => {
  const [active, setActive] = useState(false);

  document.title = "Reno | Partner Portal";

  return (
    <div className="admin-panel-container">
      <div
        className="menu-toggle-btn"
        onClick={() => {
          setActive(!active);
        }}
      >
        <HiOutlineMenu />
        {/* {!active ? <HiOutlineMenu /> : <HiOutlineX />} */}
      </div>
      <Sidebar isActive={active} />
      <Routes>
        <Route path="/panel" element={<Panel />} />
        <Route path="/panel/newApplication" element={<NewApllication />} />
        <Route path="/manageQuotes" element={<ManageQuotes />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/applications" element={<Applications />} />
        <Route
          path="/quotes-approved-by-customers"
          element={<AllCustomerApprovedQuotes />}
        />
        <Route path="/customer-support" element={<MerchantsTickets />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default PartnerDashboard;
