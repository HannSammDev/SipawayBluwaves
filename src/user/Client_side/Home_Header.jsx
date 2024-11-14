import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const storedUserData = localStorage.getItem("userData");
        const additionalData = storedUserData ? JSON.parse(storedUserData) : {};

        setUser({
          displayName: currentUser.displayName || additionalData.name,
          email: currentUser.email,
          ...additionalData,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("userData"); // Clear user data from local storage
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout Error: ", error);
    }
  };

  return (
    <header id="home">
      <nav
        className="navbar navbar-expand-lg navbar-light fixed-top"
        style={{
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
        }}
      >
        <div className="container-fluid">
          <a
            className="navbar-brand d-flex align-items-center"
            href="#"
            style={{ gap: "10px" }}
          >
            <img
              className="logo me-2"
              src="../img/newlogofinal.png"
              alt="Blue Waves Logo"
              width="60"
            />
            <div className="d-flex flex-column text-start d-none d-sm-block">
              <h5
                className="mb-0 fw-bold"
                style={{ color: "#2c3e50", fontSize: "1.5rem" }}
              >
                BlueWaves Resort
              </h5>
              <small
                className="text-muted"
                style={{ fontSize: "14px", fontWeight: "500" }}
              >
                Brgy. Ermita, Sipaway Island, San Carlos City
              </small>
            </div>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link"
                  style={{ fontWeight: "500", color: "#2c3e50" }}
                  aria-current="page"
                  href="#home"
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  style={{ fontWeight: "500", color: "#2c3e50" }}
                  href="#cottages"
                >
                  Cottages
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  style={{ fontWeight: "500", color: "#2c3e50" }}
                  href="#rooms"
                >
                  Rooms
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="/activity"
                  className="nav-link"
                  style={{ fontWeight: "500", color: "#2c3e50" }}
                >
                  Activities
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ fontWeight: "500", color: "#2c3e50" }}
                >
                  More
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a href="#contact" className="dropdown-item">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/gallery">
                      Photo Gallery
                    </a>
                  </li>
                </ul>
              </li>
            </ul>

            {/* User */}
            {user ? (
              <div className="dropstart ">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="profileDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "10px 15px",
                    backgroundColor: "#f8f9fa",
                  }}
                >
                  <i
                    className="bi bi-person-circle text-black"
                    style={{ marginRight: "8px" }}
                  ></i>{" "}
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="profileDropdown"
                  style={{
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  <li>
                    <a
                      className="dropdown-item"
                      href="/profile"
                      style={{
                        padding: "10px 20px",
                        fontWeight: "500",
                        color: "#495057",
                      }}
                    >
                      <FontAwesomeIcon icon={faSmile} className="" />{" "}
                      <span className="text-dark">
                        {user.name || "My Account"}
                      </span>
                    </a>

                    <a
                      className="dropdown-item"
                      href="/profile"
                      style={{
                        padding: "10px 20px",
                        fontWeight: "500",
                        color: "#495057",
                      }}
                    >
                      <i
                        className="bi bi-person-fill"
                        style={{ marginRight: "8px" }}
                      ></i>{" "}
                      Profile
                    </a>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={handleLogout}
                      style={{
                        padding: "10px 20px",
                        fontWeight: "500",
                        color: "#dc3545",
                      }}
                    >
                      <i
                        className="bi bi-box-arrow-right"
                        style={{ marginRight: "8px" }}
                      ></i>{" "}
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              // -----

              <a className="btn btn-primary" href="/login">
                Sign in
              </a>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
