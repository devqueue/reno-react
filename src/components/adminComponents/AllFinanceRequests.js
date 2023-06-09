import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useEffect } from "react";
import { Col, Row, Table, Button } from "react-bootstrap";
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
import {
  getRecentFinancialRequests,
  approveAnyFinancialRequest,
} from "../../api/AdminApi";
import user from "../../assets/images/user.jpg";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate, Link, NavLink, useLocation } from "react-router-dom";
import moment from "moment";
import { AiFillBell } from "react-icons/ai";
import NotificationAdmin from "./NotificationAdmin";
import AdminDropdown from "./AdminDropdown";

const MainPage = () => {
  const location = useLocation();
  const [allData, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  // approving merchant request for quote
  const changeStatus = async (id, status) => {
    let isFound = allData.find((item) => item.Id === id);
    if (isFound) {
      //isFound.Status = status
      let msg = "";
      if (status === false) {
        msg = "Request Denied By Reno SuccessFully";
      } else {
        msg = "Request Approved and Sent to Merchant/Partner SuccessFully";
      }
      isFound.quoteStatus = msg;
      const { data } = await approveAnyFinancialRequest(id, status);
      if (data?.success === true) {
        let newData = allData;
        let finalData = newData.filter((item) =>
          item.Id === id ? isFound : item
        );
        if (status == "0") {
          isFound.custStatus = "Pending";
          toast.info("Request Pending By Reno SuccessFully");
        } else if (status == "1") {
          isFound.custStatus = "Approved";
          toast.success(
            "Request Approved and Sent to Merchant/Partner SuccessFully"
          );
        } else {
          isFound.custStatus = "Declined";
          toast.error(
            "Request Declined and Sent to Merchant/Partner SuccessFully"
          );
        }

        setData(finalData);
      } else {
        toast.success(data?.message);
      }
    }
  };

  const TABLE_HEADERS = [
    {
      prop: "customer",
      title: "Customer",
      cell: (prop) => {
        return (
          <div className="d-flex flex-column">
            <span>{prop.customerId}</span>
            <span>{prop.customerEmail}</span>
          </div>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      prop: "quoteNo",
      title: "Quote No",
    },
    {
      prop: "martialStatus",
      title: "Partner",
    },
    {
      prop: "employeement",
      title: "Customer",
    },
    {
      prop: "View",
      title: "View Details",
      cell: (prop) => {
        return (
          <NavLink
            activeClassName="active"
            className="text-darkGray fs-small"
            target="_blank"
            style={{ textDecoration: "none" }}
            to={`/view-finance-request/${prop.Id}`}
          >
            <span>View Details</span>
          </NavLink>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    // {
    //     prop: "martialStatus",
    //     title: "Martial Status "
    // },
    // {
    //     prop: "isWorking",
    //     title: "Employment"
    // },
    {
      prop: "_id",
      title: "Approve Request",
      name: "Actions",
      cell: (prop) => {
        return (
          <Dropdown as={ButtonGroup}>
            {prop?.custStatus == "Pending" && (
              <Button
                size="sm"
                variant="info"
                style={{ fontSize: "11px", fontWeight: 600 }}
              >
                {prop.custStatus}
              </Button>
            )}
            {prop?.custStatus == "Declined" && (
              <Button
                size="sm"
                variant="danger"
                style={{ fontSize: "11px", fontWeight: 600 }}
              >
                {prop.custStatus}
              </Button>
            )}
            {prop?.custStatus == "Approved" && (
              <Button
                size="sm"
                variant="success"
                style={{ fontSize: "11px", fontWeight: 600 }}
              >
                {prop.custStatus}
              </Button>
            )}
            <Dropdown.Toggle
              split
              size="sm"
              variant="primary"
              id="dropdown-split-basic"
            />
            <Dropdown.Menu style={{ backgroundColor: "transparent" }}>
              <Dropdown.Item
                onClick={() => changeStatus(prop?.Id, 0)}
                style={{ backgroundColor: "#30336b", color: "white" }}
              >
                Pending
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => changeStatus(prop?.Id, 1)}
                style={{ backgroundColor: "#10ac84", color: "white" }}
              >
                Approved
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => changeStatus(prop?.Id, 2)}
                style={{ backgroundColor: "crimson", color: "white" }}
              >
                Declined
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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
      const { data } = await getRecentFinancialRequests();
      let allDataArr = [];
      if (data?.success === true) {
        for (let i = 0; i !== data?.AllQuotes.length; i++) {
          let newArr = {
            customerId: data?.AllQuotes[i]?.ProductCategory?.IDCardNo,
            customerEmail: data?.AllQuotes[i]?.ProductCategory?.email,
            quoteNo: 8745885 + i,
            //martialStatus: data?.AllQuotes[i]?.personalInfo?.martialStatus,
            martialStatus: data?.AllQuotes[i]?.Partner,
            Status: data?.AllQuotes[i]?.Status,
            quoteStatus: data?.AllQuotes[i]?.quoteStatus,
            //employeement: data?.AllQuotes[i]?.personalInfo?.workingStatus === "true" ? "Employed" : "UnEmployed",
            employeement: data?.AllQuotes[i]?.Customer,
            custStatus: data?.AllQuotes[i]?.isCustomerApprovedText,
            Id: data?.AllQuotes[i]?._id,
          };
          allDataArr.push(newArr);
        }
        setData(allDataArr);
      }
      setIsFetching(false);
    };
    getAllRecords();
  }, []);

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
          <div className="container-fluid p-4 dashboard-content">
            <div className="panel-top d-flex align-items-center justify-content-between">
              <div className="panel-left">
                <h5 className="mb-0 fw-600">All Financial Requests</h5>
                {/* <p className='text-muted mb-0 text-light fs-small'>
                                    {moment().format('MMMM Do YYYY')}
                                    </p> */}
              </div>

              <div className="d-flex align-items-center panel-right">
                <NotificationAdmin />
                <AdminDropdown />
              </div>
            </div>
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
                      rowsPerPage: 10,
                      options: [5, 10, 15, 20],
                    },
                  }}
                >
                  <Row className="mb-4 p-2">
                    <Col
                      xs={12}
                      lg={4}
                      className="d-flex flex-col justify-content-start align-items-start"
                    >
                      <h4></h4>
                    </Col>
                    <Col
                      xs={12}
                      sm={6}
                      lg={4}
                      className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0"
                    ></Col>
                    <Col
                      xs={12}
                      sm={6}
                      lg={4}
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
          </div>
        </>
      )}
    </>
  );
};

export default MainPage;
