import React from "react";

import "../Admin/css/Sidenav.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export const Side_nav = () => {
  return (
    <>
      <div className="col-md-2 col-auto min-vh-100 d-flex flex-column justify-content-between p-2 bg-primary border">
        <div>
          <div className="">
            <div className="card-title">
              <h1 className="fs-4"></h1>
            </div>
          </div>
          <hr className="text-white d-none d-sm-inline" />
          <ul className="nav nav-pills flex-column mt-3 mt-sm-0">
           <div className="row p-3">
              <h3></h3>
           </div>
           <hr />
            <li className="nav-item fs-4  py-sm-0 lii">
              <a
                className="nav-link  text-decoration-none fs-5 text-white d-flex align-items-center"
                href="/dash"
                style={{ transition: "all 0.3s ease" }}
              >
                <i className="bi bi-speedometer2 text-white"></i>
                <span className="d-none d-sm-inline ms-2">Dashboard</span>
              </a>
            </li>

            <li className="nav-item dropdown fs-4  py-sm-0 lii">
              <a
                className="nav-link  text-decoration-none fs-5 text-white d-flex align-items-center"
                href="/guestL"
                // id="navbarDropdown"
                role="button"
                // data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ transition: "all 0.3s ease" }}
              >
                <i className="bi bi-people text-white"></i>
                <span className="d-none d-sm-inline ms-2">Guest</span>
              </a>
              {/* <ul className="dropdown-menu bg-dark">
                <li>
                  <a className="dropdown-item text-light" href="#">
                    Guest List
                  </a>
                </li>
                <li>
                  <a className="dropdown-item text-light" href="#">
                    Guest Details
                  </a>
                </li>
              </ul> */}
            </li>

            <li className="nav-item fs-4  py-sm-0 lii">
              <a
                className="nav-link  aa text-decoration-none fs-5 text-white d-flex align-items-center"
                href="/availableroom"
                style={{ transition: "all 0.3s ease" }}
              >
                <i id="ai" className="bi bi-calendar-check ii text-white"></i>
                <span className="d-none d-sm-inline ms-2">Reservation</span>
              </a>
            </li>

            <li className="nav-item dropdown fs-4  py-sm-0 lii">
              <a
                className="nav-link  text-decoration-none fs-5  text-white d-flex align-items-center"
                href="/rooms"
                id="navbarDropdown"
                role="button"
                // data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ transition: "all 0.3s ease" }}
              >
                <i className="bi bi-door-open text-white"></i>
                <span className="d-none d-sm-inline ms-2">Rooms</span>
              </a>
              {/* <ul className="dropdown-menu bg-dark">
                <li>
                  <a className="dropdown-item text-light" href="/roomsdetails">
                    List
                  </a>
                </li>
                <li>
                  <a className="dropdown-item text-light" href="/availableroom">
                    Available
                  </a>
                </li>
              </ul> */}
            </li>

            <li className="nav-item dropdown fs-4  py-sm-0 lii">
              <a
                className="nav-link  text-decoration-none fs-5  text-white d-flex align-items-center"
                href="/Cottage"
                id="navbarDropdown"
                role="button"
                // data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ transition: "all 0.3s ease" }}
              >
                <i className="bi bi-house-door text-white"></i>
                <span className="d-none d-sm-inline ms-2 text-white">Cottages</span>
              </a>
              {/* <ul className="dropdown-menu bg-dark">
                <li>
                  <a
                    className="dropdown-item text-light"
                    href="/availablecottage"
                  >
                    Cottage List
                  </a>
                </li>
              </ul> */}
            </li>

            <li className="nav-item dropdown fs-4  py-sm-0 lii">
              <a
                className="nav-link  text-decoration-none fs-5  text-white d-flex align-items-center"
                href="#"
                id="navbarDropdown"
                roxle="button"
                // data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ transition: "all 0.3s ease" }}
              >
                <i className="bi bi-activity text-white"></i>
                <span className="d-none d-sm-inline ms-2">Activities</span>
              </a>
              {/* <ul className="dropdown-menu bg-dark">
                <li>
                  <a className="dropdown-item text-light" href="#">
                    Activity List
                  </a>
                </li>
              </ul> */}
            </li>

            <li className="nav-item dropdown fs-4  py-sm-0 lii">
              <a
                className="nav-link  text-decoration-none fs-5  text-white d-flex align-items-center"
                href="#"
                id="navbarDropdown"
                role="button"
                // data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ transition: "all 0.3s ease" }}
              >
                <i className="bi bi-cash-stack text-white"></i>
                <span className="d-none d-sm-inline ms-2">Billing</span>
              </a>
              {/* <ul className="dropdown-menu bg-dark">
                <li>
                  <a className="dropdown-item text-light" href="#">
                    Invoice List
                  </a>
                </li>
              </ul> */}
            </li>

            <li className="nav-item dropdown fs-4  py-sm-0 lii">
              <a
                className="nav-link  text-decoration-none fs-5 dropdown-toggle text-white d-flex align-items-center"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ transition: "all 0.3s ease" }}
              >
                <i className="bi bi-person text-white"></i>
                <span className="d-none d-sm-inline ms-2">Staff</span>
              </a>
              {/* <ul className="dropdown-menu bg-dark">
                <li>
                  <a className="dropdown-item text-light" href="#">
                    Staff List
                  </a>
                </li>
              </ul> */}
            </li>

            <li className="nav-item dropdown fs-4  py-sm-0">
              <a
                className="nav-link  text-decoration-none fs-5  text-white d-flex align-items-center"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ transition: "all 0.3s ease" }}
              >
                <i className="bi bi-box-seam text-white"></i>
                <span className="d-none d-sm-inline ms-2">Inventory</span>
              </a>
              {/* <ul className="dropdown-menu bg-dark">
                <li>
                  <a className="dropdown-item text-light" href="#">
                    Inventory List
                  </a>
                </li>
              </ul> */}
            </li>

            <li className="nav-item dropdown fs-4  py-sm-0">
              <a
                className="nav-link  text-decoration-none fs-5 text-white d-flex align-items-center "
                href="#"
                id="navbarDropdown"
                role="button"
                // data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ transition: "all 0.3s ease" }}
              >
                <i className="bi bi-graph-up text-white"></i>
                <span className="d-none d-sm-inline ms-2">Reports</span>
              </a>
              {/* <ul className="dropdown-menu bg-dark">
                <li>
                  <a className="dropdown-item text-light" href="#">
                    Reservation Report
                  </a>
                </li>
              </ul> */}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
