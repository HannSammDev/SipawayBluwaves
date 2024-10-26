import React from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

export const Side_nav = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="col-md-2 col-auto min-vh-100 d-flex flex-column justify-content-between p-2 bg-primary border">
      <div>
        <div className="card-title">
          <h1 className="fs-4"></h1>
        </div>
        <hr className="text-white d-none d-sm-inline" />
        <ul className="nav nav-pills flex-column mt-3">
          <div className="row p-3">
            <h3></h3>
          </div>
          <hr />

          <li>
            <Link
              to="/dash"
              className={`text-white fs-5 d-flex nav-link text-decoration-none px-3 py-2  align-items-center ${
                pathname === "/dash" ? "active text-dark bg-dark " : ""
              }`}
            >
              <i className="bi bi-speedometer2"></i>
              <span className="ms-2">Dashboard</span>
            </Link>
          </li>

          <li>
            <Link
              to="/guestL"
              className={`text-white fs-5 d-flex nav-link text-decoration-none px-3 py-2  align-items-center ${
                pathname === "/guestL" ? "active text-dark bg-dark " : ""
              }`}
            >
              <i className="bi bi-people"></i>
              <span className="ms-2">Guest</span>
            </Link>
          </li>

          <li>
            <Link
              to="/reservatioms"
              className={`text-white fs-5 d-flex nav-link text-decoration-none px-3 py-2  align-items-center ${
                pathname === "/availableroom" ? "active text-dark bg-dark " : ""
              }`}
            >
              <i className="bi bi-calendar-check"></i>
              <span className="ms-2">Reservation</span>
            </Link>
          </li>

          <li>
            <Link
              to="/rooms"
              className={`text-white fs-5 d-flex nav-link text-decoration-none px-3 py-2  align-items-center ${
                pathname === "/rooms" ? "active text-dark bg-dark " : ""
              }`}
            >
              <i className="bi bi-door-open"></i>
              <span className="ms-2">Rooms</span>
            </Link>
          </li>

          <li>
            <Link
              to="/Cottage"
              className={`text-white fs-5 d-flex nav-link text-decoration-none px-3 py-2  align-items-center ${
                pathname === "/Cottage" ? "active text-dark bg-dark " : ""
              }`}
            >
              <i className="bi bi-house-door"></i>
              <span className="ms-2">Cottages</span>
            </Link>
          </li>

          <li>
            <Link
              to="/billing"
              className={`text-white fs-5 d-flex nav-link text-decoration-none px-3 py-2  align-items-center ${
                pathname === "/billing" ? "active text-dark bg-dark " : ""
              }`}
            >
              <i className="bi bi-cash-stack"></i>
              <span className="ms-2">Billing</span>
            </Link>
          </li>

          <li>
            <Link
              to="/staff"
              className={`text-white fs-5 d-flex nav-link text-decoration-none px-3 py-2  align-items-center ${
                pathname === "/staff" ? "active text-dark bg-dark " : ""
              }`}
            >
              <i className="bi bi-person"></i>
              <span className="ms-2">Staff</span>
            </Link>
          </li>

          <li>
            <Link
              to="/inventory"
              className={`text-white fs-5 d-flex nav-link text-decoration-none px-3 py-2  align-items-center ${
                pathname === "/inventory" ? "active text-dark bg-dark " : ""
              }`}
            >
              <i className="bi bi-box-seam"></i>
              <span className="ms-2">Inventory</span>
            </Link>
          </li>

          <li>
            <Link
              to="/reports"
              className={`text-white fs-5 d-flex nav-link text-decoration-none px-3 py-2  align-items-center ${
                pathname === "/reports" ? "active text-dark bg-dark " : ""
              }`}
            >
              <i className="bi bi-graph-up"></i>
              <span className="ms-2">Reports</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
