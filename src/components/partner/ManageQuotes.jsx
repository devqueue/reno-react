import React, { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import { getAllRecentSentQuotes } from "../../api/MerchentApi";
import moment from "moment";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import NotificationMerchant from "./NotificationMerchant";
import MerchantDropdown from "./MerchantDropdown";

const ManageQuotes = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [allData, setAllData] = useState([]);

  //getting all data
  useEffect(() => {
    const getAllRecord = async () => {
      setIsFetching(true);
      const { data } = await getAllRecentSentQuotes();
      if (data?.success === true) {
        setAllData(data?.AllQuotes);
      } else {
        toast.error(data?.message);
      }
      setIsFetching(false);
    };
    getAllRecord();
  }, []);

  // return header of table
  const returnHeader = (length) => {
    let pp = [];
    for (let p = 0; p !== length; p++) {
      // if(p == 0){
      //   pp.push(
      //       <td>{1}</td>
      //   );
      // }else{
      pp.push(<td>{p + 1}</td>);
      //}
    }
    return pp;
  };

  // return Body of table
  const returnBody = (length, value) => {
    let pp = [<td>{length}</td>];
    for (let p = 0; p !== length; p++) {
      <td>{p + 1}</td>;
      pp.push(<td>{value}</td>);
    }
    return pp;
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
          <div className="container-fluid p-4 dashboard-content">
            <div className="panel-top d-flex align-items-center justify-content-between mb-4">
              <div className="panel-left">
                <h5 className="mb-0 fw-600">Manage Quotes</h5>
                {/* <p className='text-muted mb-0 text-light fs-small'>
                      {moment().format('MMMM Do YYYY')}
                    </p> */}
              </div>

              <div className="d-flex align-items-center panel-right">
                <NotificationMerchant />
                <MerchantDropdown />
              </div>
            </div>
            {allData?.length > 0 &&
              allData?.map((item) => (
                <>
                  <div
                    className="quote-card manage-quote mb-3"
                    style={{ position: "relative" }}
                  >
                    <div className="row">
                      <div className="col-lg-3">
                        <h6 className="text-muted fs-small mb-1">
                          Customer ID Card No.
                        </h6>
                        <h6 className="text-darkBlue">
                          {item?.CustomerIDCardNo}
                        </h6>
                        <h6 className="text-darkBlue">
                          Email: {item?.CustomerAndProductDetails?.email}
                        </h6>
                      </div>
                      <div className="col-lg-3">
                        <h6 className="text-muted fs-small mb-1">Date</h6>
                        <h6 className="text-darkBlue">
                          {moment(item?.CreatedAt).format("MMM Do YY")}
                        </h6>
                      </div>
                      <div className="col-lg-3">
                        <h6 className="text-muted fs-small mb-1">Time</h6>
                        <h6 className="text-darkBlue">
                          {moment(item?.CreatedAt).format("h:mm:ss a")}
                        </h6>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-12 table-responsive">
                        <table class="table table-bordered fs-small quotes-table mb-0">
                          <tbody>
                            <tr>
                              <td className="text-muted">Months</td>
                              {returnHeader(item?.RepaymentAmount?.totalMonths)}
                            </tr>
                            <tr>
                              {returnBody(
                                item?.RepaymentAmount?.totalMonths,
                                item?.RepaymentAmount?.amountPerMonth
                              )}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {item?.status === true ? (
                      <>
                        <div className="quote-status text-color-primary bg-soft-success">
                          {item?.isCustomerApprovedText}
                        </div>
                      </>
                    ) : (
                      <div className="quote-status text-color-primary bg-soft-orange">
                        {item?.isCustomerApprovedText}
                      </div>
                    )}
                  </div>
                </>
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default ManageQuotes;
