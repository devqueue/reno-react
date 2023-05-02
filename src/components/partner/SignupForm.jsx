import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { signUpMerchant } from "../../api/MerchentApi";
import { ThreeDots } from "react-loader-spinner";

const SignupForm = () => {
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);
  const [isEmailMatched, setIsEmailMatched] = useState(true);
  const [isPasswordMatched, setIsPasswordMatched] = useState(true);
  const [userData, setUserDate] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    country: "Saudi Arabia",
    city: "Riyadh",
    category: "Lighting",
  });

  // sending data
  const sendData = async () => {
    if (isEmailMatched == false) {
      toast.error("Please Provide valid Email Address to continue.");
      return;
    }
    setIsFetching(true);
    const { data } = await signUpMerchant(userData);
    if (data?.success === true) {
      toast.success(data?.message);
      setUserDate({
        firstName: "",
        lastName: "",
        email: "",
        phoneNo: "",
        country: "",
        city: "",
        category: "",
      });
      //navigate('/partner/auth/login');
    } else {
      toast.error(data?.message);
    }
    await delay(1500);
    setIsFetching(false);
  };

  // checking if user is signed in or not
  useEffect(() => {
    const merchantToken = JSON.parse(
      localStorage.getItem("reno-merchant-token")
    );
    const isSessionFound = sessionStorage.getItem("reno-merchant-token");
    if (merchantToken || isSessionFound) {
      navigate("/partner/dashboard/panel");
    }
  }, []);

  // sleeping
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  // checking email pattern
  const matchEmail = (email) => {
    if (email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i)) {
      setIsEmailMatched(true);
    } else {
      setIsEmailMatched(false);
    }
  };

  document.title = "Reno | Partner Signup";
  return (
    <div className="auth-container py-5">
      <div className="container">
        <div className="col-lg-5 col-md-6 m-auto">
          <div className="auth-links-container">
            <div className="auth-links">
              <Link
                to="/partner/auth/login"
                className="auth-link text-light"
                style={{ textDecoration: "none" }}
              >
                Login
              </Link>
              <Link
                to="/partner/auth/signup"
                className="auth-link text-light active"
                style={{ textDecoration: "none" }}
              >
                Sign up
              </Link>
            </div>
          </div>

          <h3 className="my-3">Partner Registration</h3>

          <div className="row">
            <div className="form-group col-lg-6 mb-4">
              <label className="form-label">
                First Name <span style={{ color: "white" }}>*</span>
              </label>
              <div className="auth-input-container">
                <input
                  type="text"
                  className="form-control px-3"
                  placeholder="First Name"
                  value={userData?.firstName}
                  onChange={(e) =>
                    setUserDate({ ...userData, firstName: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="form-group col-lg-6 mb-4">
              <label className="form-label">
                Last Name <span style={{ color: "white" }}>*</span>
              </label>
              <div className="auth-input-container">
                <input
                  type="text"
                  className="form-control px-3"
                  placeholder="Last Name"
                  value={userData?.lastName}
                  onChange={(e) =>
                    setUserDate({ ...userData, lastName: e.target.value })
                  }
                  required
                />
              </div>
            </div>
          </div>
          <div className="form-group mb-4">
            <label className="form-label">
              Email Address <span style={{ color: "white" }}>*</span>
            </label>
            <div className="auth-input-container">
              <input
                type="email"
                className="form-control px-3"
                placeholder="Enter Your Email Address"
                value={userData?.email}
                onChange={(e) =>
                  setUserDate({ ...userData, email: e.target.value })
                }
                required
                onBlur={(e) => matchEmail(e.target.value)}
              />
            </div>
            {isEmailMatched === false && (
              <span style={{ color: "crimson", fontSize: "12px" }}>
                Please provide a valid email address.
              </span>
            )}
          </div>
          <div className="form-group mb-4">
            <label className="form-label">
              Mobile Number <span style={{ color: "white" }}>*</span>
            </label>
            <div className="d-flex">
              <select
                class="form-select shadow-none fs-small text-muted number-select me-2"
                aria-label="Default select example"
              >
                <option selected>+966</option>
                <option>+212</option>
              </select>
              <div className="auth-input-container">
                <input
                  type="number"
                  className="form-control px-3"
                  placeholder="Enter Your Mobile Number"
                  style={{ flex: "1" }}
                  value={userData?.phoneNo}
                  onChange={(e) =>
                    setUserDate({ ...userData, phoneNo: e.target.value })
                  }
                  required
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-6 mb-4">
              <label className="form-label">
                Select Country <span style={{ color: "white" }}>*</span>
              </label>
              <select
                class="form-select shadow-none fs-small text-muted number-select w-100 me-2"
                aria-label="Default select example"
                value={userData?.country}
                onChange={(e) =>
                  setUserDate({ ...userData, country: e.target.value })
                }
              >
                <option>Saudi Arabia</option>
                <option>United Emirates</option>
                <option>United States</option>
              </select>
            </div>
            <div className="form-group col-lg-6 mb-4">
              <label className="form-label">
                City <span style={{ color: "white" }}>*</span>
              </label>
              <select
                class="form-select shadow-none fs-small text-muted number-select w-100 me-2"
                aria-label="Default select example"
                value={userData?.city}
                onChange={(e) =>
                  setUserDate({ ...userData, city: e.target.value })
                }
              >
                {userData?.country === "Saudi Arabia" && (
                  <>
                    <option>Riyadh</option>
                    <option>Jaddah</option>
                    <option>Dammam</option>
                    <option>Madina</option>
                    <option>Makkah</option>
                    <option>Taif</option>
                    <option>Tabuk</option>
                    <option>Al Qatif</option>
                    <option>Al Kharj</option>
                    <option>Al Badah</option>
                    <option>Al Ula</option>
                  </>
                )}
                {userData?.country === "United Emirates" && (
                  <>
                    <option>Abu Dhabi</option>
                    <option>Dubai</option>
                    <option>Sharjah</option>
                    <option>Al Ain</option>
                    <option>Ajman</option>
                    <option>Ras al-Khaimah</option>
                    <option>Fujairah</option>
                    <option>Umm al-Quwain</option>
                  </>
                )}
                {userData?.country === "United States" && (
                  <>
                    <option>New York City, New York</option>
                    <option>Los Angeles, California</option>
                    <option>Chicago, Illinois</option>
                    <option>Houston, Texas</option>
                    <option>Phoenix, Arizona</option>
                    <option>Philadelphia, Pennsylvania</option>
                    <option>San Antonio, Texas</option>
                    <option>San Diego, California</option>
                    <option>Dallas, Texas</option>
                    <option>San Jose, California</option>
                    <option>Austin, Texas</option>
                    <option>Jacksonville, Florida</option>
                    <option>Fort Worth, Texas</option>
                    <option>Washington, D.C.</option>
                  </>
                )}
              </select>
            </div>
          </div>
          <div className="form-group mb-4">
            <label className="form-label"> Select your Category </label>
            <select
              class="form-select shadow-none fs-small text-muted number-select w-100 me-2"
              aria-label="Default select example"
              value={userData?.category}
              onChange={(e) =>
                setUserDate({ ...userData, category: e.target.value })
              }
            >
              <option>Lighting</option>
              <option>Cooling/Heating</option>
              <option>Smart Home technology System</option>
              <option>Solar & Battery System</option>
              <option>Plumbing</option>
              <option>Electrical </option>
              <option>Blinds, curtains & Shutters</option>
              <option>Flooring & Wallpaper</option>
              <option>Garage Doors</option>
            </select>
          </div>

          {isFetching === true ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ThreeDots
                height="60"
                width="60"
                radius="9"
                color="green"
                ariaLabel="three-dots-loading"
                wrapperStyle
                wrapperClass
              />
            </div>
          ) : (
            <Link to="" className="auth-btn text-light" onClick={sendData}>
              Continue
            </Link>
          )}

          <h6 className="text-center mb-0 mt-4">
            <Link
              to="/customer/auth/signup"
              className="text-light fs-small fw-light"
              style={{ textDecoration: "none" }}
            >
              Sign up as Customer
            </Link>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
