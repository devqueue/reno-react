import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useEffect } from "react";
import { Col, Row, Table, Button } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { AiFillBell } from "react-icons/ai";
import user from "../../assets/images/user.jpg";
import {
  DatatableWrapper,
  Filter,
  Pagination,
  PaginationOptions,
  TableBody,
  TableHeader,
} from "react-bs-datatable";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import { getAllTravelingQuotes } from "../../api/CustomerApi";
import moment from "moment";
import { Link } from "react-router-dom";
import { ApproveDisproveDelivery } from "../../api/CustomerApi";
import NotificationCustomer from "./NotificationCustomer";
import CustomerDropdown from "./CustomerDropdown";

const MainPage = () => {
  const [allData, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const TABLE_HEADERS = [
    {
      prop: "customer",
      title: "Quote No",
    },
    {
      prop: "sent",
      title: "Sent Date",
    },
    {
      prop: "approvedDate",
      title: "Approved Date",
    },
    {
      prop: "category",
      title: "Category",
    },
    {
      prop: "isAdmin",
      title: "Admin Response",
      cell: (prop) => {
        return (
          <>
            {prop?.isAdmin == "Pending" && (
              <Button
                size="sm"
                variant="danger"
                style={{ fontSize: "11px", fontWeight: 600 }}
              >
                Pending
              </Button>
            )}
            {prop?.isAdmin == "Approved" && (
              <Button
                size="sm"
                variant="success"
                style={{ fontSize: "11px", fontWeight: 600 }}
              >
                Approved
              </Button>
            )}
          </>
        );
      },
    },
    {
      prop: "_id",
      title: "Status",
      name: "Status of Order",
      cell: (prop) => {
        return (
          <>
            <Button
              size="sm"
              variant="link"
              style={{
                fontSize: "11px",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              {prop?.quoteStatus}
            </Button>
          </>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      prop: "changeNow",
      title: "Action",
      name: "Actions",
      cell: (prop) => {
        return (
          <>
            {prop?.quoteStatus == "Financial Details Accepted By Reno" && (
              <Button
                size="sm"
                variant="primary"
                style={{ fontSize: "11px", fontWeight: 600 }}
                onClick={() => changeStatus(prop?.Id, false)}
              >
                Pending
              </Button>
            )}
            {(prop?.quoteStatus == "Delivered By Partner" ||
              prop?.quoteStatus == "Cancelled By Partner") &&
              (prop?.CustomerResponse == true ? (
                <Button
                  size="sm"
                  variant="success"
                  style={{ fontSize: "11px", fontWeight: 600 }}
                  // onClick={() => changeStatus(prop?.Id, false)}
                >
                  Delivery Confirmed
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="info"
                  style={{ fontSize: "11px", fontWeight: 600 }}
                  onClick={() => changeStatus(prop?.Id, true)}
                >
                  {" "}
                  Confirm Delivery{" "}
                </Button>
              ))}
            {(prop?.quoteStatus == "Traveling" ||
              prop?.quoteStatus == "Pending") && (
              <Button
                size="sm"
                variant="link"
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  textDecoration: "none",
                  fontSize: "10px",
                }}
              >
                {prop?.quoteStatus}
              </Button>
            )}
            {(prop?.quoteStatus == "Delivery Confirmed By Customer" ||
              prop?.quoteStatus == "Order Cancelled By Customer") &&
              (prop?.quoteStatus == "Delivery Confirmed By Customer" ? (
                <Button
                  size="sm"
                  variant="success"
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    textDecoration: "none",
                    fontSize: "10px",
                  }}
                >
                  Delivery Confirmed By You
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="danger"
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    textDecoration: "none",
                    fontSize: "10px",
                  }}
                >
                  Cancelled By You
                </Button>
              ))}
          </>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  // getting all records
  useEffect(() => {
    const getAllRecords = async () => {
      setIsFetching(true);
      const { data } = await getAllTravelingQuotes();
      let allDataArr = [];
      if (data?.success === true) {
        for (let i = 0; i !== data?.AllQuotes.length; i++) {
          let no = Math.floor(1000 + Math.random() * 9000);
          let newArr = {
            customer: no,
            approvedDate: moment(data?.AllQuotes[i]?.CreatedAt).format(
              "MMM Do YY"
            ),
            sent: moment(data?.AllQuotes[i]?.SentAt).format("MMMM Do YYYY"),
            category:
              data?.AllQuotes[i]?.CustomerAndProductDetails?.productCategory,
            isAdmin:
              data?.AllQuotes[i].isAdminMerchantApproved == true
                ? "Approved"
                : "Pending",
            isWorking:
              data?.AllQuotes[i]?.personalInfo?.workingStatus === "true"
                ? "Employed"
                : "UnEmployed",
            quoteStatus: data?.AllQuotes[i]?.quoteStatus,
            changeNow: data?.AllQuotes[i]?.status,
            Id: data?.AllQuotes[i]?._id,
          };
          allDataArr.push(newArr);
        }
        setData(allDataArr);
      } else {
        toast.error(data?.message);
      }
      setIsFetching(false);
    };
    getAllRecords();
  }, []);

  // approving merchant request for quote
  const changeStatus = async (id, status) => {
    let isFound = allData.find((item) => item.Id === id);
    if (isFound) {
      if (status == false) {
        isFound.quoteStatus = "Order Cancelled By Customer";
      } else {
        isFound.quoteStatus = "Delivery Confirmed By Customer";
      }
      const { data } = await ApproveDisproveDelivery(id, status);
      if (data?.success === true) {
        let newData = allData;
        let finalData = newData.filter((item) =>
          item.Id === id ? isFound : item
        );
        toast.success(`Quote Status Changed to ${isFound.quoteStatus}`);
        setData(finalData);
      } else {
        toast.success(data?.message);
      }
    }
  };

  return (
    <>
      <div className="container-fluid p-4 dashboard-content">
        <div className="panel-top d-flex align-items-center justify-content-between">
          <div className="panel-left">
            <h5 className="mb-0 fw-600">All Quotes Approved By Partners</h5>
            {/* <p className='text-muted mb-0 text-light fs-small'>
                        {moment().format('MMMM Do YYYY')}
                        </p> */}
          </div>

          <div className="d-flex align-items-center panel-right">
            <NotificationCustomer />
            <CustomerDropdown />
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
          <Row
            style={{ width: "100%" }}
            className="d-flex flex-col justify-content-center align-items-center border-top border-bottom"
          >
            <Col xs={24} xl={24} lg={24} className="p-4">
              <DatatableWrapper
                body={allData}
                headers={TABLE_HEADERS}
                paginationOptionsProps={{
                  initialState: {
                    rowsPerPage: 5,
                    options: [5, 10, 15, 20],
                  },
                }}
              >
                <Row className="mb-4 p-2">
                  <Col
                    xs={12}
                    lg={6}
                    className="d-flex flex-col justify-content-start align-items-start"
                  >
                    <h4></h4>
                  </Col>
                  <Col
                    xs={12}
                    sm={6}
                    lg={6}
                    className="d-flex flex-col justify-content-end align-items-end"
                  >
                    <Filter />
                  </Col>
                </Row>
                <Table>
                  <TableHeader />
                  <TableBody />
                </Table>
                <Row className="mb-4 p-2">
                  <Col
                    xs={12}
                    sm={6}
                    lg={6}
                    className="d-flex flex-col justify-content-lg-start align-items-start justify-content-sm-start mb-2 mb-sm-0"
                  >
                    <PaginationOptions />
                  </Col>
                  <Col
                    xs={12}
                    sm={6}
                    lg={6}
                    className="d-flex flex-col justify-content-end align-items-end"
                  >
                    <Pagination />
                  </Col>
                </Row>
              </DatatableWrapper>
            </Col>
          </Row>
        )}
      </div>
    </>
  );
};

export default MainPage;
