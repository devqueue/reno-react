import React, { useState, useEffect } from "react";
import { AiFillBell } from "react-icons/ai";
import moment from "moment";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getAllNotificationsOfMerchant,
  markNotificationsOfMerchantRead,
  readAllNotificationsOfMerchant,
} from "../../api/MerchentApi";

const NotificationMerchant = () => {
  const [tab, setTab] = useState(1);
  const [recentNotifications, setRecentNotifications] = useState([]);
  const [allNotifications, setAllNotifications] = useState([]);
  const [allNotificationsCount, setAllNotificationsCount] = useState([]);
  // getting all notifications
  useEffect(() => {
    const getAllNotifications = async () => {
      const { data } = await getAllNotificationsOfMerchant();
      if (data?.success === true) {
        setAllNotifications(data?.Notifications);
        setRecentNotifications(data?.Notifications.slice(0, 10));
        let count = 0;
        data?.Notifications?.map(
          (item) => item?.isRead === false && (count += 1)
        );
        setAllNotificationsCount(count);
      }
    };
    getAllNotifications();
  }, []);
  // marking notification as read
  const readNotification = async (id) => {
    const { data } = await markNotificationsOfMerchantRead(id);
    if (data?.success === true) {
      let newArr = allNotifications;
      let isFound = newArr.find((item) => item._id == id);
      if (isFound) {
        isFound.isRead = true;
        newArr.filter((item) => (item._id == id ? isFound : item));
        setAllNotifications(newArr);
        setAllNotificationsCount((prev) => prev - 1);
      }
    }
  };

  const readAllNotification = async (id) => {
    const { data } = await readAllNotificationsOfMerchant();
    if (data?.success === true) {
      toast.success(data?.message);
      setAllNotifications(data);
      setAllNotificationsCount([]);
    }
  };

  return (
    <div class="dropdown profile-dropdown">
      <Link
        to="#"
        className="notification-btn"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <AiFillBell />
        {allNotificationsCount > 0 && <span>{allNotificationsCount}</span>}
      </Link>
      <ul
        class="dropdown-menu"
        aria-labelledby="dropdownMenuButton1"
        style={{ maxHeight: "400px", overflowY: "auto" }}
      >
        {allNotifications?.length !== 0 &&
          recentNotifications?.length !== 0 && (
            <>
              <div className="d-flex mb-2">
                <Link
                  to="#"
                  type="button"
                  className={`btn col-6 ${
                    tab === 1
                      ? "btn-primary justify-content-center "
                      : "btn-light justify-content-center "
                  } `}
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(1);
                  }}
                  aria-expanded="true"
                >
                  <span>Recent</span>
                </Link>
                <Link
                  type="button"
                  to="#"
                  className={`btn col-6 ${
                    tab === 2
                      ? "btn-primary justify-content-center"
                      : "btn-light justify-content-center"
                  } `}
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(2);
                  }}
                  aria-expanded="true"
                >
                  <span>All Notifications</span>
                </Link>
              </div>
              <div className="col-12 mb-2">
                <Link
                  to="#"
                  type="button"
                  className={`btn col-12 justify-content-center btn-info text-white`}
                  onClick={(e) => {
                    e.preventDefault();
                    readAllNotification();
                  }}
                  aria-expanded="true"
                >
                  <span>Mark All Notification As Read</span>
                </Link>
              </div>
            </>
          )}

        {tab === 1 &&
          recentNotifications?.length > 0 &&
          recentNotifications?.map((item) =>
            item?.isRead === false ? (
              <li
                style={{ backgroundColor: "#ecf0f1" }}
                onClick={() => readNotification(item?._id)}
              >
                <Link class="dropdown-item" to="">
                  <strong>{item?.message} </strong> <br />
                  <span style={{ fontSize: "12px", color: "#34495e" }}>
                    {moment(item?.createdAt).format("MMM Do, h:mm:ss a")}
                  </span>
                </Link>
              </li>
            ) : (
              <li style={{ backgroundColor: "transparent" }}>
                <Link class="dropdown-item" to="">
                  <strong>{item?.message} </strong> <br />
                  <span className="text-muted" style={{ fontSize: "12px" }}>
                    {moment(item?.createdAt).format("MMM Do, h:mm:ss a")}
                  </span>
                </Link>
              </li>
            )
          )}
        {tab === 2 &&
          allNotifications?.length > 0 &&
          allNotifications?.map((item) =>
            item?.isRead === false ? (
              <li
                style={{ backgroundColor: "#ecf0f1" }}
                onClick={() => readNotification(item?._id)}
              >
                <Link class="dropdown-item" to="">
                  <strong>{item?.message} </strong> <br />
                  <span style={{ fontSize: "12px", color: "#34495e" }}>
                    {moment(item?.createdAt).format("MMM Do, h:mm:ss a")}
                  </span>
                </Link>
              </li>
            ) : (
              <li style={{ backgroundColor: "transparent" }}>
                <Link class="dropdown-item" to="">
                  <strong>{item?.message} </strong> <br />
                  <span className="text-muted" style={{ fontSize: "12px" }}>
                    {moment(item?.createdAt).format("MMM Do, h:mm:ss a")}
                  </span>
                </Link>
              </li>
            )
          )}
        {allNotifications?.length === 0 &&
          recentNotifications?.length === 0 && (
            <li style={{ backgroundColor: "transparent" }}>
              <Link class="dropdown-item" to="">
                No Notification
              </Link>
            </li>
          )}
        {/* {allNotifications?.length > 0 ? (
            allNotifications?.map((item) =>
              item?.isRead === false ? (
                <li
                  style={{ backgroundColor: "#ecf0f1" }}
                  onClick={() => readNotification(item?._id)}
                >
                  <Link class="dropdown-item" to="">
                    <strong>{item?.message} </strong> <br />
                    <span style={{ fontSize: "12px", color: "#34495e" }}>
                      {moment(item?.createdAt).format("MMM Do, h:mm:ss a")}
                    </span>
                  </Link>
                </li>
              ) : (
                <li style={{ backgroundColor: "transparent" }}>
                  <Link class="dropdown-item" to="">
                    <strong>{item?.message} </strong> <br />
                    <span
                      className="text-muted"
                      style={{ fontSize: "12px" }}
                    >
                      {moment(item?.createdAt).format("MMM Do, h:mm:ss a")}
                    </span>
                  </Link>
                </li>
              )
            )
          ) : (
           
          )} */}
      </ul>
    </div>
  );
};

export default NotificationMerchant;
