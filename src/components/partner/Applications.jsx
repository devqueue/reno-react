import React, { useEffect, useState, useMemo } from "react";
import { AiFillBell } from "react-icons/ai";
import user from "../../assets/images/user.jpg";
import { ThreeDots } from "react-loader-spinner";
import filter from "../../assets/icons/filter.png";
import upload from "../../assets/icons/upload.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getAllRecentSentQuotes,
  getAllNotificationsOfMerchant,
  markNotificationsOfMerchantRead,
  uploadInvoice,
} from "../../api/MerchentApi";
import { IoMdClose } from "react-icons/io";
import moment from "moment";
import { Grid, _ } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";

import axios from "axios";
import Badge from "react-bootstrap/Badge";
import NotificationMerchant from "./NotificationMerchant";
import MerchantDropdown from "./MerchantDropdown";

const Applications = () => {
  const navigate = useNavigate();
  const [filterData, setFilterData] = useState({
    customerId: "",
    category: "",
    totalAmount: "",
    terms: "",
    date: "",
    quoteStatus: "",
  });

  const [merchantId, setMerchantId] = useState("");

  // getting searched data
  const getFilteredResults = async () => {
    await axios
      .get(
        process.env.REACT_APP_API_SERVER_URL +
          `/api/v1/quotes/getAllFilteredRecords/${merchantId}?customerId=${filterData?.customerId}&category=${filterData?.category}&totalAmount=${filterData?.totalAmount}&terms=${filterData?.terms}&date=${filterData?.date}&quoteStatus=${filterData?.quoteStatus}`
      )
      .then(function (response) {
        if (response?.data?.success === true) {
          let newArr = response?.data?.AllQuotes;
          let newarray = [];
          newArr?.map((event, idx) => {
            return newarray.push([
              `${event[0].CustomerAndProductDetails.IDCardNo} ${event[0].CustomerAndProductDetails.email}`,
              event[0].CustomerAndProductDetails.productCategory,
              event[0].FinanceDetails.totalPurchaseAmt,
              event[0].RepaymentAmount.totalMonths,
              moment(event[0].CreatedAt).format("MMM Do YY"),
              event[0].quoteStatus,
              event[0].isFullyPaid,
              event[0]._id,
              event[0]._id,
            ]);
          });
          setAllData(newarray);
        } else {
          setAllData([]);
        }
      })
      .catch(function (error) {
        console.log("error : ", error);
      })
      .then(function () {
        // always executed
      });
    //console.log("data : ", data);
  };

  // clearing filter
  const clearFilters = async () => {
    setFilterData({
      customerId: "",
      category: "",
      totalAmount: "",
      terms: "",
      date: "",
    });
    setIsFetching(true);
    const { data } = await getAllRecentSentQuotes();
    if (data?.success === true) {
      let newArr = data?.AllQuotes;
      let newarray = [];
      newArr?.map((event, idx) => {
        return newarray.push([
          // event.CustomerAndProductDetails.IDCardNo +
          //   " " +
          //   event.CustomerAndProductDetails.email,
          // event.CustomerAndProductDetails.productCategory,
          // event.FinanceDetails.totalPurchaseAmt,
          // event.RepaymentAmount.totalMonths,
          // moment(event.CreatedAt).format("MMM Do YY"),
          // event.quoteStatus,
          // event.isFullyPaid,
          // event._id,
          // event._id,
          `${event.CustomerAndProductDetails.IDCardNo} ${event.CustomerAndProductDetails.email}`,
          event.CustomerAndProductDetails.productCategory,
          event.FinanceDetails.totalPurchaseAmt,
          event.RepaymentAmount.totalMonths,
          event.FinanceDetails.depositAmt,
          event.RepaymentAmount.amountPerMonth,
          moment(event.CreatedAt).format("MMM Do YY"),
          event.quoteStatus,
          event.isFullyPaid,
          event._id,
          event._id,
        ]);
      });
      setAllData(newarray);
    } else {
      toast.error(data?.message);
    }
    setIsFetching(false);
  };

  // sleeping
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const location = useLocation();

  const [isFetching, setIsFetching] = useState(false);
  const [allData, setAllData] = useState([]);

  // const [invoice, setInvoice] = useState(false);
  // const handleInvoiceClose = () => setInvoice(false);
  // const handleInvoiceInvoice = () => setInvoice(true);

  const [refund, setRefund] = useState(false);
  const handleRefundClose = () => setRefund(false);

  //=======Details View on Click
  const [detailsData, setDetailsData] = useState([]);
  const [detailPopUpData, setDetailPopUpData] = useState({});
  const [viewDetails, setViewDetails] = useState(false);

  const [idOfDetail, setIdOfDetail] = useState();
  const [invoiceFile, setInvoiceFile] = useState("");

  function togView(t) {
    setIdOfDetail(t);
    let selectedpayroll = [];
    detailsData?.map((item, index) =>
      item._id === t
        ? selectedpayroll.push({
            IdCard: item.CustomerAndProductDetails.IDCardNo,
            email: item.CustomerAndProductDetails.email,
            custPhone: item.CustomerAndProductDetails.phoneNo,
            firstName: item.firstName,
            lastName: item.lastName,
            customerId: item.CustomerId,
            category: item.CustomerAndProductDetails.productCategory,
            amount: item.FinanceDetails.totalPurchaseAmt,
            totalMonth: item.RepaymentAmount.totalMonths,
            depositeAmt: item.FinanceDetails.depositAmt,
            amountPerMonth: item.RepaymentAmount.amountPerMonth,
            CreatedAt: moment(item.CreatedAt).format("MMM Do YY"),
            status: item.quoteStatus,
            InvoiceFile: item.InvoiceFile,
          })
        : null
    );
    setDetailPopUpData(selectedpayroll[0]);
    setViewDetails(!viewDetails);
  }

  //getting all data
  useEffect(() => {
    getAllRecord();
  }, [location]);

  const getAllRecord = async () => {
    setIsFetching(true);
    const { data } = await getAllRecentSentQuotes();
    if (data?.success === true) {
      let newArr = data?.AllQuotes;
      setDetailsData(newArr);
      let newarray = [];
      newArr?.map((event, idx) => {
        return newarray.push([
          `${event.CustomerAndProductDetails.IDCardNo} ${event.CustomerAndProductDetails.email}`,
          event.CustomerAndProductDetails.productCategory,
          event.FinanceDetails.totalPurchaseAmt,
          event.RepaymentAmount.totalMonths,
          event.FinanceDetails.depositAmt,
          event.RepaymentAmount.amountPerMonth,
          moment(event.CreatedAt).format("MMM Do YY"),
          event.quoteStatus,
          event.isFullyPaid,
          event._id,
          event._id,
        ]);
      });
      setAllData(newarray);
    } else {
      toast.error(data?.message);
    }
    setIsFetching(false);
  };

  //=============Upload Invoice =================
  // updating data of user
  const customerInvoiceUpload = async () => {
    setIsFetching(true);
    if (invoiceFile === "" || invoiceFile === undefined) {
      toast.warning("File is required.");
    }
    if (invoiceFile !== "") {
      let formData = new FormData();
      formData.append("invoiceFile", invoiceFile);
      formData.append("customerId", detailPopUpData?.customerId);
      formData.append("id", idOfDetail);

      const res = await uploadInvoice(formData);
      if (res?.data?.success === true) {
        toast.success(res?.data?.message);
        setViewDetails(!viewDetails);
        setInvoiceFile("");
        setIsFetching(false);
        await delay(500);
        // window.location.reload();
        getAllRecord();
      } else {
        toast.error(res?.data?.message);
      }
    }
    setIsFetching(false);
    await delay(1500);
    // window.location.reload();
  };

  return (
    <div className="container-fluid p-4 dashboard-content">
      <div className="panel-top d-flex align-items-center justify-content-between">
        <div className="panel-left">
          <h5 className="mb-0 fw-600">Applications</h5>
          {/* <p className='text-muted mb-0 text-light fs-small'>
                    {moment().format('MMMM Do YYYY')}
                    </p> */}
        </div>

        <div className="d-flex align-items-center panel-right">
          <NotificationMerchant />
          <MerchantDropdown />
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
      ) : (
        <>
          <div className="d-flex table-filters mt-4">
            <input
              type="text"
              style={{ maxWidth: "120px" }}
              className="text-muted fs-small"
              placeholder="Customer ID"
              value={filterData?.customerId}
              onChange={(e) =>
                setFilterData({ ...filterData, customerId: e.target.value })
              }
            />
            <select
              className="form-select text-muted"
              aria-label="Default select example"
              onChange={(e) =>
                setFilterData({ ...filterData, category: e.target.value })
              }
            >
              <option selected>select any category</option>
              <option>Lighting</option>
              <option>Cooling/Heating</option>
              <option>Smart Home technology System</option>
              <option>Solar & Battery System</option>
              <option>Reno Has Declined Merchant.</option>
              <option>Electrical </option>
              <option>Blinds, curtains & Shutters</option>
              <option>Flooring & Wallpaper</option>
              <option>Garage Doors</option>
            </select>
            <select
              className="form-select text-muted"
              aria-label="Default select example"
              onChange={(e) =>
                setFilterData({ ...filterData, quoteStatus: e.target.value })
              }
            >
              {/* <option selected>select any Status</option> */}
              <option>Quote Sent To Customer</option>
              <option>Financial Details Accepted By Reno</option>
              <option>Order Cancelled By Customer</option>
              <option>Pending</option>
              <option>Delivered By Partner</option>
              <option>Approved By Customer </option>
              <option>Delivered</option>
              <option>Delivery Confirmed By Customer</option>
              <option>Quote Has Been Deny By Customer</option>
            </select>
            {/* <input type="number" className='text-muted fs-small' placeholder='Enter Amount' value={filterData?.totalAmount} onChange={(e) => setFilterData({...filterData , totalAmount : e.target.value}) } /> */}
            <input
              type="number"
              className="text-muted fs-small"
              placeholder="Enter Terms"
              value={filterData?.terms}
              onChange={(e) =>
                setFilterData({ ...filterData, terms: e.target.value })
              }
            />
            <input
              type="date"
              className="text-muted fs-small"
              placeholder="Enter Terms"
              value={filterData?.date}
              onChange={(e) =>
                setFilterData({ ...filterData, date: e.target.value })
              }
            />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                minWidth: "200px",
              }}
            >
              <Button
                variant="info"
                style={{ color: "white", backgroundColor: "#0B0A31" }}
                onClick={getFilteredResults}
              >
                Search Now
              </Button>
              <Button
                variant="info"
                style={{
                  color: "#0B0A31",
                  backgroundColor: "transparent",
                  border: "none",
                }}
                onClick={clearFilters}
              >
                Clear
              </Button>
            </div>
          </div>

          <div
            className="row"
            style={{
              minWidth: "100%",
              marginTop: "25px",
              backgroundColor: "transparent",
            }}
          >
            <div className="col-12">
              <Grid
                data={allData}
                columns={[
                  {
                    name: "Customer",
                    minWidth: "150px",
                  },
                  {
                    name: "Category",
                    minWidth: "185px",
                  },
                  {
                    name: "Amount",
                    minWidth: "150px",
                  },
                  {
                    name: "Terms",
                    minWidth: "120px",
                    formatter: (cell) =>
                      _(
                        <span className="badge badge-soft-secondary text-dark ">
                          {cell}
                        </span>
                      ),
                  },

                  {
                    name: "Deposite Amount",
                    minWidth: "120px",
                  },
                  {
                    name: "Funding",
                    minWidth: "120px",
                  },

                  {
                    name: "Date",
                    minWidth: "150px",
                    formatter: (cell) =>
                      _(
                        <span className="badge badge-soft-info text-dark ">
                          {cell}
                        </span>
                      ),
                  },
                  {
                    name: "Status",
                    minWidth: "150px",
                    formatter: (cell) =>
                      _(
                        <span className="badge badge-soft-info text-dark ">
                          {cell}
                        </span>
                      ),
                  },
                  {
                    name: "Payment status",
                    formatter: (cell) =>
                      _(
                        <>
                          {cell === true ? (
                            <Badge bg="success" text="light">
                              Paid{" "}
                            </Badge>
                          ) : (
                            <Badge bg="danger" text="light">
                              Un Paid{" "}
                            </Badge>
                          )}
                        </>
                      ),
                  },
                  {
                    name: "Action",
                    minWidth: "150px",
                    formatter: (cell) =>
                      _(
                        <>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => togView(cell)}
                          >
                            View Details
                          </Button>
                        </>
                      ),
                  },
                ]}
                search={true}
                sort={true}
                resizable={true}
                fixedHeader={true}
                pagination={{ enabled: true, limit: 10 }}
                style={{
                  th: {
                    backgroundColor: "#bdc3c7",
                    color: "#2f3542",
                    fontSize: "14px",
                  },
                  table: {
                    backgroundColor: "white",
                    minWidth: "100%",
                  },
                  td: {
                    textAlign: "center",
                    fontSize: "14px",
                  },
                }}
              />
            </div>
          </div>
        </>
      )}

      {/* Modal */}
      <div
        className="modal fade"
        id="invoiceModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body p-0">
              <div className="w-100 d-flex justify-content-end">
                <span
                  className="bg-soft-danger text-danger modal-close"
                  data-bs-dismiss="modal"
                >
                  <IoMdClose />
                </span>
              </div>
              <h3 className="text-center fw-600">Submit Invoice</h3>
              <div className="upload-field">
                <img src={upload} alt="" />
                <div>
                  <h5>Upload Invoice</h5>
                  <p className="text-muted fs-small mb-0">
                    Upload PDF file, Max size 10mb
                  </p>
                </div>
                <input type="file" />
              </div>

              <ul>
                <li className="d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted">
                  Category
                  <span>Solar & Battery System</span>
                </li>
                <li className="d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted">
                  Amount
                  <span>
                    SAR<span className="text-dark"> 1200</span>
                  </span>
                </li>
                <li className="d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted">
                  Deposit amount
                  <span>
                    SAR<span className="text-dark"> 0</span>
                  </span>
                </li>
                <li className="d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted">
                  Financed amount
                  <span>
                    SAR<span className="text-dark"> 0</span>
                  </span>
                </li>
                <li className="d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted">
                  Amount to be paid to partner
                  <span>
                    SAR<span className="text-dark"> 1080</span>
                  </span>
                </li>
                <li className="d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted">
                  Customer name
                  <span>Mohammed</span>
                </li>
                <li className="d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted">
                  Customer phone number
                  <span>+96655332156</span>
                </li>
                <li className="d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted">
                  Customer Email
                  <span>abc@gmail.com</span>
                </li>
              </ul>

              <button
                className="btn text-light bg-darkBlue w-100 mt-3"
                style={{ borderRadius: "6px", height: "47px" }}
              >
                Request Payment
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="refundModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body p-4">
              <div className="w-100 d-flex justify-content-end">
                <span
                  className="bg-soft-danger text-danger modal-close"
                  data-bs-dismiss="modal"
                >
                  <IoMdClose />
                </span>
              </div>
              <h3 className="text-center fw-600" style={{ color: "red" }}>
                Request Refund
              </h3>
              <div className="upload-field">
                <img src={upload} alt="" />
                <div>
                  <h5>Upload Invoice</h5>
                  <p className="text-muted fs-small mb-0">
                    Upload PDF file, Max size 10mb
                  </p>
                </div>
                <input type="file" />
              </div>

              <ul>
                <li className="d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted">
                  Category
                  <span>Solar & Battery System</span>
                </li>
                <li className="d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted">
                  Refund amount
                  <span>
                    SAR<span className="text-dark"> 0</span>
                  </span>
                </li>
                <li className="d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted">
                  Customer name
                  <span>Mohammed</span>
                </li>
                <li className="d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted">
                  Customer phone number
                  <span>+96655332156</span>
                </li>
                <li className="d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted">
                  Customer Email
                  <span>abc@gmail.com</span>
                </li>
              </ul>

              <button
                className="btn text-light w-100 mt-3"
                style={{
                  borderRadius: "6px",
                  height: "47px",
                  backgroundColor: "red",
                }}
              >
                Request Refund
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}

      {/* Invoice modal */}
      {/* <Modal
        show={viewDetails}
        toggle={() => {
          togView();
        }}
        // onHide={togView()}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Your Invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleInvoiceClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}

      {/* //New */}
      {/* //====Alex */}
      <Modal
        show={viewDetails}
        isOpen={viewDetails}
        toggle={() => {
          togView();
        }}
        size="md"
        centered
        backdrop="static"
        keyboard={false}
      >
        <div className="bg-light p-3 d-flex justify-content-between">
          <div>
            <h2 className="pt-2">Details</h2>
          </div>
          <div className="">
            <Button
              type="button"
              onClick={() => {
                setViewDetails(false);
              }}
              className="btn-close "
              aria-label="Close"
            ></Button>
          </div>
        </div>

        <ModalBody>
          <div className="modal-content">
            <div className="modal-body p-0">
              <h3 className="text-center fw-600">Submit Invoice</h3>
              <div className="upload-field">
                <img src={upload} alt="" />
                <div>
                  <h5>Upload Invoice</h5>
                  <p className="text-muted fs-small mb-0">
                    Upload PDF file, Max size 10mb
                  </p>
                </div>
                <input
                  type="file"
                  accept="application/pdf,application/vnd.ms-excel"
                  onChange={(e) => setInvoiceFile(e.target.files[0])}
                />
              </div>
              {invoiceFile && invoiceFile !== undefined && (
                <iframe
                  style={{
                    maxWidth: "100px",
                    maxHeight: "100px",
                    borderRadius: "50%",
                  }}
                  title="invoiceFile"
                  src={URL.createObjectURL(invoiceFile)}
                />
              )}
              {invoiceFile !== "" && (
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => setInvoiceFile("")}
                >
                  Remove File
                </button>
              )}
              <div className="d-flex justify-content-end mb-3 me-2">
                <button
                  className="btn btn-sm btn-info text-white"
                  onClick={customerInvoiceUpload}
                >
                  Upload
                </button>
              </div>

              <ul style={{ marginLeft: "-20px" }}>
                {detailPopUpData?.InvoiceFile &&
                  detailPopUpData?.InvoiceFile.length > 0 && (
                    <>
                      <h6 className="mb-0">Invoice Files</h6>
                      {detailPopUpData?.InvoiceFile?.map((fileName, index) => (
                        <li
                          key={index}
                          className="d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted"
                        >
                          {index + 1}. FileName
                          <span style={{ marginRight: "15px" }}>
                            {fileName}
                          </span>
                        </li>
                      ))}
                    </>
                  )}
                <h6 className="mt-4 mb-0">Details</h6>
                <li className="d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted">
                  Category
                  <span style={{ marginRight: "15px" }}>
                    {detailPopUpData?.category}
                  </span>
                </li>
                <li className="d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted">
                  Amount
                  <span style={{ marginRight: "15px" }}>
                    SAR
                    <span className="text-dark">
                      {" "}
                      {detailPopUpData?.amount}
                    </span>
                  </span>
                </li>
                <li className="d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted">
                  Deposit amount
                  <span style={{ marginRight: "15px" }}>
                    SAR
                    <span className="text-dark">
                      {" "}
                      {detailPopUpData?.depositeAmt}
                    </span>
                  </span>
                </li>
                <li className="d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted">
                  Amount Per Month
                  <span style={{ marginRight: "15px" }}>
                    SAR
                    <span className="text-dark">
                      {" "}
                      {detailPopUpData?.amountPerMonth}
                    </span>
                  </span>
                </li>
                <li className="d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted">
                  Term (Month)
                  <span style={{ marginRight: "15px" }}>
                    <span className="text-dark">
                      {" "}
                      {detailPopUpData?.totalMonth} Months
                    </span>
                  </span>
                </li>
                <li className="d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted">
                  Customer name
                  <span style={{ marginRight: "15px" }}>
                    {detailPopUpData?.firstName +
                      " " +
                      detailPopUpData?.lastName}
                  </span>
                </li>
                <li className="d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted">
                  Customer phone number
                  <span style={{ marginRight: "15px" }}>
                    {detailPopUpData?.custPhone}
                  </span>
                </li>
                <li className="d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted">
                  Customer Email
                  <span style={{ marginRight: "15px" }}>
                    {" "}
                    {detailPopUpData?.email}
                  </span>
                </li>
              </ul>
              <Modal.Footer>
                <Button
                  type="button"
                  onClick={() => {
                    setViewDetails(false);
                  }}
                  className="btn btn-danger"
                  aria-label="Close"
                >
                  Close
                </Button>
              </Modal.Footer>
            </div>
          </div>
        </ModalBody>
      </Modal>

      {/* invoice modal end */}

      {/* Refund modal */}
      <Modal
        show={refund}
        onHide={handleRefundClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Refund Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-content">
            <div className="modal-body p-0">
              <h3 className="text-center fw-600">Submit Invoice</h3>
              <div className="upload-field">
                <img src={upload} alt="" />
                <div>
                  <h5>Upload Invoice</h5>
                  <p className="text-muted fs-small mb-0">
                    Upload PDF file, Max size 10mb
                  </p>
                </div>
                <input type="file" />
              </div>
              <ul style={{ marginLeft: "-20px" }}>
                <li className="d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted">
                  Category
                  <span style={{ marginRight: "15px" }}>
                    Solar & Battery System
                  </span>
                </li>
                <li className="d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted">
                  Amount
                  <span style={{ marginRight: "15px" }}>
                    SAR<span className="text-dark"> 1200</span>
                  </span>
                </li>
                <li className="d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted">
                  Deposit amount
                  <span style={{ marginRight: "15px" }}>
                    SAR<span className="text-dark"> 0</span>
                  </span>
                </li>
                <li className="d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted">
                  Financed amount
                  <span style={{ marginRight: "15px" }}>
                    SAR<span className="text-dark"> 0</span>
                  </span>
                </li>
                <li className="d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted">
                  Amount to be paid to partner
                  <span style={{ marginRight: "15px" }}>
                    SAR<span className="text-dark"> 1080</span>
                  </span>
                </li>
                <li className="d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted">
                  Customer name
                  <span style={{ marginRight: "15px" }}>Mohammed</span>
                </li>
                <li className="d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted">
                  Customer phone number
                  <span style={{ marginRight: "15px" }}>+96655332156</span>
                </li>
                <li className="d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted">
                  Customer Email
                  <span style={{ marginRight: "15px" }}>abc@gmail.com</span>
                </li>
              </ul>

              <button
                className="btn text-light bg-darkBlue w-100 mt-3"
                style={{ borderRadius: "6px", height: "47px" }}
              >
                Request Payment
              </button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleRefundClose}>
            Close
          </Button>
          {/* <Button variant="success" onClick={handleRefundClose}>
            Yes, Refund
          </Button> */}
        </Modal.Footer>
      </Modal>
      {/* Refund modal end */}
    </div>
  );
};

export default Applications;
