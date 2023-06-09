import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
  signUpCustomer,
  verifyCodeForSignUp,
  removeUserForWrongCode,
} from "../../api/CustomerApi";
import { ThreeDots } from "react-loader-spinner";
import eye from "../../assets/icons/eye.png";
import lock from "../../assets/images/lock.png";
import tick from "../../assets/images/tick.png";
import Modal from "react-bootstrap/Modal";

const SignupForm = () => {
  document.title = "Reno | Customer Signup";

  const navigate = useNavigate();
  const [pass1, setPass1] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isTermAgree, setTermAgree] = useState(false);
  const [isAge, setIsAge] = useState(false);
  const [isEmailMatched, setIsEmailMatched] = useState(true);
  const [isPasswordMatched, setIsPasswordMatched] = useState(true);
  const [userData, setUserDate] = useState({
    IDCardNo: "",
    password: "",
    email: "",
    dob: "",
    firstName: "",
    lastName: "",
    phoneNo: "",
  });

  const { IDCardNo, password, email, dob, firstName, lastName, phoneNo } =
    userData;

  let apiData = {
    IDCardNo: parseInt(IDCardNo),
    password,
    email,
    dob,
    firstName,
    lastName,
    phoneNo: parseInt(phoneNo),
  };

  // showing code for login
  const [code, setCode] = useState("");
  const [showLoginCode, setShowLoginCode] = useState(false);
  const handleShowLoginCodeClose = () => {
    setShowLoginCode(false);
    //navigate('/customer/auth/login');
  };
  const handleShowLoginCode = () => {
    setShowLoginCode(true);
  };

  // sending data
  const sendData = async () => {
    if (isTermAgree === false) {
      toast.error("You must Agree with our terms and Conditions.");
      return;
    }
    if (isAge === false) {
      toast.error("Your Age must be 18 or more.");
      return;
    }
    if (isEmailMatched == false) {
      toast.error("Please Provide valid Email Address to continue.");
      return;
    }
    if (isPasswordMatched == false) {
      toast.error("Password must be of 8 digits Long.");
      return;
    }
    setIsFetching(true);
    const { data } = await signUpCustomer(apiData);
    if (data?.success === true) {
      setCode(data?.Code);
      toast.success("Verification Code Sent To Your Email Successfully.");
      //handleShowLoginCode()
      handleCodeSent();
    } else {
      toast.error(data?.message);
    }
    await delay(1500);
    setIsFetching(false);
  };

  // checking if user is signed in or not
  useEffect(() => {
    const customerToken = JSON.parse(
      localStorage.getItem("reno-customer-token")
    );
    const isSessionFound = sessionStorage.getItem("reno-customer-token");
    if (customerToken || isSessionFound) {
      navigate("/customer/dashboard/panel");
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

  // checking password
  const checkPassword = (value) => {
    if (
      value.match(
        /^(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,30}$/i
      )
    ) {
      setIsPasswordMatched(true);
    } else {
      setIsPasswordMatched(false);
    }
  };

  // getting sent code
  const [codeGot, setCodGot] = useState({
    code: "",
  });
  const [codeSent, setCodeSent] = useState(false);
  const handleCodeSentClose = () => {
    setCodeSent(false);
    setCodGot({
      code: "",
    });

    // discarding user form backend
    disCardUser();
  };
  const handleCodeSent = () => {
    setCodeSent(true);
  };

  // discarding user on entering wrong pin
  const disCardUser = async () => {
    const { data } = await removeUserForWrongCode(userData.phoneNo);
  };

  // matching code
  const matchCode = async () => {
    const { data } = await verifyCodeForSignUp(userData.phoneNo, codeGot.code);
    if (data?.success === true) {
      toast.success(data?.message);
      setCodGot({
        code: "",
      });
      setUserDate({
        IDCardNo: "",
        password: "",
        email: "",
        dob: "",
        phoneNo: "",
      });
      navigate("/customer/auth/login");
    } else {
      toast.error(data?.message);
    }
  };

  return (
    <>
      <div className="auth-container py-5">
        <div className="container">
          <div className="col-lg-5 col-md-6 m-auto">
            <div className="auth-links-container">
              <div className="auth-links">
                <Link
                  to="/customer/auth/login"
                  className="auth-link text-light"
                  style={{ textDecoration: "none" }}
                >
                  Login
                </Link>
                <Link
                  to="/customer/auth/signup"
                  className="auth-link text-light active"
                  style={{ textDecoration: "none" }}
                >
                  Sign up
                </Link>
              </div>
            </div>

            <h3 className="my-3">Customer Registration</h3>

            <div className="form-group mb-4">
              <label className="form-label">
                National ID/Iqama Number{" "}
                <span style={{ color: "white" }}>*</span>{" "}
              </label>
              <div className="auth-input-container">
                <input
                  type="number"
                  className="form-control px-3"
                  placeholder="Enter Your National ID or Iqama Number"
                  value={userData?.IDCardNo}
                  onChange={(e) =>
                    setUserDate({ ...userData, IDCardNo: e.target.value })
                  }
                  required
                />
              </div>
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
            <div className="form-group mb-4">
              <label className="form-label">Date of Birth</label>
              <div className="auth-input-container">
                <input
                  type="date"
                  className="form-control px-3 text-muted"
                  value={userData?.dob}
                  onChange={(e) =>
                    setUserDate({ ...userData, dob: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="form-group mb-4">
              <label className="form-label">
                Email Address <span style={{ color: "white" }}>*</span>
              </label>
              <div className="auth-input-container">
                <input
                  type="text"
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
              <label className="form-label">First Name</label>
              <div className="auth-input-container">
                <input
                  type="text"
                  className="form-control px-3"
                  placeholder="Enter Your First Name"
                  value={userData?.firstName}
                  onChange={(e) =>
                    setUserDate({ ...userData, firstName: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="form-group mb-4">
              <label className="form-label">Last Name</label>
              <div className="auth-input-container">
                <input
                  type="text"
                  className="form-control px-3"
                  placeholder="Enter Your Last Name"
                  value={userData?.lastName}
                  onChange={(e) =>
                    setUserDate({ ...userData, lastName: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="form-group mb-4">
              <label className="form-label">
                Password <span style={{ color: "white" }}>*</span>
              </label>
              <div className="pass-container">
                <div className="auth-input-container">
                  <input
                    type={`${pass1 ? "text" : "password"}`}
                    className="form-control px-3"
                    placeholder="Password"
                    value={userData?.password}
                    onChange={(e) =>
                      setUserDate({ ...userData, password: e.target.value })
                    }
                    required
                    onBlur={(e) => checkPassword(e.target.value)}
                  />
                </div>
                <img
                  src={eye}
                  onClick={() => setPass1(!pass1)}
                  className="reveal-btn"
                  alt=""
                />
              </div>
              {isPasswordMatched === false && (
                <span style={{ color: "crimson", fontSize: "12px" }}>
                  Password must contain minimum eight characters, at least one
                  letter, one number and one special character.
                </span>
              )}
            </div>
            <div class="form-check d-flex align-items-center mb-4">
              <input
                class="form-check-input auth-check me-3"
                type="checkbox"
                value=""
                id="termsConditions"
                onClick={() => setIsAge(!isAge)}
              />
              <label
                class="form-check-label fs-small text-muted"
                for="termsConditions"
              >
                I’m over 18 years old and agree to{" "}
                <Link
                  className="text-light text-decoration-underline"
                  to="/terms-and-conditions"
                >
                  Terms & Conditions.
                </Link>
                .
              </label>
            </div>
            <div class="form-check d-flex align-items-center mb-4">
              <input
                class="form-check-input auth-check me-3"
                type="checkbox"
                value=""
                id="privacyPolicy"
                onClick={() => setTermAgree(!isTermAgree)}
              />
              <label
                class="form-check-label fs-small text-muted"
                for="privacyPolicy"
              >
                I agree to{" "}
                <Link
                  className="text-light text-decoration-underline"
                  to="/terms-and-conditions"
                >
                  Privacy Policy
                </Link>
                .
              </label>
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
              <Link
                to=""
                className="auth-btn text-light"
                style={{ textDecoration: "none" }}
                onClick={sendData}
              >
                Continue
              </Link>
            )}
            <h6 className="text-center mb-0 mt-4">
              <Link
                to="/partner/auth/signup"
                className="text-light fs-small fw-light"
                style={{ textDecoration: "none" }}
              >
                Sign up as Merchant
              </Link>
            </h6>
          </div>
        </div>
      </div>

      {/* showing code */}
      <Modal
        show={showLoginCode}
        onHide={handleShowLoginCodeClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h4 className="text-dark fw-600">Code for Login</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className="modal-dialog modal-dialog-centered"
            style={{
              border: "2px solid white",
              marginTop: "-10px",
              marginBottom: "0px",
            }}
          >
            <div className="modal-content p-3">
              <div className="modal-body">
                <span
                  style={{
                    marginLeft: "25%",
                    fontSize: "18px",
                    marginBottom: "100px",
                    fontWeight: 600,
                    color: "#e74c3c",
                  }}
                >
                  (Development Only)
                </span>
                <h4 style={{ marginBottom: "30px", marginTop: "30px" }}>
                  Your Code for Sign in is ({code}).
                </h4>
                {isFetching === true ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      margin: "auto",
                    }}
                  >
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
                  <>
                    <button
                      className="btn  btn-success border modal-cancel border-color-darkBlue w-100 rounded-3 text-darkBlue "
                      style={{ marginTop: "40px" }}
                      onClick={handleShowLoginCodeClose}
                    >
                      OK
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/* showing code end */}

      {/* getting code */}
      <Modal
        show={codeSent}
        onHide={handleCodeSentClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>
            <h4 className="text-dark fw-600">Verify Your Phone Number</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className="modal-dialog modal-dialog-centered"
            style={{
              border: "2px solid white",
              marginTop: "-10px",
              marginBottom: "0px",
            }}
          >
            <div className="modal-content p-3">
              <div className="modal-body">
                <span
                  style={{
                    marginLeft: "25%",
                    fontSize: "18px",
                    marginBottom: "100px",
                    fontWeight: 600,
                    color: "#e74c3c",
                  }}
                >
                  (Development Only)
                </span>
                {/* <h4 style={{marginBottom : '30px', marginTop : '30px'}} >
                                    Your Code for Sign in is ({code}).
                                </h4> */}
                <div className="form-group mb-4">
                  <label className="form-label">
                    Please enter code sent to your email{" "}
                    <span style={{ color: "white" }}>*</span>{" "}
                  </label>
                  <input
                    type="number"
                    className="form-control px-3"
                    placeholder="Enter 4 digits Code"
                    value={codeGot?.code}
                    onChange={(e) =>
                      setCodGot({ ...codeGot, code: e.target.value })
                    }
                    required
                  />
                </div>
                {isFetching === true ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      margin: "auto",
                    }}
                  >
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
                  <>
                    <button
                      className="btn  btn-success border modal-cancel border-color-darkBlue w-100 rounded-3 text-darkBlue "
                      style={{ marginTop: "20px" }}
                      onClick={matchCode}
                    >
                      Verify
                    </button>
                    <button
                      className="btn  btn-danger border modal-cancel border-color-darkBlue w-100 rounded-3 text-darkBlue "
                      style={{ marginTop: "20px" }}
                      onClick={handleCodeSentClose}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/* getting code end */}
    </>
  );
};

export default SignupForm;
