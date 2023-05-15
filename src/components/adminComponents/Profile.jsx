import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import eye from "../../assets/icons/eye.png";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import {
  checkUserPassword,
  updateUserPassword,
  getAdminDetails,
  updateAdminPic,
  updateAdminDetails,
} from "../../api/AdminApi";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import NotificationAdmin from "./NotificationAdmin";
import AdminDropdown from "./AdminDropdown";

const Password = () => {
  const location = useLocation();
  const [isFetching, setIsFetching] = useState(false);
  const [isMatched, setIsMatched] = useState(false);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");
  const [msg, setMsg] = useState("");
  const [pass1, setPass1] = useState(false);
  const [pass2, setPass2] = useState(false);
  const [pass3, setPass3] = useState(false);
  const [userDetails, setUserDetails] = useState();
  const [userDetailsOne, setUserDetailsOne] = useState();
  const [uploadImage, setUploadImage] = useState("");

  // sleeping
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  // checking password
  const checkCustomer = async (value) => {
    if (value == "") {
      setMsg("Old Password is Required");
      setIsMatched(false);
    } else {
      const { data } = await checkUserPassword(value);
      // console.log("data got : ", data);
      if (data?.success == true) {
        //toast.success(data?.message)
        setIsMatched(true);
        setMsg(data?.message);
      } else {
        toast.error(data?.message);
        setMsg(data?.message);
        setIsMatched(false);
      }
    }
  };

  // updating user password
  const updateMyPassword = async () => {
    setIsFetching(true);
    const { data } = await updateUserPassword(newPass);
    if (data?.success == true) {
      toast.success(data?.message);
      setIsMatched(false);
      setMsg(data?.message);
      setOldPass("");
      setNewPass("");
    } else {
      toast.error(data?.message);
      setMsg(data?.message);
      setIsMatched(false);
    }
    setIsFetching(false);
  };

  // getting user details
  useEffect(() => {
    const getData = async () => {
      const { data } = await getAdminDetails();
      if (data?.success === true) {
        setUserDetails(data?.User);
        setUserDetailsOne(data?.User);
      } else {
        toast.error(data?.message);
      }
    };
    getData();
  }, [location]);

  // updating data of user
  const updateMyData = async () => {
    setIsFetching(true);
    let isChanged =
      JSON.stringify(userDetailsOne) === JSON.stringify(userDetails);
    // checking if any of details is changed
    if (isChanged == false) {
      const { data } = await updateAdminDetails(userDetails);
      if (data?.success === true) {
        toast.success("Profile Details Updated SuccessFully");
        localStorage.setItem(
          "reno-adminName",
          JSON.stringify(userDetails?.userName)
        );
      } else {
        toast.error(data?.message);
      }
    }
    // checking if passowrd is changed
    if (newPass !== "") {
      await updateMyPassword();
    }
    // checking if image is changed
    if (uploadImage !== "") {
      let formData = new FormData();
      formData.append("adminImage", uploadImage);
      const res = await updateAdminPic(formData);
      if (res?.data?.success === true) {
        toast.success("Profile Image Updated Successfully");
        localStorage.setItem(
          "reno-adminPic",
          JSON.stringify(res?.data?.UpdatedImage)
        );
        setIsFetching(false);
        await delay(1500);
        window.location.reload();
      } else {
        toast.error(res?.data?.message);
      }
    }
    setIsFetching(false);
    await delay(1500);
    window.location.reload();
  };

  // allowing to change password
  const [allowUpdate, setAllowUpdate] = useState(false);

  const changeBtn = (value) => {
    if (value?.length > 0 && newPass === confirmNewPass) {
      setAllowUpdate(true);
    } else {
      setAllowUpdate(false);
    }
  };

  return (
    <>
      <div
        className="container-fluid p-4 dashboard-content"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div className="panel-top d-flex align-items-center justify-content-between">
          <div className="panel-left">
            <h5 className="mb-0 fw-600">Profile Setting</h5>
            {/* <p className='text-muted mb-0 text-light fs-small'>
                        {moment().format('MMMM Do YYYY')}
                        </p> */}
          </div>

          <div className="d-flex align-items-center panel-right">
            <NotificationAdmin />
            <AdminDropdown />
          </div>
        </div>
        <div className="py-5">
          <div className="container">
            <div className="col-lg-12">
              <div className="d-flex justify-content-between mb-4">
                <div className="form-group mb-4 col-lg-4">
                  <img
                    style={{
                      maxWidth: "100px",
                      maxHeight: "100px",
                      borderRadius: "50%",
                    }}
                    alt="user image"
                    src={
                      userDetails?.profilePic.indexOf("https") == 0
                        ? userDetails?.profilePic
                        : process.env.REACT_APP_API_SERVER_URL +
                          "/adminProfileImages/" +
                          userDetails?.profilePic
                    }
                  />
                </div>
                <div className="form-group mb-4 col-lg-4">
                  {uploadImage !== "" && (
                    <img
                      style={{
                        maxWidth: "100px",
                        maxHeight: "100px",
                        borderRadius: "50%",
                      }}
                      alt="user image"
                      src={URL.createObjectURL(uploadImage)}
                    />
                  )}
                </div>
                <div className="form-group mb-4 col-lg-4">
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Update Image</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={(e) => setUploadImage(e.target.files[0])}
                    />
                  </Form.Group>
                  <div className="d-flex flex-column">
                    {/* <Button variant="dark" style={{maxHeight: '40px', minWidth: '120px'  }} >Update Now</Button> */}
                    {uploadImage !== "" && (
                      <Button
                        variant="danger"
                        style={{
                          maxHeight: "40px",
                          marginTop: "15px",
                          minWidth: "120px",
                        }}
                        onClick={() => setUploadImage("")}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <div className="d-flex">
                <div className="form-group mb-4 col-lg-5">
                  <label className="form-label">Your Email</label>
                  <div className="pass-container">
                    <input
                      type="email"
                      className="form-control px-3"
                      disabled={true}
                      value={userDetails?.email}
                    />
                  </div>
                </div>
                <div
                  className="form-group mb-4 col-lg-6"
                  style={{ marginLeft: "15px" }}
                >
                  <label className="form-label">Your Name</label>
                  <div className="pass-container">
                    <input
                      type="text"
                      className="form-control px-3"
                      onChange={(e) =>
                        setUserDetails({
                          ...userDetails,
                          userName: e.target.value,
                        })
                      }
                      value={userDetails?.userName}
                    />
                  </div>
                </div>
              </div>

              <div className="d-flex">
                <div className="form-group mb-4 col-lg-5">
                  <label className="form-label">Your Address</label>
                  <div className="pass-container">
                    <input
                      type="text"
                      className="form-control px-3"
                      onChange={(e) =>
                        setUserDetails({
                          ...userDetails,
                          address: e.target.value,
                        })
                      }
                      value={userDetails?.address}
                    />
                  </div>
                </div>
                <div
                  className="form-group mb-4 col-lg-6"
                  style={{ marginLeft: "15px" }}
                >
                  <label className="form-label">Your Phone Number</label>
                  <div className="pass-container">
                    <input
                      type="number"
                      className="form-control px-3"
                      onChange={(e) =>
                        setUserDetails({
                          ...userDetails,
                          phoneNo: e.target.value,
                        })
                      }
                      value={userDetails?.phoneNo}
                    />
                  </div>
                </div>
              </div>

              <h5 style={{ marginBottom: "15px", marginTop: "20px" }}>
                Update Password
              </h5>
              <div className="d-flex">
                <div className="form-group mb-4 col-lg-4">
                  <label className="form-label">Old Password</label>
                  <span
                    style={{
                      color: "crimson",
                      fontSize: "13px",
                      marginLeft: "10px",
                    }}
                  >
                    (Please enter Your old password first.)
                  </span>
                  <div className="pass-container">
                    <input
                      type={`${pass1 ? "text" : "password"}`}
                      className="form-control px-3"
                      placeholder="Enter Your Old Password"
                      onChange={(e) => setOldPass(e.target.value)}
                      value={oldPass}
                      onBlur={(e) => checkCustomer(e.target.value)}
                    />
                    <img
                      src={eye}
                      onClick={() => setPass1(!pass1)}
                      className="reveal-btn"
                      alt=""
                    />
                  </div>
                  {isMatched == true ? (
                    <span
                      style={{
                        color: "#27ae60",
                        fontSize: "13px",
                        marginLeft: "10px",
                      }}
                    >
                      {msg}
                    </span>
                  ) : (
                    <span
                      style={{
                        color: "crimson",
                        fontSize: "13px",
                        marginLeft: "10px",
                      }}
                    >
                      {msg}
                    </span>
                  )}
                </div>
                <div
                  className="form-group mb-4 col-lg-4"
                  style={{ marginLeft: "15px" }}
                >
                  <label className="form-label">New Password</label>
                  <div className="pass-container">
                    <input
                      type={`${pass2 ? "text" : "password"}`}
                      className="form-control px-3"
                      placeholder="New Password"
                      disabled={!isMatched}
                      onChange={(e) => setNewPass(e.target.value)}
                      value={newPass}
                      onBlur={(e) => changeBtn(e.target.value)}
                    />
                    <img
                      src={eye}
                      onClick={() => setPass2(!pass2)}
                      className="reveal-btn"
                      alt=""
                    />
                  </div>
                </div>
                <div
                  className="form-group mb-4 col-lg-4"
                  style={{ marginLeft: "15px" }}
                >
                  <label className="form-label">Confirm New Password</label>
                  <div className="pass-container">
                    <input
                      type={`${pass3 ? "text" : "password"}`}
                      className="form-control px-3"
                      placeholder="Confirm New Password"
                      disabled={!isMatched && pass2}
                      onChange={(e) => setConfirmNewPass(e.target.value)}
                      value={confirmNewPass}
                      onBlur={(e) => changeBtn(e.target.value)}
                    />
                    <img
                      src={eye}
                      onClick={() => setPass3(!pass3)}
                      className="reveal-btn"
                      alt=""
                    />
                  </div>
                </div>
                {/* {
                                        isFetching === true ? (
                                            <div style={{display : 'flex' , justifyContent: 'center' , margin: 'auto'}}>
                                                <ThreeDots
                                                    height = "60"
                                                    width = "60"
                                                    radius = "9"
                                                    color = 'green'
                                                    ariaLabel = 'three-dots-loading'
                                                    wrapperStyle
                                                    wrapperClass
                                                />
                                            </div>
                                        ) : (
                                            isMatched === true && (
                                                <Link to='' className='auth-btn text-light' style={{marginTop : '15px'}} onClick={updateMyPassword}>Update Now</Link>
                                            )
                                        )
                                    } */}
              </div>
              <div className="d-flex">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
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
                    allowUpdate === true && (
                      <Link
                        to=""
                        className="auth-btn text-light"
                        style={{ marginTop: "15px" }}
                        onClick={updateMyData}
                      >
                        Update Now
                      </Link>
                    )
                  )}
                </div>
                <div className="col-lg-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Password;
