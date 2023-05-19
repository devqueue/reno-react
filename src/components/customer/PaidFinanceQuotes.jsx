import React, { useState, useEffect } from "react";
import { AiFillBell } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { Link, useNavigate, useLocation } from "react-router-dom";
import user from "../../assets/images/user.jpg";
import deny from "../../assets/images/deny.png";
import financeNull from "../../assets/images/financeNull.png";
import quotesSearch from "../../assets/icons/quotesSearch.png";
import line from "../../assets/icons/line.png";
import success from "../../assets/icons/success.png";
import danger from "../../assets/icons/danger.png";
import confirmation from "../../assets/images/confirmation.png";
import paid from "../../assets/images/paid.png";
import { ThreeDots } from "react-loader-spinner";
import {
  getRecentQuotesDeliveredToACustomer,
  deliveryConfirmationOfAQuote,
  makeNewPayment,
} from "../../api/CustomerApi";
import { Button } from "react-bootstrap";
import moment from "moment";
import {
  getAllNotificationsOfCustomer,
  markNotificationsOfMerchantRead,
  getAllPaymentsHistory,
} from "../../api/CustomerApi";
import NotificationCustomer from "./NotificationCustomer";
import CustomerDropdown from "./CustomerDropdown";

const PaidFinanceQuotes = () => {
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);
  const [allData, setAllData] = useState([]);
  const [itemId, setItemId] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [cardDetails, setCardDetails] = useState({
    cardNo: "",
    name: "",
    expiryDate: "",
    cvv: "",
  });

  //=======Credit Card No Added by Alex
  let [validCardNo, setValidCardNo] = useState(false);
  const [cardNumber, setCardNumber] = useState("");

  const handleChange = (event) => {
    let { value } = event.target;

    // remove any non-digit characters
    value = value.replace(/\D/g, "");

    // only allow 16 digits
    if (value.length > 16) {
      value = value.slice(0, 16);
    }

    // add dashes after every 4 digits
    value = value.replace(/(\d{4})/g, "$1-");

    // remove trailing dash
    value = value.replace(/-$/, "");

    // set state
    setCardNumber(value);

    // check if number is valid using Luhn's algorithm
    const luhnCheck = (ccNum) => {
      let checkSum = 0;
      let isEven = false;

      for (let i = ccNum.length - 1; i >= 0; i--) {
        let digit = parseInt(ccNum.charAt(i));

        if (isEven) {
          digit *= 2;
          if (digit > 9) {
            digit -= 9;
          }
        }

        checkSum += digit;
        isEven = !isEven;
      }
      return checkSum % 10 === 0;
    };

    if (luhnCheck(value)) {
      setValidCardNo(true);
    } else {
      setValidCardNo(false);
    }
  };

  //========Expiry Card Checks =================================
  const [expiryDate, setExpiryDate] = useState("");
  const [expiryCardMessage, setExpiryCardMessage] = useState("");
  const [isExpired, setIsExpired] = useState(false);

  const handleExpiryDateChange = (event) => {
    let input = event.target.value;

    // Remove any non-numeric characters
    input = input.replace(/[^\d]/g, "");
    const expiryMonth = parseInt(input.substring(0, 2));
    const expiryYear = parseInt(input.substring(3));
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    if (
      expiryYear < currentYear ||
      (expiryYear === currentYear && expiryMonth < currentMonth)
    ) {
      setIsExpired(true);
    } else {
      setIsExpired(false);
    }

    // Format the expiry date with a slash after 2 digits
    if (input.length > 2) {
      input = input.slice(0, 2) + "/" + input.slice(2);
    }

    setExpiryDate(input);
  };

  const validateExpiryDate = () => {
    const [expiryMonth, expiryYear] = expiryDate.split("/");

    // Check if the expiry date is valid and more than the current date
    const now = new Date();
    const expiry = new Date(`20${expiryYear}`, expiryMonth - 1, 1);
    if (expiry <= now || isNaN(expiry)) {
      setExpiryCardMessage("Invalid expiry date");
    }

    return "";
  };

  //==========CVV==========
  const [cvv, setCvv] = useState("");

  const handleCvvChange = (e) => {
    const value = e.target.value;
    const regex = /^\d{0,3}$/; // accepts 0-3 digits
    if (regex.test(value)) {
      setCvv(value);
    }
  };

  //getting all data
  useEffect(() => {
    const getAllRecord = async () => {
      setIsFetching(true);
      const { data } = await getRecentQuotesDeliveredToACustomer();
      // console.log("all received : ", data);
      if (data?.success === true) {
        setAllData(data?.AllQuotes);
      }
      setIsFetching(false);
    };
    getAllRecord();
  }, []);

  // confirming any quote delivery
  const confirmDelivery = async () => {
    setIsFetching(true);
    const { data } = await deliveryConfirmationOfAQuote(itemId);
    if (data?.success === true) {
      toast.success("Order Delivery Confirmed by You SuccessFully.");
      await delay(1500);
      setIsFetching(false);
    } else {
      await delay(1500);
      setIsFetching(false);
      toast.error(data?.message);
    }
  };

  // sleeping
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const [allPaid, setAllPaid] = useState([]);
  const [allUnPaid, setAllUnPaid] = useState([]);

  // making payment
  const makeMyPayment = async () => {
    // if(isAgreed == false){
    //     toast.warning("You must agree with terms and conditions.")
    //     return;
    // }
    if (
      cardDetails?.name == "" ||
      cardNumber == "" ||
      cvv == "" ||
      expiryDate == ""
    ) {
      toast.warning("Please Fill All required Fields.");
      return;
    }

    if (cardNumber.length < 19) {
      toast.error("Card Number should be 16 digits.");
      return;
    }

    if (expiryDate.length < 7) {
      toast.error("Date Should be in MM/YYYY format.");
      return;
    }
    if (cvv.length < 3) {
      toast.error("Cvv Number should be 3 digits.");
      return;
    }
    const { data } = await makeNewPayment(selectedId);
    if (data?.success == true) {
      toast.success(data?.message);
      setCardDetails({
        cardNo: "",
        name: "",
        expiryDate: "",
        cvv: "",
      });
      setCvv("");
      setCardNumber("");
      setExpiryDate("");
      setSelectedId("");
      await delay(2000);
      window.location.reload();
    } else {
      toast.error(data?.message);
    }
  };

  useEffect(() => {}, [allPaid]);

  // getting payments details
  const getAllPayments = async (id) => {
    const { data } = await getAllPaymentsHistory(id);
    if (data?.success === true) {
      let newNo = data?.TotalMonths - data?.History?.length;
      let newArr = [];

      for (let i = 0; i !== newNo; i++) {
        let month = moment(data?.History[data?.History.length - 1].date)
          .add(i + 1, "months")
          .calendar();
        let myDate = moment(month).format("MMM YY");
        newArr.push({
          index: i + 1,
          date: myDate,
          amount: data?.Amount,
        });

        setAllUnPaid(newArr);
      }

      setAllPaid(data?.History);
    } else {
      toast.error(data?.message);
    }
  };

  return (
    <>
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
      ) : (
        <>
          <div
            className="container-fluid p-4 dashboard-content"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div className="panel-top d-flex align-items-center justify-content-between">
              <div className="panel-left">
                <h5 className="mb-0 fw-600">Paid Finance Quotes</h5>
                {/* <p className='text-muted mb-0 text-light fs-small'>
                                        {moment().format('MMMM Do YYYY')}
                                    </p> */}
              </div>

              <div className="d-flex align-items-center panel-right">
                <NotificationCustomer />
                <CustomerDropdown />
              </div>
            </div>

            {/* Paid Finance Quotes */}
            <div className="row mt-4">
              {allData.length > 0 ? (
                allData?.map((item) => (
                  <div className="col-12 mt-3" key={item?._id}>
                    <div className="d-flex justify-content-between fs-small quote-card">
                      <ul>
                        <li className="mb-3">
                          <span className="text-muted">Company</span>
                          {item?.Partner}
                        </li>
                        <li className="mb-3">
                          <span className="text-muted">Phone</span>
                          {item?.PhoneNo}
                        </li>
                        <li>
                          <span className="text-muted">Reference#</span>
                          78445557
                        </li>
                      </ul>

                      <img src={line} alt="" />

                      <ul>
                        <li className="mb-3">
                          <span className="text-muted">Product Category</span>
                          {item?.ProductCategory?.productCategory}
                        </li>
                        <li className="mb-3">
                          <span className="text-muted">Financed Amount</span>
                          {item?.FirstInstallment?.totalPurchaseAmt} SAR
                        </li>
                        <li>
                          <span className="text-muted">First Installment</span>
                          {item?.FirstInstallment?.depositAmt} SAR
                        </li>
                      </ul>

                      <div>
                        <div
                          className="request-status-container"
                          style={{ marginLeft: "25px" }}
                        >
                          <div
                            className="request-status text-green bg-soft-green"
                            style={{
                              maxWidth: "300px",
                              maxHeight: "30px",
                              backgroundColor: "white",
                              marginLeft: "30px",
                              display: "flex",
                              alignItems: "center",
                              marginBottom: "25px",
                              justifyContent: "space-between",
                            }}
                          >
                            {item?.quotePaymentStatus}
                            <img
                              src={success}
                              alt=""
                              style={{
                                maxWidth: "80px",
                                maxHeight: "30px",
                                marginLeft: "10px",
                              }}
                            />
                          </div>
                        </div>
                        {item?.isFullyPaid === true ? (
                          <div className="request-status-container d-flex justify-content-center">
                            <div
                              className="request-status text-green bg-soft-green"
                              style={{
                                maxWidth: "100px",
                                maxHeight: "30px",
                                backgroundColor: "white",
                                marginLeft: "30px",
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "25px",
                                justifyContent: "space-between",
                              }}
                            >
                              Fully Paid
                              <img
                                src={success}
                                alt=""
                                style={{ maxWidth: "80px", maxHeight: "30px" }}
                              />
                            </div>
                          </div>
                        ) : (
                          <div
                            className="request-status-container"
                            style={{ marginLeft: "auto" }}
                          >
                            <div
                              className="request-status text-green bg-soft-green"
                              data-bs-toggle="modal"
                              data-bs-target="#payModal"
                              onClick={() => setSelectedId(item?._id)}
                              style={{
                                maxWidth: "150px",
                                maxHeight: "30px",
                                cursor: "pointer",
                                backgroundColor: "white",
                                marginLeft: "30px",
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "25px",
                                justifyContent: "space-between",
                                marginLeft: "auto",
                              }}
                            >
                              Make Next Payment
                            </div>
                          </div>
                        )}
                        <Button
                          style={{ color: "white", margin: "auto" }}
                          variant="success"
                          data-bs-toggle="modal"
                          data-bs-target="#payModal01"
                          onClick={() => getAllPayments(item?._id)}
                        >
                          View Payment History{" "}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="quotes-null">
                  <img src={financeNull} alt="" />
                  <h5>
                    Sorry we couldn’t find any Recent Quotes Delivery Request
                    for now
                  </h5>
                  <p className="fs-small">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Purus lorem dolor id enim a, accumsan.
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* modals */}

      <div
        class="modal fade"
        id="payModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-body pay-form">
              <div className="d-flex justify-content-end">
                <span
                  className="bg-soft-danger text-danger modal-close"
                  data-bs-dismiss="modal"
                >
                  <IoMdClose />
                </span>
              </div>

              <h5 className="text-center">Make Next Payment </h5>

              <div className="form-group mt-3">
                <label className="form-label text-muted">
                  Select a credit card type
                </label>
                <select
                  class="form-select text-muted"
                  aria-label="Default select example"
                >
                  <option selected>MADA</option>
                  {/* <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option> */}
                </select>
              </div>

              <div className="form-group mt-4">
                <label className="form-label text-muted">
                  Credit Card Number
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  value={cardNumber}
                  onChange={handleChange}
                />

                {/* <input
                  type="number"
                  className="form-control"
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  value={cardDetails?.cardNo}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, cardNo: e.target.value })
                  }
                /> */}
              </div>

              <div className="form-group mt-4">
                <label className="form-label text-muted">
                  Name of Card Holder
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Same as on credit card"
                  value={cardDetails?.name}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, name: e.target.value })
                  }
                />
              </div>

              <div className="row">
                <div className="form-group mt-4 col-lg-6">
                  <label className="form-label text-muted">Expiry Date</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="MM / YYYY"
                    id="expiryDate"
                    name="expiryDate"
                    value={expiryDate}
                    maxLength="7"
                    onChange={handleExpiryDateChange}
                    onBlur={validateExpiryDate}
                  />
                  {isExpired && (
                    <span className="text-danger">{"Expired"}</span>
                  )}
                  {/* <input
                    type="text"
                    className="form-control"
                    placeholder="MM / YYYY"
                    value={cardDetails?.expiryDate}
                    onChange={(e) =>
                      setCardDetails({
                        ...cardDetails,
                        expiryDate: e.target.value,
                      })
                    }
                  /> */}
                </div>
                <div className="form-group mt-4 col-lg-6">
                  <label className="form-label text-muted">Security Code</label>
                  <input
                    type="text"
                    className="form-control"
                    value={cvv}
                    onChange={handleCvvChange}
                    // pattern="\d{1,3}"
                    maxLength="3"
                  />
                  {/* <input
                    type="number"
                    className="form-control"
                    placeholder="CVV"
                    value={cardDetails?.cvv}
                    maxLength={3}
                    onChange={(e) =>
                      setCardDetails({ ...cardDetails, cvv: e.target.value })
                    }
                  /> */}
                </div>
              </div>
              {/* <div class="form-check d-flex align-items-center mt-4">
                        <input class="form-check-input pay-check me-3" style={{ border: '1.5px solid #3F3F3F', width: '25px', height: '25px', borderRadius: '30%' }} type="checkbox" value="" id="privacyPolicy" />
                        <label class="form-check-label fs-small text-muted" for="privacyPolicy">
                        I’ve read and accept the  <Link className='text-dark text-decoration-underline' to='' onClick={() => setIsAgreed(!isAgreed)} >Terms & Conditions</Link>.
                        </label>
                    </div> */}

              <button
                className="btn btn-success mt-4 w-100"
                style={{ height: "50px", borderRadius: "6px" }}
                onClick={makeMyPayment}
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* getting all payment history */}
      <div
        class="modal fade"
        id="payModal01"
        tabindex="-1"
        aria-labelledby="exampleModalLabel01"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-body pay-form">
              <div className="d-flex justify-content-end">
                <span
                  className="bg-soft-danger text-danger modal-close"
                  data-bs-dismiss="modal"
                >
                  <IoMdClose />
                </span>
              </div>

              <h5 className="text-center">Payments History </h5>
              <div
                style={{
                  border: "1px solid darkGray",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                <div
                  className="row d-flex mb-3"
                  style={{
                    border: "1px solid darkGray",
                    borderRadius: "10px",
                    paddingTop: "5px",
                    margin: "1px",
                  }}
                >
                  <div className="col-sm-4">
                    <h6>No.</h6>
                  </div>
                  <div className="col-sm-4">
                    <h6>Month</h6>
                  </div>
                  <div className="col-sm-4">
                    <h6>Payments</h6>
                  </div>
                </div>
                {allPaid?.length > 0 ? (
                  allPaid?.map((item, index) => (
                    <div className="row d-flex mb-3">
                      <div className="col-sm-4">
                        <h6>{index + 1}</h6>
                      </div>
                      <div className="col-sm-4">
                        <h6>{moment(item?.date).format("MMM YY")}</h6>
                      </div>
                      <div className="col-sm-4">
                        <h6>
                          {moment(item?.date).format("MMM Do YY, h:mm:ss a")}
                        </h6>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No Payment History Found</p>
                )}

                {/* {console.log("allunpaid", allUnPaid)} */}

                {allUnPaid?.length > 1 ? (
                  allUnPaid?.map((item, index) => (
                    <div className="row d-flex mb-3">
                      <div className="col-sm-4">
                        <h6>{index + 1}</h6>
                      </div>
                      <div className="col-sm-4">
                        <h6>{item?.date}</h6>
                      </div>
                      <div className="col-sm-4">
                        <h6>{item?.amount}</h6>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No Pending Payments</p>
                )}

                {/* <h5
                  className="text-center"
                  style={{
                    color: "crimson",
                    marginBottom: "35px",
                    marginTop: "25px",
                  }}
                >
                  Payments Pending{" "}
                </h5> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* modals */}
    </>
  );
};

export default PaidFinanceQuotes;
