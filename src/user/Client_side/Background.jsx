import React from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

function Background() {
  return (
    <>
      <div className="carousel-container position-relative background">
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          style={{ overflow: "hidden" }}
        >
          {/* Carousel Indicators */}
          <div className="carousel-indicators d-flex  d-sm-block d-none">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className=""
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
              className="active"
              aria-current="true"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
              className=""
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="3"
              aria-label="Slide 4"
              className=""
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="4"
              aria-label="Slide 5"
              className=""
            ></button>
          </div>
          {/* Carousel Inner */}
          <div className="carousel-inner" data-bs-ride="carousel">
            <div className="carousel-item active" style={{ height: "580px" }}>
              <img
                style={{ height: "580px", objectFit: "cover" }}
                src="../img/nice1.jpg"
                className="d-block w-100"
                alt="Slide 1"
              />
            </div>
            <div className="carousel-item" style={{ height: "580px" }}>
              <img
                style={{ height: "580px", objectFit: "cover" }}
                src="../img/nice2.jpg"
                className="d-block w-100"
                alt="Slide 2"
              />
            </div>
            <div className="carousel-item" style={{ height: "580px" }}>
              <img
                style={{ height: "580px", objectFit: "cover" }}
                src="../img/nice3.jpg"
                className="d-block w-100"
                alt="Slide 3"
              />
            </div>
            <div className="carousel-item" style={{ height: "580px" }}>
              <img
                style={{ height: "580px", objectFit: "cover" }}
                src="../img/nice4.jpg"
                className="d-block w-100"
                alt="Slide 4"
              />
            </div>
            <div className="carousel-item" style={{ height: "580px" }}>
              <img
                style={{ height: "580px", objectFit: "cover" }}
                src="../img/nice6.jpg"
                className="d-block w-100"
                alt="Slide 5"
              />
            </div>
          </div>
        </div>

        <div
          className="entrances position-absolute top-0 start-0 border border-dark p-4 text-center"
          style={{
            boxSizing: "border-box",
            marginTop: "18em",
            width: "90%",
            maxWidth: "400px",
            marginLeft: "1em",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 0.9)",
          }}
        >
          <div className="mb-3">
            <button
              className="btn btn-light border border-dark w-100 mb-2"
              data-bs-toggle="modal"
              data-bs-target="#dayUseModal"
              style={{
                maxWidth: "10em",
                borderRadius: "20px",
              }}
            >
              <b>Day Use</b>
            </button>
            <a
              className="btn btn-primary border border-dark w-100 mb-2"
              href="/reserv"
              style={{
                maxWidth: "10em",
                borderRadius: "20px",
              }}
            >
              <b>Overnight Stay</b>
            </a>
          </div>
          <h2 style={{ color: "#000" }}>
            <small>
              <b>Entrance Fee</b>
            </small>
          </h2>
          <hr style={{ height: "2px", backgroundColor: "#000000" }} />
          <div className="entrance d-flex justify-content-around">
            <h6 className="border border-dark p-2">
              <b>50 PESOS per head</b>
            </h6>
            <h6 className="border border-dark p-2">
              <b>20 PESOS per head</b>
            </h6>
          </div>
          <div className="d-flex justify-content-around mt-2">
            <p>Adult</p>
            <p>Kids 7 years below</p>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <ul
        style={{
          marginTop: "13em",
          marginRight: "1em",
        }}
        className="pagination justify-content-end position-absolute top-50 end-0 flex-wrap"
      >
        <a
          style={{
            width: "5em",
            height: "auto",
            padding: "0px",
            margin: "5px",
          }}
          className="page-item page-link"
          href="#carouselExampleIndicators"
          data-bs-slide-to="0"
        >
          <img
            src="../img/nice1.jpg"
            style={{ width: "5em", height: "auto" }}
          />
        </a>
        <a
          style={{
            width: "5em",
            height: "auto",
            padding: "0px",
            margin: "5px",
          }}
          className="page-item page-link"
          href="#carouselExampleIndicators"
          data-bs-slide-to="1"
        >
          <img
            src="../img/nice2.jpg"
            style={{ width: "5em", height: "auto" }}
          />
        </a>
        <a
          style={{
            width: "5em",
            height: "auto",
            padding: "0px",
            margin: "5px",
          }}
          className="page-item page-link"
          href="#carouselExampleIndicators"
          data-bs-slide-to="2"
        >
          <img
            src="../img/nice3.jpg"
            style={{ width: "5em", height: "auto" }}
          />
        </a>
        <a
          style={{
            width: "5em",
            height: "auto",
            padding: "0px",
            margin: "5px",
          }}
          className="page-item page-link"
          href="#carouselExampleIndicators"
          data-bs-slide-to="3"
        >
          <img
            src="../img/nice4.jpg"
            style={{ width: "5em", height: "auto" }}
          />
        </a>
        <a
          style={{
            width: "5em",
            height: "auto",
            padding: "0px",
            margin: "5px",
          }}
          className="page-item page-link"
          href="#carouselExampleIndicators"
          data-bs-slide-to="4"
        >
          <img
            src="../img/nice6.jpg"
            style={{ width: "5em", height: "auto" }}
          />
        </a>
      </ul>
    </>
  );
}

export default Background;
