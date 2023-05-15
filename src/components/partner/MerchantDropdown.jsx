import React, { useState, useEffect } from "react";
import { AiFillBell } from "react-icons/ai";
import moment from "moment";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const MerchantDropdown = () => {
  const [userName, setUserName] = useState("");
  const [userPic, setUserPic] = useState("");

  const location = useLocation();
  // checking if user is signed in or not
  useEffect(() => {
    const customerToken = JSON.parse(
      localStorage.getItem("reno-merchant-token")
    );
    //   const isSessionFound = sessionStorage.getItem("reno-merchant-token");
    if (!customerToken) {
      navigate("/partner/auth/login");
    }
    let name = JSON.parse(localStorage.getItem("reno-merchantName"));
    if (name) {
      // name = JSON.parse(sessionStorage.getItem("reno-merchantName"));
      setUserName(name);
    }

    let pic = JSON.parse(localStorage.getItem("reno-merchantPic"));
    if (pic) {
      setUserPic(
        process.env.REACT_APP_API_SERVER_URL + "/merchantsProfilePics/" + pic
      );
    }
  }, [location]);

  const navigate = useNavigate();

  // sleeping
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  // logging out
  const logout = async () => {
    localStorage.removeItem("reno-merchant-token");
    localStorage.removeItem("reno-merchantId");
    sessionStorage.removeItem("reno-merchant-token");
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
  );
};

export default MerchantDropdown;
