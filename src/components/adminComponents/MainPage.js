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
  getAllMerchants,
  disApproveAnyMerchant,
  ApproveAnyMerchant,
  getAllMerchantsMatching,
} from "../../api/AdminApi";
import user from "../../assets/images/user.jpg";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import NotificationAdmin from "./NotificationAdmin";
import AdminDropdown from "./AdminDropdown";

const MainPage = () => {
  const [allData, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [text, setText] = useState("");
  const location = useLocation();

  const changeStatus = async (id) => {
    const { data } = await ApproveAnyMerchant(id);
    if (data?.success === true) {
      toast.success(data?.message);
      let isFound = allData.find((item) => item.Id === id);
      if (isFound) {
        if (isFound.status === "Pending") {
          isFound.status = "Approved";
        } else {
          isFound.status = "Pending";
        }
        let newData = allData;
        let finalData = newData.filter((item) =>
          item.Id === id ? isFound : item
        );
        setData(finalData);
      }
    } else {
      toast.error(data?.message);
    }
  };

  const TABLE_HEADERS = [
    {
      prop: "firstName",
      title: "FirstName",
      isFilterable: true,
    },
    {
      prop: "lastName",
      title: "LastName",
    },
    {
      prop: "code",
      title: "Login Code",
    },
    {
      prop: "email",
      title: "Email",
    },
    {
      prop: "companyEmail",
      title: "Company Email",
    },
    {
      prop: "category",
      title: "Category",
    },
    {
      prop: "country",
      title: "Country",
    },
    // {
    //     prop: "city",
    //     title: "City"
    // },
    {
      prop: "_id",
      title: "Change Status",
      name: "Actions",
      cell: (prop) => {
        return (
          <Dropdown as={ButtonGroup}>
            {prop?.status === "Pending" ? (
              <Button
                size="sm"
                variant="primary"
                onClick={() => changeStatus(prop?.Id)}
              >
                {prop?.status}
              </Button>
            ) : (
              <Button
                size="sm"
                variant="success"
                onClick={() => changeStatus(prop?.Id)}
              >
                {prop?.status}
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
                Pending
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
      const { data } = await getAllMerchants();
      let allDataArr = [];
      if (data?.success === true) {
        for (let i = 0; i !== data?.AllMerchants.length; i++) {
          let newArr = {
            firstName: data?.AllMerchants[i]?.firstName,
            lastName: data?.AllMerchants[i]?.lastName,
            email: data?.AllMerchants[i]?.email,
            companyEmail: data?.AllMerchants[i]?.companyEmail
              ? data?.AllMerchants[i]?.companyEmail
              : "N/A",
            category: data?.AllMerchants[i]?.category,
            country: data?.AllMerchants[i]?.country,
            //city: data?.AllMerchants[i]?.city,
            status: data?.AllMerchants[i]?.status,
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
    const { data } = await getAllMerchantsMatching(text);
    let allDataArr = [];
    if (data?.success === true) {
      for (let i = 0; i !== data?.AllMerchants.length; i++) {
        let newArr = {
          firstName: data?.AllMerchants[i]?.firstName,
          lastName: data?.AllMerchants[i]?.lastName,
          email: data?.AllMerchants[i]?.email,
          companyEmail: data?.AllMerchants[i]?.companyEmail
            ? data?.AllMerchants[i]?.companyEmail
            : "N/A",
          category: data?.AllMerchants[i]?.category,
          country: data?.AllMerchants[i]?.country,
          //city: data?.AllMerchants[i]?.city,
          status: data?.AllMerchants[i]?.status,
          Id: data?.AllMerchants[i]?._id,
          code: data?.AllMerchants[i]?.code
            ? data?.AllMerchants[i]?.code
            : "N/A",
        };
        allDataArr.push(newArr);
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
      const { data } = await getAllMerchants();
      let allDataArr = [];
      if (data?.success === true) {
        for (let i = 0; i !== data?.AllMerchants.length; i++) {
          let newArr = {
            firstName: data?.AllMerchants[i]?.firstName,
            lastName: data?.AllMerchants[i]?.lastName,
            email: data?.AllMerchants[i]?.email,
            companyEmail: data?.AllMerchants[i]?.companyEmail
              ? data?.AllMerchants[i]?.companyEmail
              : "N/A",
            category: data?.AllMerchants[i]?.category,
            country: data?.AllMerchants[i]?.country,
            //city: data?.AllMerchants[i]?.city,
            status: data?.AllMerchants[i]?.status,
            Id: data?.AllMerchants[i]?._id,
          };
          allDataArr.push(newArr);
        }
        setData(allDataArr);
      }
      setIsFetching(false);
    }
  };

  // tooltip function
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Change Status
    </Tooltip>
  );

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
        <div className="container-fluid p-4  dashboard-content">
          <div className="panel-top d-flex align-items-center justify-content-between">
            <div className="panel-left">
              <h5 className="mb-0 fw-600">All Merchants</h5>
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
