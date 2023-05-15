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
import { getAllQuotes, approveMerchantQuote } from "../../api/AdminApi";
import { useNavigate, Link, useLocation } from "react-router-dom";
import moment from "moment";

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
      isFound.isMerchantApproved = status;
      let msg = "";
      if (status == false) {
        msg = "Reno Declined Quote SuccessFully";
      } else {
        msg = "Quote Approved and Sent to Customer SuccessFully";
      }
      isFound.quoteStatus = msg;
      const { data } = await approveMerchantQuote(id, status);
      if (data?.success === true) {
        let newData = allData;
        let finalData = newData.filter((item) =>
          item.Id === id ? isFound : item
        );
        toast.success(msg);
        setData(finalData);
      } else {
        toast.success(data?.message);
      }
    }
  };

  const TABLE_HEADERS = [
    {
      prop: "IdCard",
      title: "Customer ID ",
    },
    {
      prop: "phoneNo",
      title: "Contact No.",
    },
    {
      prop: "totalAmt",
      title: "Total Amount",
    },
    {
      prop: "total_Months",
      title: "Total Months",
    },
    {
      prop: "per_month",
      title: "Per Month",
    },
    {
      prop: "createdAt",
      title: "Received Date",
    },

    {
      prop: "_id",
      title: "Change Status",
      name: "Actions",
      cell: (prop) => {
        return (
          <Button
            size="sm"
            variant="link"
            style={{
              fontSize: "11px",
              cursor: "text",
              fontWeight: 600,
              textDecoration: "none",
              color: "#0B0A31",
            }}
          >
            {prop?.quoteStatus}
          </Button>
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
      const { data } = await getAllQuotes();
      let allDataArr = [];
      if (data?.success === true) {
        for (let i = 0; i !== data?.AllQuotes.length; i++) {
          let newArr = {
            createdAt: moment(data?.AllQuotes[i]?.createdAt).format(
              "MMM Do YY, h:mm"
            ),
            totalAmt: data?.AllQuotes[i]?.financeDetails?.totalPurchaseAmt,
            per_month: data?.AllQuotes[i]?.RepaymentAmount?.amountPerMonth,
            total_Months: data?.AllQuotes[i]?.RepaymentAmount?.totalMonths,
            IdCard: data?.AllQuotes[i]?.customerAndProductDetails?.IDCardNo,
            phoneNo: data?.AllQuotes[i]?.customerAndProductDetails?.phoneNo,
            quoteStatus: data?.AllQuotes[i]?.quoteStatus,
            isMerchantApproved: data?.AllQuotes[i]?.isAdminMerchantApproved,
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
        <div className="container-fluid p-4 dashboard-content">
          <div className="panel-top d-flex align-items-center justify-content-between">
            <div className="panel-left">
              <h5 className="mb-0 fw-600">All Quotes Received</h5>
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
      )}
    </>
  );
};

export default MainPage;
