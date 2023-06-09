import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useEffect } from "react";
import { Col, Row, Table, Button } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
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
  getAllQuotesToBeDelivered,
  changeStatusOfQuote,
} from "../../api/MerchentApi";
import moment from "moment";
import { useLocation, useNavigate, Link } from "react-router-dom";
import NotificationMerchant from "./NotificationMerchant";
import MerchantDropdown from "./MerchantDropdown";

const MainPage = () => {
  const [allData, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  // approving merchant request for quote
  const changeStatus = async (id, status) => {
    let isFound = allData.find((item) => item.Id === id);
    if (isFound) {
      isFound.quoteStatus = status;
      const { data } = await changeStatusOfQuote(id, status);
      if (data?.success === true) {
        let newData = allData;
        let finalData = newData.filter((item) =>
          item.Id === id ? isFound : item
        );
        toast.success(`Quote Status Changed to ${status}`);
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
    },
    {
      prop: "approvedDate",
      title: "Approved Date",
    },
    {
      prop: "sent",
      title: "Sent Date",
    },
    {
      prop: "category",
      title: "Category",
    },
    {
      prop: "isAdmin",
      title: "Admin Response On Customer",
    },
    {
      prop: "_id",
      title: "Change Status",
      name: "Actions",
      cell: (prop) => {
        return (
          <Dropdown as={ButtonGroup}>
            {prop?.quoteStatus == "Financial Details Accepted By Reno" && (
              <Button
                size="sm"
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  backgroundColor: "#40407a",
                  color: "white",
                }}
              >
                Pending
              </Button>
            )}
            {prop?.quoteStatus == "Traveling" && (
              <Button
                size="sm"
                variant="primary"
                style={{ fontSize: "11px", fontWeight: 600 }}
              >
                Traveling
              </Button>
            )}
            {prop?.quoteStatus == "Cancelled By Partner" && (
              <Button
                size="sm"
                variant="danger"
                style={{ fontSize: "11px", fontWeight: 600 }}
              >
                Cancelled
              </Button>
            )}
            {prop?.quoteStatus == "Delivered By Partner" && (
              <Button
                size="sm"
                variant="success"
                style={{ fontSize: "11px", fontWeight: 600 }}
              >
                Delivered
              </Button>
            )}
            {prop?.quoteStatus == "Delivered By Partner" ||
              (prop?.quoteStatus == "Delivery Confirmed By Customer" && (
                <Button
                  size="sm"
                  variant="success"
                  style={{ fontSize: "11px", fontWeight: 600 }}
                >
                  Delivered
                </Button>
              ))}
            <Dropdown.Toggle
              split
              size="sm"
              variant="primary"
              id="dropdown-split-basic"
            />
            <Dropdown.Menu style={{ backgroundColor: "transparent" }}>
              <Dropdown.Item
                onClick={() => changeStatus(prop?.Id, "Traveling")}
                style={{ backgroundColor: "#192a56", color: "white" }}
              >
                Traveling
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => changeStatus(prop?.Id, "Cancelled By Partner")}
                style={{ backgroundColor: "#c23616", color: "white" }}
              >
                Cancelled
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => changeStatus(prop?.Id, "Delivered By Partner")}
                style={{ backgroundColor: "#10ac84", color: "white" }}
              >
                Delivered
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
      const { data } = await getAllQuotesToBeDelivered();
      let allDataArr = [];
      if (data?.success === true) {
        for (let i = 0; i !== data?.AllQuotes.length; i++) {
          let newArr = {
            customer: data?.AllQuotes[i]?.CustomerIDCardNo,
            approvedDate: moment(data?.AllQuotes[i]?.ApprovedDate).format(
              "MMM Do YY, h:mm:ss a"
            ),
            sent: moment(data?.AllQuotes[i]?.CreatedAt).format(
              "MMMM Do YYYY, h:mm:ss a"
            ),
            category:
              data?.AllQuotes[i]?.CustomerAndProductDetails?.productCategory,
            isAdmin:
              data?.AllQuotes[i].AdminApprovedDate === true
                ? "Approved"
                : "Pending",
            isWorking:
              data?.AllQuotes[i]?.personalInfo?.workingStatus === "true"
                ? "Employed"
                : "UnEmployed",
            quoteStatus: data?.AllQuotes[i]?.QuoteStatus,
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

  return (
    <>
      <div className="container-fluid p-4 dashboard-content">
        <div className="panel-top d-flex align-items-center justify-content-between">
          <div className="panel-left">
            <h5 className="mb-0 fw-600">
              All Quotes To Be Delivered or Delivered
            </h5>
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
