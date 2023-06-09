import React, { useState, useEffect } from "react";
import { AiFillBell } from "react-icons/ai";
import user from "../../assets/images/user.jpg";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import {
  getAllNotificationsOfMerchant,
  markNotificationsOfMerchantRead,
  addMerchantNewTicket,
  getAllTicketsOfAMerchant,
  addNewTicketResponse,
  getResponseOfAnyTicket,
} from "../../api/MerchentApi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import moment from "moment";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import NotificationMerchant from "./NotificationMerchant";
import MerchantDropdown from "./MerchantDropdown";

const QuotesReceived = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [userId, setUserId] = useState("");
  const location = useLocation();
  const [isSending, setIsSending] = useState(false);
  const [isResFetching, setIsResFetching] = useState(false);
  const [allResponses, setAllResponses] = useState([]);
  const navigate = useNavigate();
  const [allData, setAllData] = useState([]);
  const [ticketData, setTicketData] = useState({
    title: "",
    desc: "",
  });
  const [responseData, setResponseData] = useState({
    ticketId: "",
    desc: "",
  });

  //  adding new ticket
  const [addNewTicket, setAddNewTicket] = useState(false);
  const handleAddNewTicketClose = () => setAddNewTicket(false);
  const handleAddNewTicketShow = () => setAddNewTicket(true);

  //  view any ticket
  const [viewTicket, setViewTicket] = useState(false);
  const handleViewTicketClose = () => setViewTicket(false);
  const handleViewTicketShow = () => setViewTicket(true);

  //getting all data unresolved tickets
  useEffect(() => {
    const getAllData = async () => {
      setIsFetching(true);
      const { data } = await getAllTicketsOfAMerchant();
      if (data?.success === true) {
        setAllData(data?.allTickets);
      }
      setIsFetching(false);
    };
    getAllData();
  }, []);

  // sending new issue
  const sendMyNewIssue = async () => {
    if (ticketData?.title == "" || ticketData?.desc == "") {
      toast.warning("Title and Description are Required.");
    } else {
      setIsFetching(true);
      const { data } = await addMerchantNewTicket(ticketData);
      if (data?.success === true) {
        toast.success("Issue Reported SuccessFully");
        const res = await getAllTicketsOfAMerchant();
        if (res?.data?.success === true) {
          setAllData(res?.data?.allTickets);
        }
        handleAddNewTicketClose();
      } else {
        toast.error(data?.message);
      }
      setIsFetching(false);
    }
  };

  // custom toggle function
  function CustomToggle({ children, eventKey, ticketId }) {
    // getting all responses
    const getData = useAccordionButton(eventKey, async () => {
      setIsResFetching(true);
      const { data } = await getResponseOfAnyTicket(ticketId);
      // console.log("all responses : ", data);
      if (data?.success === true) {
        setAllResponses(data?.allResponses);
      } else {
        setAllResponses([]);
      }
      setIsResFetching(false);
    });

    const decoratedOnClick = useAccordionButton(
      eventKey,
      async () => console.log("totally custom!", ticketId)
      //getData(ticketId)
    );

    return (
      <button
        className="btn btn-light "
        style={{
          textDecoration: "none",
          border: "1px solid #27ae60",
          fontWeight: 600,
          color: "#27ae60",
        }}
        onClick={() => {
          decoratedOnClick();
          getData();
        }}
      >
        {children}
      </button>
    );
  }

  // sending new Response
  const sendMyResponse = async () => {
    setIsSending(true);
    const { data } = await addNewTicketResponse(responseData);
    if (data?.success === true) {
      setIsResFetching(true);
      toast.success(data?.message);
      const res = await getResponseOfAnyTicket(responseData?.ticketId);
      if (res?.data?.success === true) {
        setAllResponses(res?.data?.allResponses);

        // updating ticket last update time
        // let newArr = allData
        // let isFound = newArr.find(item => item?._id == responseData?.ticketId);
        // if(isFound){
        //     isFound.updatedAt = new Date();
        //     newArr.filter(item => item._id == responseData?.ticketId ? isFound : item)
        //     let myNewArr = newArr.sort(function(a, b){return new Date(b.updatedAt) - new Date(a.updatedAt)})
        //     console.log("myNewArr  ",myNewArr )
        //     setAllData(myNewArr)
        // }
      }
      setIsResFetching(false);
      setResponseData({
        ticketId: "",
        desc: "",
      });
    } else {
      toast.error(data?.message);
    }
    setIsResFetching(false);
    setIsSending(false);
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
                <h5 className="mb-0 fw-600">Customer Support</h5>
              </div>

              <div className="d-flex align-items-center panel-right">
                <NotificationMerchant />
                <MerchantDropdown />
              </div>
            </div>

            <div className="row ">
              <div
                className="col-12 d-flex justify-content-center "
                style={{ marginTop: "20px" }}
              >
                <button
                  className="btn btn-light "
                  style={{
                    textDecoration: "none",
                    border: "1px solid crimson",
                    fontWeight: 600,
                    color: "crimson",
                  }}
                  onClick={handleAddNewTicketShow}
                >
                  Need Help?
                </button>
              </div>
            </div>

            {/* all Tickets */}
            <div className="row mt-4">
              <Accordion>
                {allData.length > 0 ? (
                  allData?.map((item, index) => (
                    <Accordion.Item
                      eventKey={index}
                      style={{ marginBottom: "20px" }}
                    >
                      <div
                        className="col-12 d-flex justify-content-between fs-small quote-card"
                        style={{
                          minHeight: "100%",
                          padding: "none",
                          minWidth: "100%",
                        }}
                      >
                        <ul>
                          <li className="mb-3">
                            <span className="text-muted">Title</span>
                            {item?.title}
                          </li>
                          <li className="mb-3">
                            <span className="text-muted">Status</span>
                            {item?.status == false ? (
                              <span
                                style={{ color: "crimson", fontWeight: 600 }}
                              >
                                Un Resolved
                              </span>
                            ) : (
                              <span
                                style={{ color: "#27ae60", fontWeight: 600 }}
                              >
                                Resolved
                              </span>
                            )}
                          </li>
                          <li>
                            <span className="text-muted">Last Updated</span>
                            {moment(item?.updatedAt).format(
                              "MMM Do YYYY, h:mm:ss a"
                            )}
                          </li>
                        </ul>
                        <CustomToggle eventKey={index} ticketId={item?._id}>
                          View Details
                        </CustomToggle>
                      </div>
                      <Accordion.Body eventKey={index}>
                        {isResFetching === true ? (
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
                          <div
                            className="row"
                            key={item?._id}
                            style={{ paddingTop: "30px" }}
                          >
                            <div
                              className="d-flex flex-column justify-content-center align-content-center"
                              style={{ marginBottom: "20px" }}
                            >
                              <h6
                                style={{ marginLeft: "15px", color: "#d35400" }}
                              >
                                Issue Description :{" "}
                              </h6>
                              <p
                                style={{
                                  padding: "10px",
                                  borderRadius: "10px",
                                }}
                              >
                                {item?.desc}
                              </p>
                            </div>
                            <h4 style={{ marginLeft: "15px", fontWeight: 600 }}>
                              Comments :{" "}
                            </h4>
                            {allResponses?.length > 0 ? (
                              allResponses?.map((item) => (
                                <>
                                  <div
                                    className="d-flex flex-column"
                                    style={{
                                      marginBottom: "20px",
                                      paddingTop: "15px",
                                    }}
                                  >
                                    <h6 style={{ marginLeft: "15px" }}>
                                      By: &nbsp;
                                      {item?.MerchantName ||
                                        item?.CustomerName ||
                                        item?.AdminName}
                                    </h6>
                                    <p
                                      style={{
                                        padding: "10px",
                                        borderRadius: "10px",
                                      }}
                                    >
                                      {item?.Description}
                                    </p>
                                    <h6
                                      style={{
                                        marginLeft: "15px",
                                        fontSize: "15px",
                                        color: "#636e72",
                                      }}
                                    >
                                      Posted On :{" "}
                                      <span
                                        style={{
                                          fontSize: "12px",
                                          marginLeft: "20px",
                                          color: "#2c3e50",
                                        }}
                                      >
                                        {moment(item?.createdAt).format(
                                          "MMM Do YY, h:mm:ss a"
                                        )}
                                      </span>
                                    </h6>
                                  </div>
                                  <hr />
                                </>
                              ))
                            ) : (
                              <p
                                style={{
                                  marginBottom: "25px",
                                  fontWeight: 600,
                                }}
                              >
                                No Comments Found
                              </p>
                            )}

                            {/* Sending New Response */}
                            {item?.status == false ? (
                              <div
                                className="d-flex flex-column"
                                style={{ marginTop: "25px" }}
                              >
                                <h5>Add Your Response</h5>
                                <div className="col-12 form-group mb-3">
                                  <textarea
                                    className="form-control input-field contact-textarea"
                                    placeholder="Please write down your issue..."
                                    value={responseData?.desc}
                                    onChange={(e) =>
                                      setResponseData({
                                        ...responseData,
                                        ticketId: item?._id,
                                        desc: e.target.value,
                                      })
                                    }
                                  ></textarea>
                                </div>
                                {isSending === true ? (
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
                                  <div className="col-12 d-flex justify-content-center">
                                    <button
                                      className="btn "
                                      style={{
                                        fontWeight: 600,
                                        backgroundColor: "#0B0A31",
                                        color: "white",
                                      }}
                                      onClick={sendMyResponse}
                                    >
                                      Send Now
                                    </button>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <p style={{ fontWeight: 600 }}>
                                Issus is Marked as Resolved By Reno, You No
                                Longer can Send Your Opinions to this. If You
                                still unable to find out your issue, you
                                generate a new Ticket Issue.
                              </p>
                            )}
                          </div>
                        )}
                      </Accordion.Body>
                    </Accordion.Item>
                  ))
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    No Tickets Posted yet
                  </div>
                )}
              </Accordion>
            </div>
          </div>
        </>
      )}

      {/* add New Ticket */}
      <Modal
        show={addNewTicket}
        onHide={handleAddNewTicketClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Report A New Issue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-12 form-group mb-3">
              <input
                type="text"
                className="form-control input-field"
                placeholder="Subject"
                value={ticketData?.title}
                onChange={(e) =>
                  setTicketData({ ...ticketData, title: e.target.value })
                }
              />
            </div>
            <div className="col-12 form-group mb-3">
              <textarea
                className="form-control input-field contact-textarea"
                placeholder="Please write down your issue..."
                value={ticketData?.desc}
                onChange={(e) =>
                  setTicketData({ ...ticketData, desc: e.target.value })
                }
              ></textarea>
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
              <div className="col-12 d-flex justify-content-end">
                <button
                  className="btn w-100 "
                  style={{
                    fontWeight: 600,
                    backgroundColor: "#0B0A31",
                    color: "white",
                  }}
                  onClick={sendMyNewIssue}
                >
                  Report Now
                </button>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleAddNewTicketClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* add New Ticket */}

      {/* view Any Ticket */}
      <Modal
        show={viewTicket}
        onHide={handleViewTicketClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header>
          <Modal.Title style={{ minWidth: "100%" }}>
            <div
              className="row d-flex justify-content-between"
              style={{ minWidth: "100%" }}
            >
              <div className="col-5">
                <h6>New Issue</h6>
              </div>
              <div className="col-4">
                <h6 style={{ color: "crimson", fontWeight: 600 }}>
                  UnResolved
                </h6>
              </div>
              <div className="col-2">
                <h6>last Updated: 26 Aug 2022</h6>
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ maxHeight: "calc(100vh - 210px)", overflowY: "auto" }}
        >
          <div className="row">
            {/* Admin Response */}
            <div className="row" style={{ marginBottom: "20px" }}>
              <div className="col-1">Reno</div>
              <div className="col-11">
                <span style={{ fontWeight: 600, fontSize: "12px" }}>
                  20 Aug 2022 at 1.38.45 am
                </span>
                <p
                  style={{
                    border: "1px solid #95a5a6",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                  vel mi ac felis aliquet finibus eu sit amet leo. Praesent sed
                  euismod nisi. In maximus facilisis tempor. Cras in cursus est,
                  id feugiat mauris. Aenean sed sapien ligula. Fusce mattis,
                  ipsum eu hendrerit sollicitudin, lectus lacus fermentum
                  sapien, eu pretium orci est nec erat. Donec sit amet dictum
                  magna. Ut vitae sem eu ligula consectetur volutpat vitae sit
                  amet metus. Etiam imperdiet nec purus quis bibendum. Quisque
                  aliquet diam aliquet lectus luctus molestie.
                </p>
              </div>
            </div>
            {/* Customer Response */}
            <div className="row" style={{ marginBottom: "20px" }}>
              <div className="col-11" style={{ paddingLeft: "35px" }}>
                <span style={{ fontWeight: 600, fontSize: "12px" }}>
                  20 Aug 2022 at 1.38.45 am
                </span>
                <p
                  style={{
                    border: "1px solid #95a5a6",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                  vel mi ac felis aliquet finibus eu sit amet leo. Praesent sed
                  euismod nisi. In maximus facilisis tempor. Cras in cursus est,
                  id feugiat mauris. Aenean sed sapien ligula. Fusce mattis,
                  ipsum eu hendrerit sollicitudin, lectus lacus fermentum
                  sapien, eu pretium orci est nec erat. Donec sit amet dictum
                  magna. Ut vitae sem eu ligula consectetur volutpat vitae sit
                  amet metus. Etiam imperdiet nec purus quis bibendum. Quisque
                  aliquet diam aliquet lectus luctus molestie.
                </p>
              </div>
              <div className="col-1">
                <div className="d-flex flex-column justify-content-center align-content-center">
                  <span style={{ fontWeight: 600 }}>You</span>
                  <img
                    alt="user image"
                    style={{
                      maxWidth: "50px",
                      maxHeight: "50px",
                      borderRadius: "50%",
                    }}
                    src="https://svgsilh.com/svg_v2/659651.svg"
                  />
                </div>
              </div>
            </div>

            <hr />
            {/* Sending New Response */}
            <div className="d-flex flex-column" style={{ marginTop: "25px" }}>
              <h5>Add New Response</h5>
              <div className="col-12 form-group mb-3">
                <textarea
                  className="form-control input-field contact-textarea"
                  placeholder="Please write down your issue..."
                  value={ticketData?.desc}
                  onChange={(e) =>
                    setTicketData({ ...ticketData, desc: e.target.value })
                  }
                ></textarea>
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
                <div className="col-12 d-flex justify-content-center">
                  <button
                    className="btn "
                    style={{
                      fontWeight: 600,
                      backgroundColor: "#0B0A31",
                      color: "white",
                    }}
                    onClick={sendMyNewIssue}
                  >
                    Send Now
                  </button>
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleViewTicketClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* view Any Ticket */}
    </>
  );
};

export default QuotesReceived;
