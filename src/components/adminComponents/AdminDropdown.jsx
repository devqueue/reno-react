import React, { useState, useEffect } from "react";
import moment from "moment";
import { AiFillBell } from "react-icons/ai";
import { toast } from "react-toastify";
import { useNavigate, Link, useLocation } from "react-router-dom";

const AdminDropdown = () => {
  const [userName, setUserName] = useState("");
  const [userPic, setUserPic] = useState("");

  const navigate = useNavigate();
  // sleeping

  const location = useLocation();
  // checking if user is signed in or not
  useEffect(() => {
    const adminToken = JSON.parse(localStorage.getItem("reno-admin-token"));
    // const isSessionFound = sessionStorage.getItem("reno-admin-token");
    if (!adminToken) {
      navigate("/admin/login");
    }
    let name = JSON.parse(localStorage.getItem("reno-adminName"));
    if (name) {
      // name = JSON.parse(sessionStorage.getItem("reno-adminName"));
      setUserName(name);
    }

    let pic = JSON.parse(localStorage.getItem("reno-adminPic"));
    if (pic) {
      // pic = JSON.parse(sessionStorage.getItem("reno-adminPic"));
      setUserPic(
        process.env.REACT_APP_API_SERVER_URL + "/adminProfileImages/" + pic
      );
    }
  }, [location]);
  // logging out
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const logout = async () => {
    localStorage.removeItem("reno-admin-token");
    localStorage.removeItem("reno-adminId");
    sessionStorage.removeItem("reno-admin-token");
    localStorage.removeItem("reno-adminName");
    sessionStorage.removeItem("reno-adminName");
    localStorage.removeItem("reno-adminPic");
    sessionStorage.removeItem("reno-adminPic");
    toast.success("Signed Out SuccessFully");
    await delay(2000);
    navigate("/admin/login");
  };

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
          <Link className="dropdown-item" to="/admin/profile">
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

export default AdminDropdown;
