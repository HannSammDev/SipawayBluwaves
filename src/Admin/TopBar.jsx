import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { faCommentDots, faEnvelope, faBell, faCog, faDoorOpen } from "@fortawesome/free-solid-svg-icons";

export const Topbar = () => {
  const styles = {
    navbar: {
      padding: "0.5rem 1rem",
      backgroundColor: "#007bff",
      zIndex: 1000,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
    },
    logo: {
      width: "50px",
    },
    icon: {
      fontSize: "1.5rem",
      color: "#ffffff",
      marginRight: "0.75rem",
    },
    profileImage: {
      width: "35px",
      height: "35px",
    },
    dropdownToggle: {
      color: "#ffffff",
    },
    dropdownMenu: {
      padding: "5px",
    },
    /* Small screens */
    smallScreen: {
      logo: {
        width: "40px",
      },
      icon: {
        fontSize: "1.2rem",
      },
      profileImage: {
        width: "30px",
        height: "30px",
      },
      dropdownToggle: {
        fontSize: "0.9rem",
      },
    },
    /* Very small screens */
    verySmallScreen: {
      navbar: {
        flexDirection: "column",
        alignItems: "flex-start",
      },
      containerFluid: {
        flexDirection: "column",
        alignItems: "center",
      },
      icon: {
        fontSize: "1rem",
        margin: "0.3rem",
      },
      profile: {
        flexDirection: "row",
      },
      profileImage: {
        width: "25px",
        height: "25px",
      },
      dropdownToggle: {
        fontSize: "0.8rem",
      },
    },
  };

  // Helper function to determine current style based on screen width
  const getResponsiveStyles = () => {
    if (window.innerWidth <= 576) {
      return styles.verySmallScreen;
    } else if (window.innerWidth <= 768) {
      return styles.smallScreen;
    }
    return {};
  };

  const responsiveStyles = getResponsiveStyles();

  return (
    <nav className="navbar container-fluid bg-light border border " style={{ ...styles.navbar, ...responsiveStyles.navbar ,  boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.2)",}}>
      <div className="container-fluid d-flex justify-content-between align-items-center flex-wrap" style={responsiveStyles.containerFluid}>
        <div className="d-flex align-items-center">
          <img
            className="me-2 logo"
            style={{ ...styles.logo, ...responsiveStyles.logo }}
            src="../img/newlogofinal.png"
            alt="Logo"
          />
        </div>

        <div className="d-flex align-items-center mt-2 mt-md-0 col-12 col-md-auto justify-content-md-end">
          <FontAwesomeIcon
            icon={faCommentDots}
            className="icon"
            style={{ ...styles.icon, ...responsiveStyles.icon }}
          />
          <FontAwesomeIcon
            icon={faEnvelope}
            className="icon"
            style={{ ...styles.icon, ...responsiveStyles.icon }}
          />
          <FontAwesomeIcon
            icon={faBell}
            className="icon"
            style={{ ...styles.icon, ...responsiveStyles.icon }}
          />

          <div className="d-flex align-items-center profile ms-2" style={responsiveStyles.profile}>
            <img
              src="../img/profile.png"
              alt="Profile"
              className="me-2 rounded-circle"
              style={{ ...styles.profileImage, ...responsiveStyles.profileImage }}
            />
            <div className="dropdown">
              <span
                type="span"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                className="text-dark dropdown-toggle"
                style={{ ...styles.dropdownToggle, ...responsiveStyles.dropdownToggle }}
              >
                Hann Samm Beleganio
              </span>
              <ul className="dropdown-menu" style={styles.dropdownMenu}>
                <li>
                  <a className="dropdown-item" href="#">
                    <FontAwesomeIcon icon={faCog} /> Setting
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <FontAwesomeIcon icon={faDoorOpen} /> Log out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
