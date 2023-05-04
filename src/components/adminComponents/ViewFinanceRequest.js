import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { AiFillBell } from "react-icons/ai";
import { toast } from "react-toastify";
import user from "../../assets/images/user.jpg";
import pen from "../../assets/icons/pen.png";
import quoteStep1 from "../../assets/images/quoteStep1.png";
import quoteStep2 from "../../assets/images/quoteStep2.png";
import quoteStep3 from "../../assets/images/quoteStep3.png";
import quoteStep4 from "../../assets/images/quoteStep4.png";
import tick from "../../assets/images/tick.png";
import {
  approveAnyFinancialRequest,
  getSingleQuoteDetails,
} from "../../api/AdminApi";
import {
  getAllNotificationsOfAdmin,
  markNotificationsOfAdminRead,
} from "../../api/AdminApi";
import { ThreeDots } from "react-loader-spinner";
import moment from "moment";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";

const RequestFinance = () => {
  document.title = "Reno | Customer Portal";
  const { id } = useParams();
  const [step, setStep] = useState(4);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userPic, setUserPic] = useState("");

  const [isFetching, setIsFetching] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const [quoteDate, setQuoteData] = useState();

  // getting details of quote
  useEffect(() => {
    const getData = async () => {
      setIsFetching(true);
      const { data } = await getSingleQuoteDetails(id);
      if (data?.success === true) {
        setQuoteData(data?.Quote[0]);
      } else {
        toast.error(data?.message);
      }
      setIsFetching(false);
    };
    getData();
  }, [id]);

  const [personalInfo, setPersonalInfo] = useState(false);
  const handlePersonalInfoClose = () => {
    setPersonalInfo(false);
    //setUpdateData(null)
  };
  const handlePersonalInfoShow = () => {
    setPersonalInfo(true);
    setUpdateData(quoteDate);
  };

  const [monthlyIncome, setMonthlyIncome] = useState(false);
  const handleMonthlyIncomeClose = () => {
    setMonthlyIncome(false);
    //setUpdateData(null)
  };
  const handleMonthlyIncomeShow = () => {
    setUpdateData(quoteDate);
    setMonthlyIncome(true);
  };

  const [expense, setExpense] = useState(false);
  const handleExpenseClose = () => {
    setExpense(false);
    //setUpdateData(null)
  };
  const handleExpenseShow = () => {
    setUpdateData(quoteDate);
    setExpense(true);
  };

  // checking all fields of step 01
  const checkStep01 = () => {
    // console.log("quoteDate: ",quoteDate)
    // if(quoteDate?.homeType === "" || quoteDate?.martialStatus === "" || quoteDate?.homeSize === 0 || quoteDate?.familyMembersCount === 0 || quoteDate?.familyMembersFees === 0 || quoteDate?.workingStatus === 0 ){
    //     toast.error("Please Provide All Fields");
    // }else{
    setStep(2);
    //}
  };

  // checking all fields of step 02
  const checkStep02 = () => {
    // if(quoteDate?.basicSalary === 0 || quoteDate?.housingAllowance === '' ){
    //     toast.error("Please Provide All Fields");
    // }else{
    //     let previous = Number(quoteDate?.basicSalary);
    //     previous -= Number(quoteDate?.familyMembersFees);
    //     setQuoteData({...quoteDate , basicSalary : previous})
    setStep(3);
    //}
  };

  // checking all fields of step 03
  const checkStep03 = () => {
    // if(quoteDate?.housingExpense === 0 || quoteDate?.homeWorkerWageExpense === 0 || quoteDate?.healthCareExpense === 0 || quoteDate?.foodBeverageExpense === 0 || quoteDate?.transportationExpense === 0   ){
    //     toast.error("Please Provide All Fields");
    // }else{
    setStep(4);
    //}
  };
  // empty quote data
  const emptyQuoteData = () => {
    setUpdateData({
      isOwned: false,
      homeType: "",
      martialStatus: "",
      homeSize: 0,
      familyMembersCount: 0,
      workingStatus: false,
      familyMembersFees: 0,
      basicSalary: 0,
      housingAllowance: 0,
      otherAllowance: 0,
      housingExpense: 0,
      homeWorkerWageExpense: 0,
      healthCareExpense: 0,
      homeLocation: "",
      foodBeverageExpense: 0,
      additionalMonthlyExpense: 0,
      transportationExpense: 0,
      additionalLoansExpense: 0,
    });
  };

  // logging out
  const logout = async () => {
    localStorage.removeItem("reno-customer-token");
    sessionStorage.removeItem("reno-customer-token");
    localStorage.removeItem("reno-customerName");
    sessionStorage.removeItem("reno-customerName");
    localStorage.removeItem("reno-customerPhoto");
    sessionStorage.removeItem("reno-customerPhoto");
    toast.success("Signed Out SuccessFully");
    await delay(2000);
    navigate("/admin/login");
  };

  // sleeping
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const location = useLocation();
  // checking if user is signed in or not
  useEffect(() => {
    const customerToken = JSON.parse(localStorage.getItem("reno-admin-token"));
    const isSessionFound = sessionStorage.getItem("reno-admin-token");
    if (!customerToken && !isSessionFound) {
      navigate("/admin/login");
    }
    let name = JSON.parse(localStorage.getItem("reno-adminName"));
    if (!name) {
      name = JSON.parse(sessionStorage.getItem("reno-adminName"));
    }
    setUserName(name);

    let pic = JSON.parse(localStorage.getItem("reno-adminPic"));
    if (!pic) {
      pic = JSON.parse(sessionStorage.getItem("reno-adminPic"));
    }
    setUserPic(
      process.env.REACT_APP_API_SERVER_URL + "/adminProfileImages/" + pic
    );
  }, []);

  // updating data
  const saveChanges = () => {
    setQuoteData(updateData);
    handlePersonalInfoClose();
    handleMonthlyIncomeClose();
    handleExpenseClose();
  };

  const [allNotifications, setAllNotifications] = useState([]);
  const [allNotificationsCount, setAllNotificationsCount] = useState([]);

  // changing home allownce
  const addAmt = () => {
    if (quoteDate.housingAllowance !== 0) {
      let previous = Number(quoteDate?.basicSalary);
      previous += Number(quoteDate?.housingAllowance);
      setQuoteData({ ...quoteDate, basicSalary: previous });
    }
  };
  const addAmtOne = () => {
    if (quoteDate.housingAllowance !== 0) {
      let previous = Number(quoteDate?.basicSalary);
      previous += Number(quoteDate?.otherAllowance);
      setQuoteData({ ...quoteDate, basicSalary: previous });
    }
  };

  // approving merchant request for quote
  const changeStatus = async (id, status) => {
    const { data } = await approveAnyFinancialRequest(id, status);
    if (data?.success === true) {
      if (status == false) {
        toast.success("Quote DisApproved SuccessFully");
        setQuoteData({ ...quoteDate, isAdminApproved: false });
      } else {
        toast.success("Quote Approved SuccessFully");
        setQuoteData({ ...quoteDate, isAdminApproved: true });
      }
    } else {
      toast.error(data?.message);
    }
  };

  // getting all notifications
  useEffect(() => {
    const getAllNotifications = async () => {
      const { data } = await getAllNotificationsOfAdmin();
      if (data?.success === true) {
        setAllNotifications(data?.Notifications);
        let count = 0;
        data?.Notifications?.map(
          (item) => item?.isRead === false && (count += 1)
        );
        setAllNotificationsCount(count);
      }
    };
    getAllNotifications();
  }, []);
  // marking notification as read
  const readNotification = async (id) => {
    const { data } = await markNotificationsOfAdminRead(id);
    if (data?.success === true) {
      let newArr = allNotifications;
      let isFound = newArr.find((item) => item._id == id);
      if (isFound) {
        isFound.isRead = true;
        newArr.filter((item) => (item._id == id ? isFound : item));
        setAllNotifications(newArr);
        setAllNotificationsCount((prev) => prev - 1);
      }
    }
  };

  return (
    <div className="container-fluid p-4 dashboard-content">
      <div className="panel-top d-flex align-items-center justify-content-between">
        <div className="panel-left">
          <h5 className="mb-0 fw-600">All Merchants</h5>
          {/* <p className='text-muted mb-0 text-light fs-small'>
                                {moment().format('MMMM Do YYYY')}
                                </p> */}
        </div>

        <div className="d-flex align-items-center panel-right">
          <div class="dropdown profile-dropdown">
            <Link
              to="#"
              className="notification-btn"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <AiFillBell />
              {allNotificationsCount > 0 && (
                <span>{allNotificationsCount}</span>
              )}
            </Link>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              {allNotifications?.length > 0 ? (
                allNotifications?.map((item) =>
                  item?.isRead === false ? (
                    <li
                      style={{ backgroundColor: "#ecf0f1" }}
                      onClick={() => readNotification(item?._id)}
                    >
                      <Link
                        class="dropdown-item"
                        to={
                          item?.type === "Customer"
                            ? "/admin/customersData"
                            : item?.type === "Quote"
                            ? "/admin/quotesData"
                            : item?.type === "Merchant"
                            ? "/admin/merchantsData"
                            : item?.type === "Financial Request"
                            ? "/admin/financialRequestsData"
                            : "/admin/customer-issues"
                        }
                      >
                        <strong>{item?.message} </strong> <br />
                        <span style={{ fontSize: "12px", color: "#34495e" }}>
                          {moment(item?.createdAt).format("MMM Do, h:mm:ss a")}
                        </span>
                      </Link>
                    </li>
                  ) : (
                    <li style={{ backgroundColor: "transparent" }}>
                      <Link
                        class="dropdown-item"
                        to={
                          item?.type === "Customer"
                            ? "/admin/customersData"
                            : item?.type === "Quote"
                            ? "/admin/quotesData"
                            : item?.type === "Merchant"
                            ? "/admin/merchantsData"
                            : item?.type === "Financial Request"
                            ? "/admin/financialRequestsData"
                            : "/admin/customer-issues"
                        }
                      >
                        <strong>{item?.message} </strong> <br />
                        <span
                          className="text-muted"
                          style={{ fontSize: "12px" }}
                        >
                          {moment(item?.createdAt).format("MMM Do, h:mm:ss a")}
                        </span>
                      </Link>
                    </li>
                  )
                )
              ) : (
                <li style={{ marginLeft: "15px" }}>Empty</li>
              )}
            </ul>
          </div>

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
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <span
          style={{
            color: "#6c5ce7",
            fontSize: "20px",
            fontWeight: 600,
            marginRight: "20px",
          }}
        >
          Status :
        </span>
        <Dropdown as={ButtonGroup}>
          {quoteDate?.isAdminApproved == true ? (
            <Button variant="success">Approved</Button>
          ) : (
            <Button variant="danger">Not Approved</Button>
          )}

          <Dropdown.Toggle split variant="info" id="dropdown-split-basic" />

          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => changeStatus(id, true)}
              style={{ backgroundColor: "#6ab04c", color: "white" }}
            >
              Approve Now
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => changeStatus(id, false)}
              style={{ backgroundColor: "crimson", color: "white" }}
            >
              Decline Now
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <div className="finance-steps">
            <div
              className={`finance-step ${
                step == 1 ? "active" : step > 1 ? "done" : ""
              }`}
            >
              <div className="step-img">
                <img src={quoteStep1} alt="" />
              </div>
              <p className="mb-0 text-muted fs-small">Personal Information</p>
            </div>
            <div
              className={`finance-step ${
                step == 2 ? "active" : step > 2 ? "done" : ""
              }`}
            >
              <div className="step-img">
                <img src={quoteStep2} alt="" />
              </div>
              <p className="mb-0 text-muted fs-small">Monthly Income </p>
            </div>
            <div
              className={`finance-step ${
                step == 3 ? "active" : step > 3 ? "done" : ""
              }`}
            >
              <div className="step-img">
                <img src={quoteStep3} alt="" />
              </div>
              <p className="mb-0 text-muted fs-small">
                Expenses and obligations
              </p>
            </div>
            <div
              className={`finance-step ${
                step == 4 ? "active" : step > 4 ? "done" : ""
              }`}
            >
              <div className="step-img">
                <img src={quoteStep4} alt="" />
              </div>
              <p className="mb-0 text-muted fs-small">Review</p>
            </div>
          </div>
        </div>
      </div>

      {isFetching === true ? (
        <div
          style={{ display: "flex", justifyContent: "center", margin: "auto" }}
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
      ) : step == 1 ? (
        <div className="row mt-5">
          <div className="col-lg-10 m-auto">
            <h5 className="text-center fw-600">Personal Information</h5>
            <h6 className="text-center text-muted fw-normal">
              Please fill in your personal information below.
            </h6>

            <div className="row finance-form mt-4">
              <div className="col-lg-6 form-group mb-4">
                <label className="form-label text-muted fs-small">
                  Property
                </label>
                <select
                  class="form-select text-muted"
                  aria-label="Default select example"
                >
                  <option selected disabled>
                    {quoteDate?.personalInfo?.isOwned == true
                      ? "Own House"
                      : "Rented"}
                  </option>
                  {/* <option value={true}>Owned</option>
                                                <option value={false}>Rented</option> */}
                </select>
              </div>
              <div className="col-lg-6 form-group mb-4">
                <label className="form-label text-muted fs-small">
                  Home Type
                </label>
                <select
                  class="form-select text-muted"
                  aria-label="Default select example"
                >
                  <option selected disabled>
                    {quoteDate?.personalInfo?.homeType}
                  </option>
                  {/* <option>Apartment</option>
                                                <option>Villa</option>
                                                <option>Duplex</option>
                                                <option>Floor</option> */}
                </select>
              </div>
              <div className="col-lg-6 form-group mb-4">
                <label className="form-label text-muted fs-small">
                  Home Location
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your home location here"
                  value={quoteDate?.personalInfo?.homeLocation}
                />
              </div>
              <div className="col-lg-6 form-group mb-4">
                <label className="form-label text-muted fs-small">
                  Home Size (sqr meter)
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your home size"
                  value={quoteDate?.personalInfo?.homeSize}
                />
              </div>
              <div className="col-lg-6 form-group mb-4">
                <label className="form-label text-muted fs-small">
                  Marital status
                </label>
                <select
                  class="form-select text-muted"
                  aria-label="Default select example"
                >
                  <option selected>
                    {quoteDate?.personalInfo?.martialStatus}
                  </option>
                  {/* <option >Married</option>
                                                <option >Un-Married</option>
                                                <option >Divorced</option> */}
                </select>
              </div>
              <div className="col-lg-6 form-group mb-4">
                <label className="form-label text-muted fs-small">
                  Number of family Members
                </label>
                <select
                  class="form-select text-muted"
                  aria-label="Default select example"
                >
                  <option selected>
                    {quoteDate?.personalInfo?.familyMembersCount}
                  </option>
                  {/* <option>3</option>
                                                <option>5</option>
                                                <option>10</option> */}
                </select>
              </div>
              <div className="col-lg-6 form-group mb-4">
                <label className="form-label text-muted fs-small">
                  Family member education fees (SAR)
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your family member education fees"
                  value={quoteDate?.personalInfo?.familyMembersFees}
                />
              </div>
              <div className="col-lg-6 form-group mb-4">
                <label className="form-label text-muted fs-small">
                  Working status
                </label>
                <select
                  class="form-select text-muted"
                  aria-label="Default select example"
                >
                  <option selected>
                    {quoteDate?.personalInfo?.workingStatus == "true"
                      ? "Working"
                      : "Not Working"}
                  </option>
                  {/* <option value={true}>Yes</option>
                                                <option value={false}>No</option> */}
                </select>
              </div>

              <div className="col-12 mt-4 d-flex justify-content-center step-btns-container">
                {/* <Link to='/customer/dashboard/quotesReceived' className="btn finance-form-cancel me-3" style={{backgroundColor : 'crimson' , color : 'white'}} onClick={emptyQuoteData} >Cancel</Link> */}
                <button
                  className="btn bg-darkBlue text-light "
                  style={{ backgroundColor: "#130f40", color: "white" }}
                  onClick={checkStep01}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {step == 2 ? (
        <div className="row mt-5">
          <div className="col-lg-6 m-auto">
            <h5 className="text-center fw-600">Monthly Income</h5>
            <h6 className="text-center text-muted fw-normal">
              Please fill in your monthly income below.
            </h6>

            <div className="row finance-form mt-4">
              <div className="col-12 form-group mb-4">
                <label className="form-label text-muted fs-small">
                  Basic Salary
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Please your basic salary here (SAR)"
                  value={quoteDate?.MonthlyIncome?.basicSalary}
                />
              </div>
              <div className="col-12 form-group mb-4">
                <label className="form-label text-muted fs-small">
                  Housing Allowance
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Please your housing allowance here (SAR)"
                  value={quoteDate?.MonthlyIncome?.housingAllowance}
                />
              </div>
              <div className="col-12 form-group mb-4">
                <label className="form-label text-muted fs-small">
                  Other Allowance(Optional)
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Please your other allowance here (SAR)"
                  value={quoteDate?.MonthlyIncome?.otherAllowances}
                />
              </div>

              <div className="col-12 mt-4 d-flex justify-content-center step-btns-container">
                {/* <Link to='/customer/dashboard/quotesReceived' className="btn finance-form-cancel me-3"  style={{flex: '1' , backgroundColor : 'crimson' , color : 'white'}} onClick={emptyQuoteData}>Cancel</Link> */}
                <button
                  className="btn bg-darkBlue text-light"
                  style={{
                    flex: "1",
                    backgroundColor: "#130f40",
                    color: "white",
                  }}
                  onClick={() => checkStep02()}
                >
                  Next
                </button>
              </div>

              <div className="col-12 mt-4 d-flex justify-content-center">
                <button
                  className="btn border border-color-darkBlue text-darkBlue"
                  style={{
                    flex: "1",
                    backgroundColor: "#30336b",
                    color: "white",
                  }}
                  onClick={() => setStep(1)}
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {step == 3 ? (
        <div className="row mt-5">
          <div className="col-lg-10 m-auto">
            <h5 className="text-center fw-600">Expenses and obligations</h5>
            <h6 className="text-center text-muted fw-normal">
              Please fill in your expenses and obligations below.
            </h6>

            <div className="row finance-form mt-4">
              <div className="col-12">
                <div className="progress-container">
                  <h6 className="text-light text-center mb-4">
                    Current Monthly Expenses
                  </h6>
                  <div className="progress-bar-container">
                    <div className="progress-bar"></div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="text-light fs-small">
                      {Number(quoteDate?.expensesAndObligations?.housing) +
                        Number(
                          quoteDate?.expensesAndObligations?.homeWorkerWage
                        ) +
                        Number(quoteDate?.expensesAndObligations?.healthCare) +
                        Number(
                          quoteDate?.expensesAndObligations?.foodBeverage
                        ) +
                        Number(
                          quoteDate?.expensesAndObligations?.transportation
                        )}
                      .00
                      <span className="text-muted"> SAR/month</span>
                    </div>
                    <div className="text-light fs-small">
                      <span className="text-color-primary me-2">
                        Total income
                      </span>
                      {Number(quoteDate?.MonthlyIncome?.basicSalary) +
                        Number(quoteDate?.MonthlyIncome?.housingAllowance) +
                        Number(quoteDate?.MonthlyIncome?.otherAllowances)}
                      .00
                      <span className="text-muted"> SAR/month</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 mt-4">
                <div className="expense-card">
                  <h6 className="text-darkBlue fw-600 mb-4 text-center">
                    Housing
                  </h6>

                  <input
                    type="range"
                    class="form-range"
                    id="customRange1"
                    value={quoteDate?.expensesAndObligations?.housing}
                  />

                  <div className="d-flex fw-600 justify-content-between">
                    <div className="text-darkBlue fs-small">
                      {quoteDate?.expensesAndObligations?.housing}.00{" "}
                      <span className="text-muted fw-normal"> SAR/month</span>
                    </div>
                    {/* <div className='text-darkBlue fs-small'>
                                                0.00 <span className='text-muted fw-normal'> SAR/month</span>
                                            </div> */}
                  </div>
                </div>
              </div>

              <div className="col-lg-6 mt-4">
                <div className="expense-card">
                  <h6 className="text-darkBlue fw-600 mb-4 text-center">
                    Homeworkers wage
                  </h6>

                  <input
                    type="range"
                    class="form-range"
                    id="customRange1"
                    value={quoteDate?.expensesAndObligations?.homeWorkerWage}
                  />

                  <div className="d-flex fw-600 justify-content-between">
                    <div className="text-darkBlue fs-small">
                      {quoteDate?.expensesAndObligations?.homeWorkerWage}.00{" "}
                      <span className="text-muted fw-normal"> SAR/month</span>
                    </div>
                    {/* <div className='text-darkBlue fs-small'>
                                                0.00<span className='text-muted fw-normal'> SAR/month</span>
                                            </div> */}
                  </div>
                </div>
              </div>

              <div className="col-lg-6 mt-4">
                <div className="expense-card">
                  <h6 className="text-darkBlue fw-600 mb-4 text-center">
                    Food & beverage expenses
                  </h6>

                  <input
                    type="range"
                    class="form-range"
                    id="customRange1"
                    value={quoteDate?.expensesAndObligations?.foodBeverage}
                  />

                  <div className="d-flex fw-600 justify-content-between">
                    <div className="text-darkBlue fs-small">
                      {quoteDate?.expensesAndObligations?.foodBeverage} .00{" "}
                      <span className="text-muted fw-normal"> SAR/month</span>
                    </div>
                    {/* <div className='text-darkBlue fs-small'>
                                                0.00 <span className='text-muted fw-normal'> SAR/month</span>
                                            </div> */}
                  </div>
                </div>
              </div>

              <div className="col-lg-6 mt-4">
                <div className="expense-card">
                  <h6 className="text-darkBlue fw-600 mb-4 text-center">
                    Health Care & Insurance
                  </h6>

                  <input
                    type="range"
                    class="form-range"
                    id="customRange1"
                    value={quoteDate?.expensesAndObligations?.healthCare}
                  />

                  <div className="d-flex fw-600 justify-content-between">
                    <div className="text-darkBlue fs-small">
                      {quoteDate?.expensesAndObligations?.healthCare}.00{" "}
                      <span className="text-muted fw-normal"> SAR/month</span>
                    </div>
                    {/* <div className='text-darkBlue fs-small'>
                                                8,000 <span className='text-muted fw-normal'> SAR/month</span>
                                            </div> */}
                  </div>
                </div>
              </div>

              <div className="col-lg-6 mt-4">
                <div className="expense-card">
                  <h6 className="text-darkBlue fw-600 mb-4 text-center">
                    Transportation & Communication
                  </h6>

                  <input
                    type="range"
                    class="form-range"
                    id="customRange1"
                    value={quoteDate?.expensesAndObligations?.transportation}
                  />

                  <div className="d-flex fw-600 justify-content-between">
                    <div className="text-darkBlue fs-small">
                      {quoteDate?.expensesAndObligations?.transportation}.00{" "}
                      <span className="text-muted fw-normal"> SAR/month</span>
                    </div>
                    {/* <div className='text-darkBlue fs-small'>
                                                0.00 <span className='text-muted fw-normal'> SAR/month</span>
                                            </div> */}
                  </div>
                </div>
              </div>

              <div className="col-lg-6 mt-4">
                <div className="expense-card mb-4 p-3 d-flex align-items-center justify-content-between">
                  <p className="mb-0 text-darkBlue fs-small">
                    Any addition monthly expense
                  </p>
                  <input type="checkbox" className="form-check-input" />
                </div>
                <div className="expense-card py-3 px-3 d-flex align-items-center justify-content-between">
                  <p className="mb-0 text-darkBlue fs-small">
                    Any additional loans
                  </p>
                  <input type="checkbox" className="form-check-input" />
                </div>
              </div>

              <div className="col-12 mt-4 d-flex justify-content-center step-btns-container">
                {/* <Link to='/customer/dashboard/quotesReceived' className="btn finance-form-cancel me-3" style={{ flex: '1' ,backgroundColor : 'crimson' , color : 'white' }} onClick={emptyQuoteData}>Cancel</Link> */}
                <button
                  className="btn bg-darkBlue text-light"
                  style={{
                    flex: "1",
                    backgroundColor: "#130f40",
                    color: "white",
                  }}
                  onClick={() => checkStep03()}
                >
                  Next
                </button>
              </div>

              <div className="col-12 mt-4 d-flex justify-content-center">
                <button
                  className="btn border border-color-darkBlue text-darkBlue"
                  style={{
                    flex: "1",
                    backgroundColor: "#30336b",
                    color: "white",
                  }}
                  onClick={() => setStep(2)}
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {step == 4 ? (
        <div className="row mt-5">
          <div className="col-12 m-auto">
            <h5 className="text-center fw-600">Review</h5>
            <h6 className="text-center text-muted fw-normal">
              Please review your finance request.
            </h6>

            <div className="row finance-form mt-4">
              <div className="col-lg-4 my-2">
                <div className="review-card">
                  <div className="review-heading d-flex justify-content-between align-items-center p-3">
                    <h6 className="mb-0">Personal Information</h6>
                    {/* <img src={pen} alt="" onClick={handlePersonalInfoShow} /> */}
                  </div>
                  <ul className="fs-small mb-0 p-3">
                    <li className="d-flex py-2 border-bottom align-items-center justify-content-between">
                      <span className="text-muted">Owned/Rented</span>
                      <span className="fw-600 text-end">
                        {quoteDate?.personalInfo?.isOwned === true
                          ? "Owned"
                          : "Rented"}
                      </span>
                    </li>
                    <li className="d-flex py-2 border-bottom align-items-center justify-content-between">
                      <span className="text-muted">Home type</span>
                      <span className="fw-600 text-end">
                        {quoteDate?.personalInfo?.homeType}
                      </span>
                    </li>
                    <li className="d-flex py-2 border-bottom align-items-center justify-content-between">
                      <span className="text-muted">Home location</span>
                      <span className="fw-600 text-end">
                        {quoteDate?.personalInfo?.homeLocation}
                      </span>
                    </li>
                    <li className="d-flex py-2 border-bottom align-items-center justify-content-between">
                      <span className="text-muted">Home Size(Sqm) </span>
                      <span className="fw-600 text-end">
                        {quoteDate?.personalInfo?.homeSize}
                      </span>
                    </li>
                    <li className="d-flex py-2 border-bottom align-items-center justify-content-between">
                      <span className="text-muted">Marital status</span>
                      <span className="fw-600 text-end">
                        {quoteDate?.personalInfo?.martialStatus}
                      </span>
                    </li>
                    <li className="d-flex py-2 border-bottom align-items-center justify-content-between">
                      <span className="text-muted">
                        Number of family members
                      </span>
                      <span className="fw-600 text-end">
                        {quoteDate?.personalInfo?.familyMembersCount}
                      </span>
                    </li>
                    <li className="d-flex py-2 border-bottom align-items-center justify-content-between">
                      <span className="text-muted">
                        Family member education fees
                      </span>
                      <span className="fw-600 text-end">
                        {quoteDate?.personalInfo?.familyMembersFees}{" "}
                        <span className="text-muted fw-normal"> SAR</span>
                      </span>
                    </li>
                    <li className="d-flex py-2 align-items-center justify-content-between">
                      <span className="text-muted">Working status</span>
                      <span className="fw-600 text-end">
                        {quoteDate?.personalInfo?.workingStatus === "true"
                          ? "Employed"
                          : "UnEmployed"}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-4 my-2">
                <div className="review-card">
                  <div className="review-heading d-flex justify-content-between align-items-center p-3">
                    <h6 className="mb-0">Monthly Income</h6>
                    {/* <img src={pen} alt="" onClick={handleMonthlyIncomeShow} /> */}
                  </div>
                  <ul className="fs-small mb-0 p-3">
                    <li className="d-flex py-2 border-bottom align-items-center justify-content-between">
                      <span className="text-muted">Basic Salary</span>
                      <span className="fw-600 text-end">
                        {quoteDate?.MonthlyIncome?.basicSalary}{" "}
                        <span className="text-muted fw-normal"> SAR</span>
                      </span>
                    </li>
                    <li className="d-flex py-2 border-bottom align-items-center justify-content-between">
                      <span className="text-muted">Housing Allowance</span>
                      <span className="fw-600 text-end">
                        {quoteDate?.MonthlyIncome?.housingAllowance}
                        <span className="text-muted fw-normal"> SAR</span>
                      </span>
                    </li>
                    <li className="d-flex py-2 align-items-center justify-content-between">
                      <span className="text-muted">Other Allowance</span>
                      <span className="fw-600 text-end">
                        {quoteDate?.MonthlyIncome?.otherAllowances}{" "}
                        <span className="text-muted fw-normal"> SAR</span>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-4 my-2">
                <div className="review-card">
                  <div className="review-heading d-flex justify-content-between align-items-center p-3">
                    <h6 className="mb-0">Expenses and obligations </h6>
                    {/* <img src={pen} alt="" onClick={handleExpenseShow} /> */}
                  </div>
                  <ul className="fs-small mb-0 p-3">
                    <li className="d-flex py-2 border-bottom align-items-center justify-content-between">
                      <span className="text-muted">
                        Current Monthly Expenses
                      </span>
                      <span className="fw-600 text-end">
                        {Number(quoteDate?.expensesAndObligations?.housing) +
                          Number(
                            quoteDate?.expensesAndObligations?.homeWorkerWage
                          ) +
                          Number(
                            quoteDate?.expensesAndObligations?.healthCare
                          ) +
                          Number(
                            quoteDate?.expensesAndObligations?.foodBeverage
                          ) +
                          Number(
                            quoteDate?.expensesAndObligations?.transportation
                          )}
                        <span className="text-muted fw-normal"> SAR</span>
                      </span>
                    </li>
                    <li className="d-flex py-2 border-bottom align-items-center justify-content-between">
                      <span className="text-muted">Housing</span>
                      <span className="fw-600 text-end">
                        {quoteDate?.expensesAndObligations?.housing}
                        <span className="text-muted fw-normal"> SAR</span>
                      </span>
                    </li>
                    <li className="d-flex py-2 border-bottom align-items-center justify-content-between">
                      <span className="text-muted">Homeworkers wage</span>
                      <span className="fw-600 text-end">
                        {quoteDate?.expensesAndObligations?.homeWorkerWage}
                        <span className="text-muted fw-normal"> SAR</span>
                      </span>
                    </li>
                    <li className="d-flex py-2 border-bottom align-items-center justify-content-between">
                      <span className="text-muted">
                        Food & beverage expenses
                      </span>
                      <span className="fw-600 text-end">
                        {quoteDate?.expensesAndObligations?.foodBeverage}{" "}
                        <span className="text-muted fw-normal"> SAR</span>
                      </span>
                    </li>
                    <li className="d-flex py-2 border-bottom align-items-center justify-content-between">
                      <span className="text-muted">
                        Health Care & Insurance
                      </span>
                      <span className="fw-600 text-end">
                        {quoteDate?.expensesAndObligations?.healthCare}{" "}
                        <span className="text-muted fw-normal"> SAR</span>
                      </span>
                    </li>
                    <li className="d-flex py-2 border-bottom align-items-center justify-content-between">
                      <span className="text-muted">
                        Transportation & Communication
                      </span>
                      <span className="fw-600 text-end">
                        {quoteDate?.expensesAndObligations?.transportation}{" "}
                        <span className="text-muted fw-normal"> SAR</span>
                      </span>
                    </li>
                    <li className="d-flex py-2 border-bottom align-items-center justify-content-between">
                      <span className="text-muted">
                        Any addition monthly expense{" "}
                      </span>
                      <span className="fw-600 text-end">No</span>
                    </li>
                    <li className="d-flex py-2 align-items-center justify-content-between">
                      <span className="text-muted">Any additional loans</span>
                      <span className="fw-600 text-end">Yes</span>
                    </li>
                  </ul>
                </div>
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
                  <div className="col-12 mt-4 d-flex justify-content-center step-btns-container">
                    <Link
                      to="/admin/financialRequestsData"
                      className="btn finance-form-cancel text-nowrap"
                      style={{
                        backgroundColor: "crimson",
                        color: "white",
                        width: "220px",
                      }}
                      onClick={emptyQuoteData}
                    >
                      View All Financial Requests
                    </Link>
                    {/* <button className="btn bg-darkBlue text-light"  style={{backgroundColor: '#130f40' , color : 'white' }} onClick={sendQuote} >Submit Request</button> */}
                  </div>
                  <div className="col-12 mt-4 d-flex justify-content-center step-btns-container">
                    <Link
                      to=""
                      className="btn border border-color-darkBlue text-darkBlue"
                      style={{ backgroundColor: "#0B0A31", color: "white" }}
                      onClick={() => setStep(3)}
                    >
                      Go Back
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {/* Modal */}
      <div
        class="modal fade reset-modal"
        id="requestModal"
        tabindex="-1"
        aria-labelledby="resetPasswordModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content p-3">
            <div class="modal-body">
              <div className="d-flex justify-content-center w-100">
                <img src={tick} alt="" />
              </div>
              <h4 className="text-dark text-center fw-600">
                Request Submitted!
              </h4>
              <p className="text-secondary text-center mb-4 fs-small">
                Thank you! Your Finance Request has been submitted successfully.{" "}
                <br />
                You’ll get confirmation notification soon.
              </p>
              <div className="w-100 d-flex justify-content-center">
                <button
                  className="btn bg-darkBlue rounded-3 text-light mb-2 px-5"
                  data-bs-dismiss="modal"
                >
                  That’s Great
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}

      {/* update personal info */}
      <Modal
        show={personalInfo}
        onHide={handlePersonalInfoClose}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Personal Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-lg-12 form-group mb-4">
            <label className="form-label text-muted fs-small">
              Owned/Rented
            </label>
            <select
              class="form-select text-muted"
              aria-label="Default select example"
              onChange={(e) =>
                setUpdateData({ ...updateData, isOwned: e.target.value })
              }
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div className="col-lg-12 form-group mb-4">
            <label className="form-label text-muted fs-small">Home Type</label>
            <select
              class="form-select text-muted"
              aria-label="Default select example"
              onChange={(e) =>
                setUpdateData({ ...updateData, homeType: e.target.value })
              }
            >
              <option selected>{updateData?.homeType}</option>
              <option>Apartment</option>
              <option>Villa</option>
              <option>Duplex</option>
              <option>Floor</option>
            </select>
          </div>
          <div className="col-lg-12 form-group mb-4">
            <label className="form-label text-muted fs-small">
              Home Location
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your home location here"
              value={updateData?.homeLocation}
              onChange={(e) =>
                setUpdateData({ ...updateData, homeLocation: e.target.value })
              }
              required
            />
          </div>
          <div className="col-lg-12 form-group mb-4">
            <label className="form-label text-muted fs-small">
              Home Size (sqr meter)
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your home size"
              value={updateData?.homeSize}
              onChange={(e) =>
                setUpdateData({ ...updateData, homeSize: e.target.value })
              }
              required
            />
          </div>
          <div className="col-lg-12 form-group mb-4">
            <label className="form-label text-muted fs-small">
              Marital status
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Select your marital status"
              value={updateData?.martialStatus}
              onChange={(e) =>
                setUpdateData({ ...updateData, martialStatus: e.target.value })
              }
              required
            />
          </div>
          <div className="col-lg-12 form-group mb-4">
            <label className="form-label text-muted fs-small">
              Number of family Members
            </label>
            <select
              class="form-select text-muted"
              aria-label="Default select example"
              onChange={(e) =>
                setUpdateData({
                  ...updateData,
                  familyMembersCount: e.target.value,
                })
              }
            >
              <option selected>{updateData?.familyMembersCount}</option>
              <option>3</option>
              <option>5</option>
              <option>10</option>
            </select>
          </div>
          <div className="col-lg-12 form-group mb-4">
            <label className="form-label text-muted fs-small">
              Family member education fees (SAR)
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your family member education fees"
              value={updateData?.familyMembersFees}
              onChange={(e) =>
                setUpdateData({
                  ...updateData,
                  familyMembersFees: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="col-lg-12 form-group mb-4">
            <label className="form-label text-muted fs-small">
              Working status
            </label>
            <select
              class="form-select text-muted"
              aria-label="Default select example"
              onChange={(e) =>
                setUpdateData({ ...updateData, workingStatus: e.target.value })
              }
            >
              <option selected>{updateData?.workingStatus}</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePersonalInfoClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* update personal info */}

      {/* update monthly income info */}
      <Modal
        show={monthlyIncome}
        onHide={handleMonthlyIncomeClose}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Monthly Income Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-12 form-group mb-4">
            <label className="form-label text-muted fs-small">
              Basic Salary
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Please your basic salary here (SAR)"
              value={updateData?.basicSalary}
              onChange={(e) =>
                setUpdateData({ ...updateData, basicSalary: e.target.value })
              }
            />
          </div>
          <div className="col-12 form-group mb-4">
            <label className="form-label text-muted fs-small">
              Housing Allowance
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Please your housing allowance here (SAR)"
              value={updateData?.housingAllowance}
              onChange={(e) =>
                setUpdateData({
                  ...updateData,
                  housingAllowance: e.target.value,
                })
              }
            />
          </div>
          <div className="col-12 form-group mb-4">
            <label className="form-label text-muted fs-small">
              Other Allowance(Optional)
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Please your other allowance here (SAR)"
              value={updateData?.otherAllowance}
              onChange={(e) =>
                setUpdateData({ ...updateData, otherAllowance: e.target.value })
              }
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleMonthlyIncomeClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* update monthly income info */}

      {/* update expenses info */}
      <Modal show={expense} onHide={handleExpenseClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Update Monthly Expenses Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-12">
            <div className="progress-container">
              <h6 className="text-light text-center mb-4">
                Current Monthly Expenses
              </h6>
              <div className="progress-bar-container">
                <div className="progress-bar"></div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="text-light fs-small">
                  {Number(quoteDate?.housingExpense) +
                    Number(quoteDate?.housingAllowance) +
                    Number(quoteDate?.otherAllowance) +
                    Number(quoteDate?.homeWorkerWageExpense) +
                    Number(quoteDate?.healthCareExpense) +
                    Number(quoteDate?.foodBeverageExpense) +
                    Number(quoteDate?.additionalMonthlyExpense) +
                    Number(quoteDate?.transportationExpense) +
                    Number(quoteDate?.additionalLoansExpense)}
                  .00
                  <span className="text-muted"> SAR/month</span>
                </div>
                <div className="text-light fs-small">
                  <span className="text-color-primary me-2">Total income</span>
                  {updateData?.basicSalary}.00
                  <span className="text-muted"> SAR/month</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-12 mt-4">
            <div className="expense-card">
              <h6 className="text-darkBlue fw-600 mb-4 text-center">Housing</h6>

              <input
                type="range"
                class="form-range"
                id="customRange1"
                value={updateData?.housingExpense}
                onChange={(e) =>
                  setQuoteData({
                    ...updateData,
                    housingExpense: e.target.value,
                  })
                }
                required
              />

              <div className="d-flex fw-600 justify-content-between">
                <div className="text-darkBlue fs-small">
                  {updateData?.housingExpense}.00{" "}
                  <span className="text-muted fw-normal"> SAR/month</span>
                </div>
                <div className="text-darkBlue fs-small">
                  0.00 <span className="text-muted fw-normal"> SAR/month</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-12 mt-4">
            <div className="expense-card">
              <h6 className="text-darkBlue fw-600 mb-4 text-center">
                Homeworkers wage
              </h6>

              <input
                type="range"
                class="form-range"
                id="customRange1"
                value={updateData?.homeWorkerWageExpense}
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    homeWorkerWageExpense: e.target.value,
                  })
                }
                required
              />

              <div className="d-flex fw-600 justify-content-between">
                <div className="text-darkBlue fs-small">
                  {updateData?.homeWorkerWageExpense}.00{" "}
                  <span className="text-muted fw-normal"> SAR/month</span>
                </div>
                <div className="text-darkBlue fs-small">
                  0.00<span className="text-muted fw-normal"> SAR/month</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-12 mt-4">
            <div className="expense-card">
              <h6 className="text-darkBlue fw-600 mb-4 text-center">
                Food & beverage expenses
              </h6>

              <input
                type="range"
                class="form-range"
                id="customRange1"
                value={updateData?.foodBeverageExpense}
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    foodBeverageExpense: e.target.value,
                  })
                }
                required
              />

              <div className="d-flex fw-600 justify-content-between">
                <div className="text-darkBlue fs-small">
                  {updateData?.foodBeverageExpense}.00{" "}
                  <span className="text-muted fw-normal"> SAR/month</span>
                </div>
                <div className="text-darkBlue fs-small">
                  0.00 <span className="text-muted fw-normal"> SAR/month</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-12 mt-4">
            <div className="expense-card">
              <h6 className="text-darkBlue fw-600 mb-4 text-center">
                Health Care & Insurance
              </h6>

              <input
                type="range"
                class="form-range"
                id="customRange1"
                value={updateData?.healthCareExpense}
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    healthCareExpense: e.target.value,
                  })
                }
                required
              />

              <div className="d-flex fw-600 justify-content-between">
                <div className="text-darkBlue fs-small">
                  {updateData?.healthCareExpense}.00{" "}
                  <span className="text-muted fw-normal"> SAR/month</span>
                </div>
                <div className="text-darkBlue fs-small">
                  8,000 <span className="text-muted fw-normal"> SAR/month</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-12 mt-4">
            <div className="expense-card">
              <h6 className="text-darkBlue fw-600 mb-4 text-center">
                Transportation & Communication
              </h6>

              <input
                type="range"
                class="form-range"
                id="customRange1"
                value={updateData?.transportationExpense}
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    transportationExpense: e.target.value,
                  })
                }
                required
              />

              <div className="d-flex fw-600 justify-content-between">
                <div className="text-darkBlue fs-small">
                  {updateData?.transportationExpense}.00{" "}
                  <span className="text-muted fw-normal"> SAR/month</span>
                </div>
                <div className="text-darkBlue fs-small">
                  0.00 <span className="text-muted fw-normal"> SAR/month</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-12 mt-4">
            <div className="expense-card mb-4 p-3 d-flex align-items-center justify-content-between">
              <p className="mb-0 text-darkBlue fs-small">
                Any addition monthly expense
              </p>
              <input type="checkbox" className="form-check-input" />
            </div>
            <div className="expense-card py-3 px-3 d-flex align-items-center justify-content-between">
              <p className="mb-0 text-darkBlue fs-small">
                Any additional loans
              </p>
              <input type="checkbox" className="form-check-input" />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleExpenseClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* update expenses info */}
    </div>
  );
};

export default RequestFinance;
