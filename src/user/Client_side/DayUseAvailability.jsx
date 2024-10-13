import React from "react";


export const Day_use = () => {
  return (
    <>

      <div className="container-fluid">
     
        <div className="justify-content-center">
          <div
            style={{ marginTop: "3em", marginBottom: "2em" }}
            className="container-fluid"
          >
            <div className="container">
              <h3
                style={{ fontFamily: "sans-serif" }}
                className="text-center py-4"
              >
                "For Day Guest Cottage"
              </h3>
              <div className="row featurette d-flex align-items-center">
                <div
                  style={{
                    boxShadow: "black",
                    boxSizing: "border-box",
                    boxShadow: "10cm",
                  }}
                  className="col-md-6 order-md-1"
                >
                  <img
                    className="img-fluid mx-auto hover-img"
                    src="../img/pavillion.jpg"
                    alt="Pavillion Cottage"
                  />
                </div>
                <div className="col-md-6 order-md-2 px-md-5 mb-4">
                  <h2 className="lh-1 mb-4 mt-2">Pavillion Cottage</h2>
                  <p>"Only ₱1,500, good for a maximum of 20 to 30 persons."</p>
                  <a
                    className="btn btn-sm  btn-primary"
                    href="/login"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Book Now
                  </a>
                </div>
              </div>

              {/* <div className="row featurette d-flex align-items-center">
                <div className="col-md-6 order-md-1">
                  <img
                    className="img-fluid mx-auto hover-img"
                    src="../img/tworooms.jpg"
                    alt="1 Family Room"
                  />
                </div>
                <div className="col-md-6 order-md-2 px-md-5 mb-4">
                  <h2 className="lh-1 mb-4 mt-2">1 Family Room</h2>
                  <p>
                    "Offering at ₱6,000, accommodating up to 5 persons. An
                    additional charge of ₱100 per head is applicable for up to
                    10 additional persons. Our package encompasses complimentary
                    karaoke, utensils, rice cooker, water, gasul, and an ensuite
                    bathroom within the room. Maximum occupancy limited to 15
                    persons."
                  </p>
                  <a
                    className="btn btn-sm  btn-primary"
                    href="/login"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Book Now
                  </a>
                </div>
              </div> */}
              {/* <div className="row featurette d-flex align-items-center">
                <div className="col-md-6 order-md-1">
                  <img
                    className="img-fluid mx-auto hover-img"
                    src="../img/tworooms.jpg"
                    alt="Two Rooms"
                  />
                </div>
                <div className="col-md-6 order-md-2 px-md-5 mb-4">
                  <h2 className="lh-1 mb-4 mt-2">Two Rooms</h2>
                  <p>
                    "₱1,200 per person, designed for 4 individuals. Each room
                    features a double deck bed and air conditioning."
                  </p>
                  <a
                    className="btn btn-sm  btn-primary"
                    href="/login"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Book Now
                  </a>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
