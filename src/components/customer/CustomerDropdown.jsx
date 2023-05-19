import React, { useState, useEffect } from "react";
import {
  getAllNotificationsOfCustomer,
  markNotificationsOfMerchantRead,
  readAllNotificationsOfCustomer,
} from "../../api/CustomerApi";
import moment from "moment";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AiFillBell } from "react-icons/ai";
import { toast } from "react-toastify";

const CustomerDropdown = () => {
  //=====================Notification =================
  const navigate = useNavigate();
  const location = useLocation();

  const [userName, setUserName] = useState("");
  const [userPic, setUserPic] = useState("");
  // checking if user is signed in or not
  useEffect(() => {
    const customerToken = JSON.parse(
      localStorage.getItem("reno-customer-token")
    );
    // const isSessionFound = sessionStorage.getItem("reno-customer-token");
    if (!customerToken) {
      navigate("/customer/auth/login");
    }
    let name = JSON.parse(localStorage.getItem("reno-customerName"));
    if (name) {
      setUserName(name);
    }

    let pic = JSON.parse(localStorage.getItem("reno-customerPhoto"));
    if (pic) {
      setUserPic(
        process.env.REACT_APP_API_SERVER_URL + "/customerProfilePics/" + pic
      );
    }
  }, [location]);
  // logging out
  const logout = async () => {
    localStorage.removeItem("reno-customer-token");
    localStorage.removeItem("reno-customerId");
    sessionStorage.removeItem("reno-customer-token");
    localStorage.removeItem("reno-customerName");
    sessionStorage.removeItem("reno-customerName");
    localStorage.removeItem("reno-customerPhoto");
    sessionStorage.removeItem("reno-customerPhoto");
    toast.success("Signed Out SuccessFully");
    await delay(2000);
    navigate("/customer/auth/login");
  };
  // sleeping
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  return (
    <div className="dropdown profile-dropdown">
      <button
        className="btn dropdown-toggle"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <div className="d-flex align-items-center fs-small me-3">
          <img
            src={userPic}
            alt=""
            style={{
              maxWidth: "50px",
              maxheight: "50px",
              borderRadius: "50%",
            }}
          />
          {userName}
        </div>
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li>
          <Link className="dropdown-item" to="/customer/dashboard/profile">
            Profile
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" to="" onClick={logout}>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default CustomerDropdown;
