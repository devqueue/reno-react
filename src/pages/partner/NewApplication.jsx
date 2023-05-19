import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import user from "../../assets/images/user.jpg";
import { Button } from "react-bootstrap";
import pen from "../../assets/icons/pen.png";
import appStep1 from "../../assets/icons/appStep1.png";
import appStep2 from "../../assets/icons/appStep2.png";
import appStep3 from "../../assets/icons/appStep3.png";
import appStep4 from "../../assets/icons/appStep4.png";
import tick from "../../assets/images/tick.png";
import {
  sendNewQuoteRequest,
  checkCustomerExistsOrNot,
} from "../../api/MerchentApi";
import { ThreeDots } from "react-loader-spinner";
import moment from "moment";
import Modal from "react-bootstrap/Modal";
import MerchantDropdown from "../../components/partner/MerchantDropdown";
import NotificationMerchant from "../../components/partner/NotificationMerchant";

const NewApllication = () => {
  document.title = "Reno | Partner Portal";
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [ifCustomerExists, setIfCustomerExists] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const [transCount, setTransCount] = useState(1);
  const [choice, setChoice] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [quoteDate, setQuoteData] = useState({
    totalPurchaseAmount: 0,
    depositAmount: 0,
    balanceOwning: 0,
    isCustomerUsingRenoFirstTime: true,
    amountPerMonth: 0,
    totalMonths: transCount,
    IDCardNo: "",
    phoneNo: "",
    email: "",
    productCategory: "",
  });

  // checking if partner is signed in or not
  useEffect(() => {
    const merchantToken = JSON.parse(
      localStorage.getItem("reno-merchant-token")
    );
    const isSessionFound = sessionStorage.getItem("reno-merchant-token");
    if (!merchantToken && !isSessionFound) {
      navigate("/partner/auth/login");
    }
  }, []);

  // sleeping

  // calculating value
  useEffect(() => {
    if (quoteDate.totalPurchaseAmount !== 0) {
      let totalMonths =
        (quoteDate.totalPurchaseAmount - quoteDate.depositAmount) / transCount;
      let AmtPerMnt =
        (quoteDate.totalPurchaseAmount - quoteDate.depositAmount) / transCount;
      let n = AmtPerMnt.toFixed(2);
      let newMonths = Math.ceil(totalMonths);
      setQuoteData({
        ...quoteDate,
        balanceOwning: quoteDate.totalPurchaseAmount - quoteDate.depositAmount,
        amountPerMonth: n,
        totalMonths: transCount,
      });
      setUpdateData({
        ...quoteDate,
        balanceOwning: quoteDate.totalPurchaseAmount - quoteDate.depositAmount,
        amountPerMonth: n,
        totalMonths: transCount,
      });
    }
  }, [quoteDate.totalPurchaseAmount, quoteDate.depositAmount, transCount]);

  // checking all fields of step 01
  const checkStep01 = () => {
    if (
      quoteDate?.totalPurchaseAmount === 0 ||
      quoteDate?.balanceOwning === 0
    ) {
      toast.error("Please Provide All Fields");
    } else {
      setStep(2);
    }
  };

  // checking all fields of step 03
  const checkStep03 = () => {
    if (
      quoteDate?.IDCardNo === "" ||
      quoteDate?.email === "" ||
      quoteDate?.productCategory === ""
    ) {
      toast.error("Please Provide All Fields");
    } else {
      setStep(4);
    }
  };

  // sending data
  const sendQuote = async () => {
    setIsFetching(true);
    const { data } = await sendNewQuoteRequest(quoteDate);
    if (data?.success == true) {
      toast.success("Application Sent SuccessFully");
      emptyQuoteData();
      await delay(1500);
      setIsFetching(false);
      navigate("/partner/dashboard/applications");
    } else {
      await delay(1500);
      setIsFetching(false);
      toast.error(data?.message);
    }
  };

  // empty quote data
  const emptyQuoteData = () => {
    setQuoteData({
      totalPurchaseAmount: 0,
      depositAmount: 0,
      balanceOwning: 0,
      isCustomerUsingRenoFirstTime: true,
      amountPerMonth: 0,
      totalMonths: 0,
      IDCardNo: "",
      phoneNo: "",
      email: "",
      productCategory: "",
    });
  };

  // sleeping
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const [financial, setFinancial] = useState(false);
  const handleFinancialClose = () => {
    setFinancial(false);
  };
  const handleFinancialShow = () => {
    setUpdateData(quoteDate);
    setFinancial(true);
  };

  const [customer, setCustomer] = useState(false);
  const handleCustomerClose = () => {
    setCustomer(false);
  };
  const handleCustomerShow = () => {
    setUpdateData(quoteDate);
    setCustomer(true);
  };

  // updating data
  const saveChanges = () => {
    setQuoteData(updateData);
    handleFinancialClose();
    handleCustomerClose();
  };

  // find if customer exists on Reno or not
  const checkCustomer = async (value) => {
    const { data } = await checkCustomerExistsOrNot(value);
    if (data?.success === true) {
      setIfCustomerExists(true);
      setQuoteData({
        ...quoteDate,
        email: data?.Details?.Email,
        phoneNo: data?.Details?.PhoneNo,
      });
      setIsDisabled(true);
    } else {
      setIfCustomerExists(false);
      setQuoteData({ ...quoteDate, email: "", phoneNo: "" });
      setIsDisabled(false);
    }
  };

  return (
    <div className="container-fluid p-4 dashboard-content">
      <div className="panel-top d-flex align-items-center justify-content-between">
        <div className="panel-left">
          <h5 className="mb-0 fw-600">New Application</h5>
          <p className="text-muted mb-0 text-dark fs-small">
            {moment().format("MMMM Do YYYY")}
          </p>
        </div>

        <div className="d-flex align-items-center panel-right">
          <NotificationMerchant />

          <MerchantDropdown />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <div className="finance-steps">
            <div
              className={`finance-step ${
                step === 1 ? "active" : step > 1 ? "done" : ""
              }`}
            >
              <div className="step-img">
                <img src={appStep1} alt="" />
              </div>
              <p className="mb-0 text-muted fs-small">Finance Details</p>
            </div>
            <div
              className={`finance-step ${
                step === 2 ? "active" : step > 2 ? "done" : ""
              }`}
            >
              <div className="step-img">
                <img src={appStep2} alt="" />
              </div>
              <p className="mb-0 text-muted fs-small">Repayment Amount </p>
            </div>
            <div
              className={`finance-step ${
                step === 3 ? "active" : step > 3 ? "done" : ""
              }`}
            >
              <div className="step-img">
                <img src={appStep3} alt="" />
              </div>
              <p className="mb-0 text-muted fs-small">
                Customer & Product Details
              </p>
            </div>
            <div
              className={`finance-step ${
                step === 4 ? "active" : step > 4 ? "done" : ""
              }`}
            >
              <div className="step-img">
                <img src={appStep4} alt="" />
              </div>
              <p className="mb-0 text-muted fs-small">Review</p>
            </div>
          </div>
        </div>
      </div>

      {step === 1 ? (
        <div className="row mt-5">
          <div className="col-lg-6 m-auto">
            <h5 className="text-center fw-600">Finance Details</h5>
            <h6 className="text-center text-muted fw-normal">
              Please fill in the details below and continue.
            </h6>

            <div className="row finance-form mt-4">
              <div className="col-12 form-group mb-4">
                <label className="form-label text-muted fs-small">
                  Purchase Total
                </label>
                <div className="sar-container">
                  <input
                    type="number"
                    className="form-control"
                    value={quoteDate?.totalPurchaseAmount}
                    onChange={(e) =>
                      setQuoteData({
                        ...quoteDate,
                        totalPurchaseAmount: e.target.value,
                      })
                    }
                    autofocus={true}
                    required
                  />
                  <h5 className="fs-small text-darkBlue">SAR</h5>
                </div>
              </div>
              <div className="col-12 form-group mb-4">
                <label className="form-label text-muted fs-small">
                  Deposit Amount
                </label>
                <div className="sar-container">
                  <input
                    type="number"
                    className="form-control"
                    value={quoteDate?.depositAmount}
                    onChange={(e) =>
                      setQuoteData({
                        ...quoteDate,
                        depositAmount: e.target.value,
                      })
                    }
                    required
                  />
                  <h5 className="fs-small text-darkBlue">SAR</h5>
                </div>
              </div>
              <div className="col-12 form-group mb-4">
                <label className="form-label text-muted fs-small">
                  Balance owning
                </label>
                <div className="sar-container">
                  <input
                    type="number"
                    className="form-control"
                    value={quoteDate?.balanceOwning}
                    disabled
                  />
                  <h5 className="fs-small text-darkBlue">SAR</h5>
                </div>
              </div>
              <div className="col-12 form-group mb-4">
                <label className="form-label text-muted fs-small">
                  Select Tenure (Months)
                </label>
                <select
                  class="form-select me-3 text-muted"
                  style={{ width: "100%" }}
                  aria-label="Default select example"
                  onChange={(e) => setTransCount(e.target.value)}
                >
                  <option selected disabled>
                    1
                  </option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                </select>
                {/* <input type="number" className='form-control' value={transCount} onChange={(e) =>setTransCount(e.target.value)}  /> */}
              </div>
              <div className="col-12 mb-4">
                <label className="form-label text-muted fs-small">
                  Is Customer using reno for the first time
                </label>
                <div className="yes-no-container">
                  <button
                    className={`btn ${choice ? "active" : ""}`}
                    onClick={() => {
                      setChoice(true);
                      setQuoteData({
                        ...quoteDate,
                        isCustomerUsingRenoFirstTime: true,
                      });
                    }}
                  >
                    Yes
                  </button>
                  <button
                    className={`btn ${!choice ? "active" : ""}`}
                    onClick={() => {
                      setChoice(false);
                      setQuoteData({
                        ...quoteDate,
                        isCustomerUsingRenoFirstTime: false,
                      });
                    }}
                  >
                    No
                  </button>
                </div>
              </div>

              <div className="col-12 mt-4 d-flex justify-content-center step-btns-container">
                <Link
                  to="/partner/dashboard/panel"
                  className="btn finance-form-cancel me-3"
                  style={{ flex: "1" }}
                  onClick={emptyQuoteData}
                >
                  Cancel
                </Link>
                <Button
                  className="btn bg-[#273c75] text-light"
                  style={{ flex: "1" }}
                  onClick={() => {
                    checkStep01();
                  }}
                >
                  Save and Continue
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {step === 2 ? (
        <div className="row mt-5">
          <div className="col-lg-6 m-auto">
            <h5 className="text-center fw-600">Repayment Amount</h5>
            <h6 className="text-center text-muted fw-normal">
              Please select repayment amount and continue.
            </h6>

            <div className="row finance-form mt-4">
              <div className="col-12">
                <div className="amount-card d-flex align-items-center justify-content-between">
                  <div>
                    <h6 className="text-darkBlue fw-600">
                      {quoteDate?.amountPerMonth} SAR
                    </h6>
                    <span className="text-muted fs-small">per month</span>
                  </div>

                  <h6 className="text-darkBlue mb-0 fw-600">For</h6>

                  <div className="text-end">
                    <h6 className="text-darkBlue fw-600">{transCount}</h6>
                    <span className="text-muted fs-small">Months</span>
                  </div>
                </div>
              </div>

              <div className="col-12 mt-4 d-flex justify-content-center step-btns-container">
                <Button
                  className="btn border border-color-darkBlue bg-[#273c75] text-white"
                  style={{ flex: "1" }}
                  onClick={() => setStep(1)}
                >
                  Go Back
                </Button>
                <Link
                  to="/partner/dashboard/panel"
                  className="btn finance-form-cancel "
                  style={{ flex: "1" }}
                  onClick={emptyQuoteData}
                >
                  Cancel
                </Link>
              </div>

              <div className="col-12 mt-4 d-flex justify-content-center">
                <Button
                  className="btn bg-[#273c75] text-dark"
                  style={{ flex: "1" }}
                  onClick={() => setStep(3)}
                >
                  Save and Continue
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {step === 3 ? (
        <div className="row mt-5">
          <div className="col-lg-6 m-auto">
            <h5 className="text-center fw-600">Customer & Product Details </h5>
            <h6 className="text-center text-muted fw-normal">
              Please fill in the details below and continue.
            </h6>

            <div className="row finance-form mt-4">
              <div className="row">
                <div className="col-12 form-group mb-4 col-lg-10">
                  <label className="form-label text-muted fs-small">
                    Customer ID Card/Iqama Number{" "}
                  </label>
                  <br />
                  {ifCustomerExists == false && (
                    <span style={{ fontSize: "12px", color: "crimson" }}>
                      if customer is not found on reno, customer then will
                      receive email for this quote
                    </span>
                  )}
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your ID Card/Iqama Number"
                    value={quoteDate?.IDCardNo}
                    onChange={(e) =>
                      setQuoteData({ ...quoteDate, IDCardNo: e.target.value })
                    }
                    onBlur={(e) => checkCustomer(e.target.value)}
                    autofocus={true}
                    required
                  />
                  {ifCustomerExists == true ? (
                    <span style={{ fontSize: "12px", color: "#00b894" }}>
                      Customer Found On Reno
                    </span>
                  ) : (
                    <span style={{ fontSize: "12px", color: "crimson" }}>
                      Customer Not Found On Reno
                    </span>
                  )}
                </div>
                {ifCustomerExists == true ? (
                  <div className="col-12 form-group mb-4 col-lg-2 mt-2">
                    <label className="form-label text-muted fs-small"></label>

                    <button
                      type="button"
                      className="btn btn-primary btn-sm w-100"
                      onClick={(e) => checkCustomer()}
                    >
                      Find
                    </button>
                  </div>
                ) : (
                  <div className="col-12 form-group mb-4 col-lg-2 mt-4 pt-2">
                    <label className="form-label text-muted fs-small"></label>

                    <button
                      type="button"
                      className="btn btn-primary btn-sm w-100"
                      onClick={(e) => checkCustomer()}
                    >
                      Find
                    </button>
                  </div>
                )}
              </div>

              <div className="col-12 form-group mb-4">
                <label className="form-label text-muted fs-small">
                  Phone Number
                </label>
                <div className="d-flex">
                  <select
                    class="form-select me-3 text-muted"
                    style={{ width: "fit-content" }}
                    aria-label="Default select example"
                  >
                    <option selected>+966</option>
                    <option>+966</option>
                    <option>+966</option>
                    <option>+966</option>
                  </select>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter your customer’s phone number"
                    value={quoteDate?.phoneNo}
                    onChange={(e) =>
                      setQuoteData({ ...quoteDate, phoneNo: e.target.value })
                    }
                    required
                    disabled={isDisabled}
                  />
                </div>
              </div>
              <div className="col-12 form-group mb-4">
                <label className="form-label text-muted fs-small">Email</label>
                <br />
                <span style={{ fontSize: "12px", color: "crimson" }}>
                  {ifCustomerExists == false &&
                    "Please provide a valid email, in case customer is not on reno"}
                </span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your customer’s email address"
                  value={quoteDate?.email}
                  onChange={(e) =>
                    setQuoteData({ ...quoteDate, email: e.target.value })
                  }
                  required
                  disabled={isDisabled}
                />
              </div>
              <div className="col-12 form-group mb-4">
                <label className="form-label text-muted fs-small">
                  Product Category
                </label>
                <select
                  class="form-select text-muted"
                  aria-label="Default select example"
                  onChange={(e) =>
                    setQuoteData({
                      ...quoteDate,
                      productCategory: e.target.value,
                    })
                  }
                >
                  <option selected></option>
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

              <div className="col-12 mt-4 d-flex justify-content-center step-btns-container">
                <Link
                  to="/partner/dashboard/panel"
                  className="btn finance-form-cancel me-3"
                  style={{ flex: "1" }}
                  onClick={emptyQuoteData}
                >
                  Cancel
                </Link>
                <Button
                  className="btn bg-[#273c75] text-dark"
                  style={{ flex: "1" }}
                  onClick={() => checkStep03()}
                >
                  Save and Continue
                </Button>
              </div>

              <div className="col-12 mt-4 d-flex justify-content-center">
                <Button
                  className="btn border border-color-darkBlue bg-[#273c75] text-darkBlue"
                  style={{ flex: "1" }}
                  onClick={() => setStep(2)}
                >
                  Go Back
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {step === 4 ? (
        <div className="row mt-5">
          <div className="col-12 m-auto">
            <h5 className="text-center fw-600">Review</h5>
            <h6 className="text-center text-muted fw-normal">
              Please review information and submit the new application.
            </h6>

            <div className="row finance-form mt-4">
              <div className="col-lg-4 my-2">
                <div className="review-card">
                  <div className="review-heading d-flex justify-content-between align-items-center p-3">
                    <h6 className="mb-0">Finance Details</h6>
                    <img src={pen} alt="" onClick={handleFinancialShow} />
                  </div>
                  <ul className="fs-small mb-0 p-3">
                    <li className="d-flex py-2 border-bottom align-items-center justify-content-between">
                      <span className="text-muted">Purchase Total</span>
                      <span className="fw-600 text-end">
                        {quoteDate?.totalPurchaseAmount}{" "}
                        <span className="text-muted fw-normal"> SAR</span>
                      </span>
                    </li>
                    <li className="d-flex py-2 border-bottom align-items-center justify-content-between">
                      <span className="text-muted">Deposit Amount</span>
                      <span className="fw-600 text-end">
                        {quoteDate?.depositAmount}{" "}
                        <span className="text-muted fw-normal"> SAR</span>
                      </span>
                    </li>
                    <li className="d-flex py-2 border-bottom align-items-center justify-content-between">
                      <span className="text-muted">Balance Owning</span>
                      <span className="fw-600 text-end">
                        {quoteDate?.balanceOwning}{" "}
                        <span className="text-muted fw-normal"> SAR</span>
                      </span>
                    </li>
                    <li className="d-flex py-2 align-items-center justify-content-between">
                      <span className="text-muted">
                        Is Customer using reno for the first time
                      </span>
                      {quoteDate?.isCustomerUsingRenoFirstTime === true ? (
                        <span className="fw-600 text-end">Yes</span>
                      ) : (
                        <span className="fw-600 text-end">No</span>
                      )}
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-4 my-2">
                <div className="review-card">
                  <div className="review-heading d-flex justify-content-between align-items-center p-3">
                    <h6 className="mb-0">Repayment Amount</h6>
                    {/* <img src={pen} alt="" /> */}
                  </div>
                  <ul className="fs-small mb-0 p-3">
                    <li className="d-flex py-2 align-items-center justify-content-between">
                      <h5 className="text-dark fw-600">
                        {quoteDate?.amountPerMonth} SAR <br />{" "}
                        <span className="fs-small text-muted fw-normal">
                          per month
                        </span>
                      </h5>
                      <h5 className="fw-600 text-end">
                        {transCount} <br />{" "}
                        <span className="text-muted fs-small fw-normal">
                          {" "}
                          Months
                        </span>
                      </h5>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-4 my-2">
                <div className="review-card">
                  <div className="review-heading d-flex justify-content-between align-items-center p-3">
                    <h6 className="mb-0">Customer & Product Details </h6>
                    <img src={pen} alt="" onClick={handleCustomerShow} />
                  </div>
                  <ul className="fs-small mb-0 p-3">
                    <li className="d-flex py-2 border-bottom align-items-center justify-content-between">
                      <span className="text-muted">Customer ID Number</span>
                      <span className="fw-600 text-end">
                        {quoteDate?.IDCardNo}
                      </span>
                    </li>
                    <li className="d-flex py-2 border-bottom align-items-center justify-content-between">
                      <span className="text-muted">Phone</span>
                      <span className="fw-600 text-end">
                        {quoteDate?.phoneNo}
                      </span>
                    </li>
                    <li className="d-flex py-2 border-bottom align-items-center justify-content-between">
                      <span className="text-muted">Email</span>
                      <span className="fw-600 text-end">
                        {quoteDate?.email}
                      </span>
                    </li>
                    <li className="d-flex py-2 align-items-center justify-content-between">
                      <span className="text-muted">Product Category</span>
                      <span className="fw-600 text-end">
                        {quoteDate?.productCategory}
                      </span>
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
                      to="/partner/dashboard/panel"
                      className="btn finance-form-cancel me-3"
                      onClick={emptyQuoteData}
                    >
                      Cancel
                    </Link>
                    <Button
                      className="btn bg-[#273c75] text-dark"
                      onClick={sendQuote}
                    >
                      Send Quote
                    </Button>
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
              <h4 className="text-dark text-center fw-600">Quote Sent!</h4>
              <p className="text-secondary text-center mb-4 fs-small">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis
                egestas tristique lectus in. Dignissim eget et rhoncus faucibus.
              </p>
              <div className="w-100 d-flex justify-content-center">
                <button
                  className="btn bg-darkBlue rounded-3 text-dark mb-2 px-5"
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
      <Modal show={financial} onHide={handleFinancialClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Update Finance Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-12 form-group mb-4">
            <label className="form-label text-muted fs-small">
              Purchase Total
            </label>
            <div className="sar-container">
              <input
                type="number"
                className="form-control"
                value={updateData?.totalPurchaseAmount}
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    totalPurchaseAmount: e.target.value,
                  })
                }
                required
              />
              <h5 className="fs-small text-darkBlue">SAR</h5>
            </div>
          </div>
          <div className="col-12 form-group mb-4">
            <label className="form-label text-muted fs-small">
              Deposit Amount
            </label>
            <div className="sar-container">
              <input
                type="number"
                className="form-control"
                value={updateData?.depositAmount}
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    depositAmount: e.target.value,
                  })
                }
                required
              />
              <h5 className="fs-small text-darkBlue">SAR</h5>
            </div>
          </div>
          <div className="col-12 form-group mb-4">
            <label className="form-label text-muted fs-small">
              Balance owning
            </label>
            <div className="sar-container">
              <input
                type="number"
                className="form-control"
                value={updateData?.balanceOwning}
                disabled
              />
              <h5 className="fs-small text-darkBlue">SAR</h5>
            </div>
          </div>
          <div className="col-12 form-group mb-4">
            <label className="form-label text-muted fs-small">
              Select No of Transactions
            </label>
            <select
              class="form-select me-3 text-muted"
              style={{ width: "100%" }}
              aria-label="Default select example"
              onChange={(e) => setTransCount(e.target.value)}
            >
              <option selected disabled>
                {transCount}{" "}
              </option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
            </select>
            {/* <input type="number" className='form-control' value={transCount} onChange={(e) =>setTransCount(e.target.value)}  /> */}
          </div>
          <div className="col-12 mb-4">
            <label className="form-label text-muted fs-small">
              Is Customer using reno for the first time
            </label>
            <div className="yes-no-container">
              <button
                className={`btn ${choice ? "active" : ""}`}
                onClick={() => {
                  setChoice(true);
                  setUpdateData({
                    ...updateData,
                    isCustomerUsingRenoFirstTime: true,
                  });
                }}
              >
                Yes
              </button>
              <button
                className={`btn ${!choice ? "active" : ""}`}
                onClick={() => {
                  setChoice(false);
                  setUpdateData({
                    ...updateData,
                    isCustomerUsingRenoFirstTime: false,
                  });
                }}
              >
                No
              </button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleFinancialClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* update personal info */}

      {/* update customer info */}
      <Modal show={customer} onHide={handleCustomerClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Update Customer Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-12 form-group mb-4">
            <label className="form-label text-muted fs-small">
              Customer ID Card/Iqama Number
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your ID Card/Iqama Number"
              value={updateData?.IDCardNo}
              onChange={(e) =>
                setUpdateData({ ...updateData, IDCardNo: e.target.value })
              }
              required
            />
          </div>
          <div className="col-12 form-group mb-4">
            <label className="form-label text-muted fs-small">
              Phone Number
            </label>
            <div className="d-flex">
              <select
                class="form-select me-3 text-muted"
                style={{ width: "fit-content" }}
                aria-label="Default select example"
              >
                <option selected>+966</option>
                <option>+966</option>
                <option>+966</option>
                <option>+966</option>
              </select>
              <input
                type="number"
                className="form-control"
                placeholder="Enter your customer’s phone number"
                value={updateData?.phoneNo}
                onChange={(e) =>
                  setUpdateData({ ...updateData, phoneNo: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="col-12 form-group mb-4">
            <label className="form-label text-muted fs-small">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your customer’s email address"
              value={updateData?.email}
              onChange={(e) =>
                setUpdateData({ ...updateData, email: e.target.value })
              }
              required
            />
          </div>
          <div className="col-12 form-group mb-4">
            <label className="form-label text-muted fs-small">
              Product Category
            </label>
            <select
              class="form-select text-muted"
              aria-label="Default select example"
              onChange={(e) =>
                setUpdateData({
                  ...updateData,
                  productCategory: e.target.value,
                })
              }
            >
              <option selected>{updateData?.productCategory}</option>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCustomerClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* update personal info */}
    </div>
  );
};

export default NewApllication;
