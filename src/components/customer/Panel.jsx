import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";
import user from "../../assets/images/user.jpg";
import widget1 from "../../assets/icons/widget1.png";
import widget2 from "../../assets/icons/widget2.png";
import widget3 from "../../assets/icons/widget3.png";
import widget4 from "../../assets/icons/widget4.png";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import logoDark from "../../assets/images/logoDark.png";
import qr from "../../assets/images/qr.png";
import { toast } from "react-toastify";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import moment from "moment";
import {
  getAllRecentQuotesForHomeScreen,
  getDashboardData,
  getUpcomingPaymentsOfQuotes,
  getAllNotificationsOfCustomer,
  markNotificationsOfMerchantRead,
  getAllPaymentsHistoryOfAnyCustomer,
} from "../../api/CustomerApi";
import NotificationCustomer from "./NotificationCustomer";
import CustomerDropdown from "./CustomerDropdown";
const Panel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [allRecords, setAllRecords] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [totalFinanced, setTotalFinanced] = useState(0);
  const [allDuePayments, setAllDuePayments] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setIsFetching(true);
      const { data } = await getAllRecentQuotesForHomeScreen();
      if (data?.success === true) {
        setAllRecords(data?.AllQuotes);
      }

      // getting all financed amount
      const response = await getDashboardData();
      if (response?.data?.success === true) {
        setTotalFinanced(response?.data?.FinancedAmt);
      }

      // getting all due payments
      const res = await getAllPaymentsHistoryOfAnyCustomer();
      if (res?.data?.success === true) {
        setAllDuePayments(res?.data?.PaymentsDue);
      }

      setIsFetching(false);
    };
    getData();
  }, [location]);

  const options = {
    maintainAspectRatio: false,
  };

  // abel: "Not issued",
  // label: "Issued",
  // label: "Paid",

  const [dueData, setDueData] = useState([]); //Due Date randomly Data
  const [notIssued, setNotIssued] = useState([]); //Not issued randomly Data
  const [issuedData, setIssuedData] = useState([]); //Issued randomly Data
  const [paidData, setPaidData] = useState([]); //Paid randomly Data

  useEffect(() => {
    const newSequence = Array.from({ length: 1000 }, () =>
      Math.floor(Math.random() * 1000)
    );
    setDueData(newSequence);
    const newSequence1 = Array.from({ length: 2000 }, () =>
      Math.floor(Math.random() * 2000)
    );
    setNotIssued(newSequence1);
    const newSequence2 = Array.from({ length: 1500 }, () =>
      Math.floor(Math.random() * 1500)
    );
    setIssuedData(newSequence2);
    const newSequence3 = Array.from({ length: 2500 }, () =>
      Math.floor(Math.random() * 2500)
    );
    setPaidData(newSequence3);
  }, []);

  const [selectedMonth, setSelectedMonth] = useState(0); // Initialize to 0, which means all months

  const handleMonthSelect = (event) => {
    setSelectedMonth(parseInt(event.target.value));
  };

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Due or late",
        data: dueData.filter(
          (value, index) => selectedMonth === 0 || index === selectedMonth - 1
        ),
        backgroundColor: "#F18056",
        borderRadius: 50,
        // borderWidth: 5,
      },
      {
        label: "Not issued",
        data: notIssued.filter(
          (value, index) => selectedMonth === 0 || index === selectedMonth - 1
        ),
        backgroundColor: "#F8C22D",
        borderRadius: 50,
        // borderWidth: 5,
      },
      {
        label: "Issued",
        data: issuedData.filter(
          (value, index) => selectedMonth === 0 || index === selectedMonth - 1
        ),
        backgroundColor: "#9A42F2",
        borderRadius: 50,
        // borderWidth: 5,
      },
      {
        label: "Paid",
        data: paidData.filter(
          (value, index) => selectedMonth === 0 || index === selectedMonth - 1
        ),
        backgroundColor: "#67D832",
        borderRadius: 50,
        // borderWidth: 5,
      },
    ],
  };

  //=====================Notification =================
  const [tab, setTab] = useState(1);

  return (
    <div className="container-fluid p-4 dashboard-content">
      <div className="panel-top d-flex align-items-center justify-content-between">
        <div className="panel-left">
          <h5 className="mb-0 fw-600">Dashboard</h5>
          {/* <p className='text-muted mb-0 text-light fs-small'>
            {moment().format('MMMM Do YYYY')}
            </p> */}
        </div>

        <div className="d-flex align-items-center panel-right">
          <NotificationCustomer />
          <CustomerDropdown />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-lg-3 col-md-6 mb-3">
          <div className="widget">
            <div className="widget-text">
              <p className="text-gray fs-small mb-0">Quotes received</p>
              <h3 className="mb-0 fw-600">{allRecords?.length}</h3>
            </div>
            <div className="widget-icon bg-soft-warning">
              <img src={widget1} alt="" />
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-3">
          <div className="widget">
            <div className="widget-text">
              <p className="text-gray mb-1 fs-small">
                financed amount <span className="text-muted">(SAR)</span>
              </p>
              <h3 className="mb-0 fw-600">{totalFinanced}</h3>
            </div>
            <div className="widget-icon bg-soft-danger">
              <img src={widget2} alt="" />
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-3">
          <div className="widget">
            <div className="widget-text">
              <p className="text-gray mb-1 fs-small">
                Paid amount <span className="text-muted">(SAR)</span>
              </p>
              <h3 className="mb-0 fw-600">00</h3>
            </div>
            <div className="widget-icon bg-soft-success">
              <img src={widget3} alt="" />
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-3">
          <div className="widget">
            <div className="widget-text">
              <p className="text-gray mb-1 fs-small">
                Remaining amount <span className="text-muted">(SAR)</span>
              </p>
              <h3 className="mb-0 fw-600">{totalFinanced}</h3>
            </div>
            <div className="widget-icon bg-soft-purple">
              <img src={widget4} alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <div className="bar-chart-card">
            <div className="bar-chart-heading">
              <h5 className="fw-600">Monthly Payments</h5>

              <select
                class="form-select fs-small text-muted shadow-none"
                aria-label="Default select example"
                value={selectedMonth}
                onChange={handleMonthSelect}
              >
                <option value="0">All Months</option>
                <option value="1">Jan</option>
                <option value="2">Feb</option>
                <option value="3">Mar</option>
                <option value="4">Apr</option>
                <option value="5">May</option>
                <option value="6">Jun</option>
                <option value="7">July</option>
                <option value="8">Aug</option>
                <option value="9">Sept</option>
                <option value="10">Oct</option>
                <option value="11">Nov</option>
                <option value="12">Dec</option>
              </select>
            </div>
            <Bar data={data} className="bar-chart" options={options} />
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <div className="table-container bg-color-light">
            <div className="row">
              <div className="col-lg-4">
                <h5 className="fw-600">Quotes Status</h5>
              </div>
            </div>

            <div className="table-responsive mt-3">
              {tab == 1 ? (
                <table class="table border-top">
                  <thead>
                    <tr className="text-muted">
                      <th scope="col">Reference Number</th>
                      <th scope="col">Purchase Total</th>
                      <th scope="col">Deposit Amount</th>
                      <th scope="col">Monthly Payment</th>
                      <th scope="col">Payment Period</th>
                      <th scope="col">Product Category</th>
                      <th scope="col">Quote Status</th>
                    </tr>
                  </thead>
                  {isFetching === true ? (
                    <ThreeDots
                      height="20"
                      width="320"
                      radius="9"
                      color="green"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{
                        display: "flex",
                        marginTop: "15px",
                        border: "none",
                        justifyContent: "center",
                        minWidth: "100%",
                        marginLeft: "60%",
                      }}
                      wrapperClassName="flex justify-content-center"
                    />
                  ) : (
                    <tbody>
                      {allRecords?.length > 0 ? (
                        allRecords?.map((item, index) => (
                          <tr key={item?._id}>
                            <td>{874557 + index}</td>
                            <td>{item?.FinancedAmount?.totalPurchaseAmt}</td>
                            <td>{item?.FinancedAmount?.depositAmt}</td>
                            <td>{item?.RepaymentAmount?.amountPerMonth}</td>
                            <td>{item?.RepaymentAmount?.totalMonths}</td>
                            <td>{item?.ProductCategory?.productCategory}</td>
                            <td>{item?.quoteStatus}</td>
                          </tr>
                        ))
                      ) : (
                        <p>No Recent Quotes Found</p>
                      )}
                    </tbody>
                  )}
                </table>
              ) : (
                <table class="table border-top">
                  <thead>
                    <tr className="text-muted">
                      <th scope="col">Reference Number</th>
                      <th scope="col">Finance Product</th>
                      <th scope="col">Purchase Total</th>
                      <th scope="col">Deposit Amount</th>
                      <th scope="col">Monthly Payment</th>
                      <th scope="col">Payment Period</th>
                      <th scope="col">Product Category</th>
                      <th scope="col">Product Detail</th>
                      <th scope="col">Quote Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>134123</td>
                      <td>0% interest payment plan</td>
                      <td>123</td>
                      <td>868</td>
                      <td>86786</td>
                      <td>3536</td>
                      <td>35345</td>
                      <td>7657</td>
                      <td>4654</td>
                    </tr>
                    <tr>
                      <td>1342134</td>
                      <td>0% interest payment plan</td>
                      <td>4324</td>
                      <td>8678</td>
                      <td>867868</td>
                      <td>678</td>
                      <td>67868</td>
                      <td>678678</td>
                      <td>678</td>
                    </tr>
                    <tr>
                      <td>131324</td>
                      <td>0% interest payment plan</td>
                      <td>3255</td>
                      <td>2345</td>
                      <td>000</td>
                      <td>546365</td>
                      <td>74</td>
                      <td>6788</td>
                      <td>678768</td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <div className="table-container bg-color-light">
            <h5 className="fw-600">Payments Due</h5>

            <div className="table-responsive mt-3">
              <table class="table border-top">
                <thead>
                  <tr className="text-muted">
                    <th scope="col">Reference Number</th>
                    <th scope="col">Due Date</th>
                    <th scope="col">Total Amount(SAR)</th>
                    <th scope="col">Paid Amount(SAR)</th>
                    <th scope="col">Pending Amount</th>
                    {/* <th scope="col">Status</th> */}
                  </tr>
                </thead>
                {isFetching === true ? (
                  <ThreeDots
                    height="20"
                    width="320"
                    radius="9"
                    color="green"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{
                      display: "flex",
                      marginTop: "15px",
                      border: "none",
                      justifyContent: "center",
                      minWidth: "100%",
                      marginLeft: "60%",
                    }}
                    wrapperClassName="flex justify-content-center"
                  />
                ) : (
                  <tbody>
                    {allDuePayments?.length > 0 ? (
                      allDuePayments?.map((item, index) => (
                        <tr key={item?._id}>
                          <td>{87422 + index}</td>
                          <td>{item?.dueDate}</td>
                          <td>{item?.totalAmount}</td>
                          <td>{item?.amountPaid}</td>
                          <td>{item?.pendingAmount}</td>
                        </tr>
                      ))
                    ) : (
                      <p>No Due Payments</p>
                    )}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}

      <div
        class="modal fade"
        id="invoiceModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-body">
              <div className="d-flex justify-content-between">
                <img src={logoDark} className="logo" alt="" />
                <ul className="fs-small">
                  <li className="mb-2">
                    <span className="text-muted">Date</span> 01/06/2022
                  </li>
                  <li className="mb-2">
                    <span className="text-muted">Due Date</span> 01/06/2022
                  </li>
                  <li>
                    <span className="text-muted">Bill Month</span> June 2022
                  </li>
                </ul>
              </div>
              <h3 className="fw-normal">Invoice</h3>
              <div className="d-flex justify-content-between fs-small py-2 border-top border-bottom border-dark">
                <div>
                  <span className="text-muted">Bill Number</span> 554485
                </div>
                <div>
                  <span className="text-muted">Order Number</span> 55555
                </div>
              </div>

              <div className="row mt-3 border-bottom border-dark">
                <div className="col-lg-6">
                  <div>
                    <span className="text-color-primary fs-small">
                      Bill From
                    </span>
                    <h5>RENO</h5>
                    <p className="text-muted fs-small">
                      Dammam City, <br />
                      P.O.Box : 8986, Bareed Dist.
                    </p>
                    <p className="text-muted fs-small">+923006997800</p>
                    <p className="text-muted fs-small">abc@domain.com</p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div>
                    <span className="text-color-purple fs-small">Bill To</span>
                    <h5>Zeshan Abid</h5>
                    <p className="text-muted fs-small">
                      Customer <br />
                      Address here
                    </p>
                    <p className="text-muted fs-small">Customer Phone Number</p>
                    <p className="text-muted fs-small">Customer Email</p>
                  </div>
                </div>
              </div>

              <ul className="mt-3 pb-2 border-bottom border-dark">
                <li className="d-flex justify-content-between fs-small py-3 border-bottom">
                  <span className="text-muted">Payment Amount</span>
                  <span>
                    <span className="text-muted">SAR</span> 850
                  </span>
                </li>
                <li className="d-flex justify-content-between fs-small py-3 border-bottom">
                  <span className="text-muted">Total</span>
                  <span>
                    <span className="text-muted">SAR</span> 850
                  </span>
                </li>
                <li className="d-flex justify-content-between fs-small py-3 border-bottom">
                  <span className="text-muted">Tax</span>
                  <span>0</span>
                </li>
                <li className="d-flex justify-content-between fs-small py-3">
                  <span>Total After Tax</span>
                  <span>
                    <span className="text-muted">SAR</span> 850
                  </span>
                </li>
              </ul>

              <div className="d-flex align-items-center justify-content-between">
                <img src={qr} height="130px" alt="" />
                <div className="qr-btns">
                  <button className="btn bg-darkBlue text-light fs-small mb-2">
                    Print Invoice
                  </button>{" "}
                  <br />
                  <button
                    className="btn close-btn fs-small"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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

              <h5 className="text-center">Pay Now</h5>

              <div className="form-group mt-3">
                <label className="form-label text-muted">
                  Select a credit card type
                </label>
                <select
                  class="form-select text-muted"
                  aria-label="Default select example"
                >
                  <option selected>MADA</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>

              <div className="form-group mt-4">
                <label className="form-label text-muted">
                  Credit Card Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                />
              </div>

              <div className="form-group mt-4">
                <label className="form-label text-muted">
                  Name of Card Holder
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Same as on credit card"
                />
              </div>

              <div className="row">
                <div className="form-group mt-4 col-lg-6">
                  <label className="form-label text-muted">Expiry Date</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="MM / YYYY"
                  />
                </div>
                <div className="form-group mt-4 col-lg-6">
                  <label className="form-label text-muted">Security Code</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="CVV"
                  />
                </div>
              </div>

              <div class="form-check d-flex align-items-center mt-4">
                <input
                  class="form-check-input pay-check me-3"
                  style={{
                    border: "1.5px solid #3F3F3F",
                    width: "25px",
                    height: "25px",
                    borderRadius: "30%",
                  }}
                  type="checkbox"
                  value=""
                  id="privacyPolicy"
                />
                <label
                  class="form-check-label fs-small text-muted"
                  for="privacyPolicy"
                >
                  I’ve read and accept the{" "}
                  <Link
                    className="text-dark text-decoration-underline"
                    to="/termsAndConditions"
                  >
                    Terms & Conditions
                  </Link>
                  .
                </label>
              </div>

              <button
                className="btn bg-darkBlue text-light mt-4 w-100"
                style={{ height: "50px", borderRadius: "6px" }}
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
    </div>
  );
};

export default Panel;
