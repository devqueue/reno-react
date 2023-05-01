import React, { useState } from "react";
import { Link } from "react-router-dom";
import search from "../../assets/icons/search.png";
import reload from "../../assets/icons/reload.png";
import distance from "../../assets/icons/distance.png";
import partnerSearch from "../../assets/images/partnerSearch.jpg";

const LocationContent = () => {
  const [partners, setPartners] = useState(false);

  return (
    <div>
      <div className="container partners-location-container">
        <div className="row">
          <h2 className="mb-4 text-uppercase text-center text-darkBlue fw-600">
            Locate RENO partner near you
          </h2>

          <div className="col-12 partners-filters mb-4">
            <div class="dropdown me-2 partners-dropdown">
              <button
                class="btn btn-secondary dropdown-toggle input-field dropdown-btn"
                type="button"
                id="inquiryType"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Select City
              </button>
              <ul class="dropdown-menu" aria-labelledby="inquiryType">
                <li>
                  <Link class="dropdown-item" to="#">
                    Type 1
                  </Link>
                </li>
                <li>
                  <Link class="dropdown-item" to="#">
                    Type 2
                  </Link>
                </li>
                <li>
                  <Link class="dropdown-item" to="#">
                    Type 3
                  </Link>
                </li>
              </ul>
            </div>
            <div class="dropdown me-2 partners-dropdown">
              <button
                class="btn btn-secondary dropdown-toggle input-field dropdown-btn"
                type="button"
                id="inquiryType"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Select Category
              </button>
              <ul class="dropdown-menu" aria-labelledby="inquiryType">
                <li>
                  <Link class="dropdown-item" to="#">
                    Type 1
                  </Link>
                </li>
                <li>
                  <Link class="dropdown-item" to="#">
                    Type 2
                  </Link>
                </li>
                <li>
                  <Link class="dropdown-item" to="#">
                    Type 3
                  </Link>
                </li>
              </ul>
            </div>
            <button
              className="btn partners-btn bg-darkBlue me-2"
              onClick={() => setPartners(true)}
            >
              <img src={search} alt="" />
            </button>
            <button
              className="btn partners-btn border border-color-primary"
              onClick={() => setPartners(false)}
            >
              <img src={reload} alt="" />
            </button>
          </div>

          <div className="col-md-4">
            {partners ? (
              <div className="partners-list py-3 px-2">
                <div className="partners-list-container ps-2 pe-3">
                  <div className="partners-list-item border-bottom mb-3">
                    <Link
                      className="text-color-primary fw-600 partner-name mb-2 d-block"
                      to="#"
                    >
                      Mishkat Lighting
                    </Link>
                    <p className="text-muted fs-small">
                      Jeddah Salama Dist, Jeddah Salama Dist, Saudi Arabia
                    </p>
                    <p className="text-darkBlue distance d-flex align-items-center w-100">
                      <img src={distance} className="me-2" alt="" />
                      50KM away
                    </p>
                  </div>
                  <div className="partners-list-item border-bottom mb-3">
                    <Link
                      className="text-color-primary fw-600 partner-name mb-2 d-block"
                      to="#"
                    >
                      Enarah Lighting
                    </Link>
                    <p className="text-muted fs-small">
                      Jeddah Salama Dist, Jeddah Salama Dist, Saudi Arabia
                    </p>
                    <p className="text-darkBlue distance d-flex align-items-center w-100">
                      <img src={distance} className="me-2" alt="" />
                      20KM away
                    </p>
                  </div>
                  <div className="partners-list-item border-bottom mb-3">
                    <Link
                      className="text-color-primary fw-600 partner-name mb-2 d-block"
                      to="#"
                    >
                      Sun Lighting
                    </Link>
                    <p className="text-muted fs-small">
                      Jeddah Salama Dist, Jeddah Salama Dist, Saudi Arabia
                    </p>
                    <p className="text-darkBlue distance d-flex align-items-center w-100">
                      <img src={distance} className="me-2" alt="" />
                      10KM away
                    </p>
                  </div>
                  <div className="partners-list-item border-bottom mb-3">
                    <Link
                      className="text-color-primary fw-600 partner-name mb-2 d-block"
                      to="#"
                    >
                      Sun Lighting
                    </Link>
                    <p className="text-muted fs-small">
                      Jeddah Salama Dist, Jeddah Salama Dist, Saudi Arabia
                    </p>
                    <p className="text-darkBlue distance d-flex align-items-center w-100">
                      <img src={distance} className="me-2" alt="" />
                      10KM away
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="cities-card p-5">
                <div className="cities-img mb-5">
                  <img src={partnerSearch} alt="" />
                </div>
                <p className="text-muted text-center mb-0">
                  Select City and Category and the result will appear here
                </p>
              </div>
            )}
          </div>
          <div className="col-md-8">
            <div className="partner-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.352497199975!2d46.67272585189589!3d24.71477585066977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f02d2621b42dd%3A0xeeb84fa26c695b09!2sOLAYA%20MALL!5e0!3m2!1sen!2sma!4v1656522966843!5m2!1sen!2sma"
                className="w-100 h-100"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationContent;
