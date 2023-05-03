import React, { useEffect, useState } from "react";
import { AiFillBell } from "react-icons/ai";
import user from "../../assets/images/user.jpg";
import partner1 from "../../assets/images/partner1.png";
import partner2 from "../../assets/images/partner2.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import {
  getAllNotificationsOfMerchant,
  markNotificationsOfMerchantRead,
} from "../../api/MerchentApi";
import NotificationMerchant from "./NotificationMerchant";

const Panel = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userPic, setUserPic] = useState("");

  // sleeping
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const location = useLocation();
  // checking if user is signed in or not
  useEffect(() => {
    const customerToken = JSON.parse(
      localStorage.getItem("reno-merchant-token")
    );
    const isSessionFound = sessionStorage.getItem("reno-merchant-token");
    if (!customerToken && !isSessionFound) {
      navigate("/partner/auth/login");
    }
    let name = JSON.parse(localStorage.getItem("reno-merchantName"));
    if (!name) {
      name = JSON.parse(sessionStorage.getItem("reno-merchantName"));
    }
    setUserName(name);

    let pic = JSON.parse(localStorage.getItem("reno-merchantPic"));
    if (!pic) {
      pic = JSON.parse(sessionStorage.getItem("reno-merchantPic"));
    }
    setUserPic(
      pic.indexOf("https") == 0
        ? pic
        : process.env.REACT_APP_API_SERVER_URL + "/merchantsProfilePics/" + pic
    );
  }, [location]);

  // logging out
  const logout = async () => {
    localStorage.removeItem("reno-merchant-token");
    sessionStorage.removeItem("reno-merchant-token");
    localStorage.removeItem("reno-merchantId");
    sessionStorage.removeItem("reno-merchantId");
    localStorage.removeItem("reno-merchantName");
    sessionStorage.removeItem("reno-merchantName");
    localStorage.removeItem("reno-merchantPic");
    sessionStorage.removeItem("reno-merchantPic");
    toast.success("Signed Out SuccessFully");
    await delay(2000);
    navigate("/partner/auth/login");
  };
  // sleeping

  return (
    <div className="container-fluid p-4 dashboard-content">
      <div className="panel-top d-flex align-items-center justify-content-between">
        <div className="panel-left">
          <h5 className="mb-0 fw-600">Merchant Portal</h5>
          {/* <p className='text-muted mb-0 text-light fs-small'>
              {moment().format('MMMM Do YYYY')}
            </p> */}
        </div>

        <div className="d-flex align-items-center panel-right">
          <NotificationMerchant />

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
                <Link className="dropdown-item" to="/partner/dashboard/profile">
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
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-lg-4 col-md-6 mb-3">
          <div className="panel-card">
            <div className="d-flex justify-content-center">
              <img src={partner1} alt="" />
            </div>
            <p className="my-4 fs-small m-auto text-muted text-center">
              Create a new application to send quotes to your customers.
            </p>
            <Link
              className="btn text-dark bg-darkBlue border"
              to="/partner/dashboard/panel/newApplication"
            >
              New Application
            </Link>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 mb-3">
          <div className="panel-card">
            <div className="d-flex justify-content-center">
              <img src={partner2} alt="" />
            </div>
            <p className="my-4 fs-small m-auto text-muted text-center">
              Check Status of Applications Submitted
            </p>
            <Link
              className="btn text-dark bg-darkBlue border"
              to="/partner/dashboard/applications"
            >
              Application Status
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panel;
