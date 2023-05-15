import React, { useEffect, useState } from "react";
import { AiFillBell } from "react-icons/ai";
import user from "../../assets/images/user.jpg";
import partner1 from "../../assets/images/partner1.png";
import partner2 from "../../assets/images/partner2.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import {
  getAllNotificationsOfMerchant,
  markNotificationsOfMerchantRead,
} from "../../api/MerchentApi";
import NotificationMerchant from "./NotificationMerchant";
import MerchantDropdown from "./MerchantDropdown";

const Panel = () => {
  return (
    <div className="container-fluid p-4 dashboard-content">
      <div className="panel-top d-flex align-items-center justify-content-between">
        <div className="panel-left">
          <h5 className="mb-0 fw-600">Merchant Portal</h5>
          {/* <p className='text-muted mb-0 text-light fs-small'>
              {moment().format('MMMM Do YYYY')}
            </p> */}
        </div>

        <div className="d-flex align-items-center panel-right">
          <NotificationMerchant />
          <MerchantDropdown />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-lg-4 col-md-6 mb-3">
          <div className="panel-card">
            <div className="d-flex justify-content-center">
              <img src={partner1} alt="" />
            </div>
            <p className="my-4 fs-small m-auto text-muted text-center">
              Create a new application to send quotes to your customers.
            </p>
            <Link
              className="btn text-dark bg-darkBlue border"
              to="/partner/dashboard/panel/newApplication"
            >
              New Application
            </Link>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 mb-3">
          <div className="panel-card">
            <div className="d-flex justify-content-center">
              <img src={partner2} alt="" />
            </div>
            <p className="my-4 fs-small m-auto text-muted text-center">
              Check Status of Applications Submitted
            </p>
            <Link
              className="btn text-dark bg-darkBlue border"
              to="/partner/dashboard/applications"
            >
              Application Status
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panel;
