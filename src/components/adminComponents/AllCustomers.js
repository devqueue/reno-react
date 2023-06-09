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
  getAllCustomers,
  changeStatusOfAnyCustomer,
  getAllCustomersMatching,
} from "../../api/AdminApi";
import user from "../../assets/images/user.jpg";
import { useNavigate, Link, useLocation } from "react-router-dom";
import moment from "moment";
import { AiFillBell } from "react-icons/ai";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import NotificationAdmin from "./NotificationAdmin";
import AdminDropdown from "./AdminDropdown";

const MainPage = () => {
  const [allData, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [text, setText] = useState("");

  const changeStatus = async (id) => {
    let isFound = allData.find((item) => item.Id === id);
    if (isFound) {
      const { data } = await changeStatusOfAnyCustomer(id);
      if (data?.success === true) {
        if (isFound.Status == false) {
          isFound.Status = true;
          toast.success("Customer Approved Successfully");
        } else {
          isFound.Status = false;
          toast.success("Customer DisApproved Successfully");
        }
        let newData = allData;
        let finalData = newData.filter((item) =>
          item.Id === id ? isFound : item
        );
        setData(finalData);
      } else {
        toast.success(data?.message);
      }
    }
  };

  const TABLE_HEADERS = [
    {
      prop: "email",
      title: "Email",
    },
    {
      prop: "profilePic",
      title: "Profile Picture",
      cell: (prop) => {
        return (
          <img
            style={{ maxWidth: "50px", maxHeight: "50px", borderRadius: "50%" }}
            alt="Profile pic"
            src={
              prop?.profilePic.indexOf("https") == 0
                ? prop?.profilePic
                : process.env.REACT_APP_API_SERVER_URL +
                  "/customerProfilePics/" +
                  prop?.profilePic
            }
            onerror="this.src='https://placeimg.com/200/300/animals'"
          />
        );
      },
    },
    {
      prop: "idCard",
      title: "ID Card No.",
    },
    {
      prop: "phoneNo",
      title: "Phone No.",
      isFilterable: true,
    },
    {
      prop: "code",
      title: "Login Code",
    },
    {
      prop: "joinedAt",
      title: "Joined At",
    },
    {
      prop: "dob",
      title: "Date of Birth",
    },
    {
      prop: "_id",
      title: "Approve Request",
      name: "Actions",
      cell: (prop) => {
        return (
          <Dropdown as={ButtonGroup}>
            {prop?.Status == false && (
              <Button
                size="sm"
                variant="danger"
                style={{ fontSize: "11px", fontWeight: 600 }}
              >
                Not Approved
              </Button>
            )}
            {prop?.Status == true && (
              <Button
                size="sm"
                variant="success"
                style={{ fontSize: "11px", fontWeight: 600 }}
              >
                Approved
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
                onClick={() => changeStatus(prop?.Id)}
                style={{ backgroundColor: "#c23616", color: "white" }}
              >
                Declined
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => changeStatus(prop?.Id)}
                style={{ backgroundColor: "#10ac84", color: "white" }}
              >
                Approved
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

  // getting all data
  useEffect(() => {
    const getAllRecords = async () => {
      setIsFetching(true);
      const { data } = await getAllCustomers();
      let allDataArr = [];
      if (data?.success === true) {
        for (let i = 0; i !== data?.AllMerchants.length; i++) {
          let newArr = {
            profilePic: data?.AllMerchants[i]?.profilePic,
            idCard: data?.AllMerchants[i]?.IDCardNo,
            email: data?.AllMerchants[i]?.email,
            Status: data?.AllMerchants[i]?.status,
            phoneNo: data?.AllMerchants[i]?.phoneNo
              ? data?.AllMerchants[i]?.phoneNo
              : "N/A",
            joinedAt: moment(data?.AllMerchants[i]?.createdAt).format(
              "MMM Do YY"
            ),
            dob: data?.AllMerchants[i]?.dob
              ? moment(data?.AllMerchants[i]?.dob).format("MMM Do YY")
              : "N/A",
            Id: data?.AllMerchants[i]?._id,
            code: data?.AllMerchants[i]?.code
              ? data?.AllMerchants[i]?.code
              : "N/A",
          };
          allDataArr.push(newArr);
        }
        setData(allDataArr);
      }
      setIsFetching(false);
    };
    getAllRecords();
  }, []);

  // getting searched data
  const getSearchedMerchants = async () => {
    if (text.length < 5) {
      toast.error("Please provide at least 5 letters for searching.");
      return;
    }
    const { data } = await getAllCustomersMatching(text);
    let allDataArr = [];
    if (data?.success === true) {
      if (data?.success === true) {
        for (let i = 0; i !== data?.AllMerchants.length; i++) {
          let newArr = {
            profilePic: data?.AllMerchants[i]?.profilePic,
            idCard: data?.AllMerchants[i]?.IDCardNo,
            email: data?.AllMerchants[i]?.email,
            Status: data?.AllMerchants[i]?.status,
            phoneNo: data?.AllMerchants[i]?.phoneNo
              ? data?.AllMerchants[i]?.phoneNo
              : "N/A",
            joinedAt: moment(data?.AllMerchants[i]?.createdAt).format(
              "MMM Do YY"
            ),
            dob: data?.AllMerchants[i]?.dob
              ? moment(data?.AllMerchants[i]?.dob).format("MMM Do YY")
              : "N/A",
            Id: data?.AllMerchants[i]?._id,
          };
          allDataArr.push(newArr);
        }
      }
      setData(allDataArr);
    } else {
      setData([]);
    }
  };

  // getting data of all if no text for searching
  const getAllData = async () => {
    if (text.length == 0) {
      setIsFetching(true);
      const { data } = await getAllCustomers();
      let allDataArr = [];
      if (data?.success === true) {
        for (let i = 0; i !== data?.AllMerchants.length; i++) {
          let newArr = {
            profilePic: data?.AllMerchants[i]?.profilePic,
            idCard: data?.AllMerchants[i]?.IDCardNo,
            email: data?.AllMerchants[i]?.email,
            Status: data?.AllMerchants[i]?.status,
            phoneNo: data?.AllMerchants[i]?.phoneNo
              ? data?.AllMerchants[i]?.phoneNo
              : "N/A",
            joinedAt: moment(data?.AllMerchants[i]?.createdAt).format(
              "MMM Do YY"
            ),
            dob: data?.AllMerchants[i]?.dob
              ? moment(data?.AllMerchants[i]?.dob).format("MMM Do YY")
              : "N/A",
            Id: data?.AllMerchants[i]?._id,
            code: data?.AllMerchants[i]?.code
              ? data?.AllMerchants[i]?.code
              : "N/A",
          };
          allDataArr.push(newArr);
        }
        setData(allDataArr);
      }
      setIsFetching(false);
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
        <div className="container-fluid p-4 dashboard-content">
          <div className="panel-top d-flex align-items-center justify-content-between">
            <div className="panel-left">
              <h5 className="mb-0 fw-600">All Customers</h5>
              <p className="text-muted mb-0 text-light fs-small">
                {moment().format("MMMM Do YYYY")}
              </p>
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
                    <InputGroup className="mb-3">
                      <Form.Control
                        placeholder="Search here..."
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        onBlur={() => getAllData()}
                        onChange={(e) => setText(e.target.value)}
                      />
                      <Button variant="info" onClick={getSearchedMerchants}>
                        Search
                      </Button>
                    </InputGroup>
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
      )}
    </>
  );
};

export default MainPage;
