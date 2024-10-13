import React, { useState, useEffect } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { textDB } from "../../firebase";
import { useNavigate } from "react-router-dom";

function Cottages() {
  const [cottages, setCottages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchcottages = async () => {
      try {
        const cottagesCollection = collection(textDB, "cottages");
        const cottagesnapshot = await getDocs(cottagesCollection);
        const cottageList = cottagesnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCottages(cottageList);
      } catch (error) {
        console.error("Error fetching cottages: ", error);
      }
    };

    fetchcottages();
  }, []);

  const handleReserve = (cottage) => {
    navigate("/cottagereserve", { state: cottage });
  };

  return (
    <>
      <div>
        <h2 id="cottages">cottages</h2>
        {cottages.map((cottage, index) => (
          <div className="cards col-md-4" key={cottage.id}>
            <div className="row" style={{ width: "100%" }}>
              <div
                id={`carousel${index}`}
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-indicators">
                  {cottage.images.map((_, idx) => (
                    <button
                      key={idx}
                      data-bs-target={`#carousel${index}`}
                      aria-label={`Slide ${idx + 1}`}
                      aria-current={idx === 0 ? "true" : "false"}
                      className={idx === 0 ? "active" : ""}
                      data-bs-slide-to={idx}
                    ></button>
                  ))}
                </div>
                <div className="carousel-inner">
                  {cottage.images.map((url, idx) => (
                    <div
                      className={`carousel-item ${idx === 0 ? "active" : ""}`}
                      key={idx}
                    >
                      <img
                        className="image d-block w-100"
                        src={url}
                        alt={`Slide ${idx + 1}`}
                      />
                    </div>
                  ))}
                </div>
                <button
                  className="carousel-control-prev"
                  data-bs-target={`#carousel${index}`}
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  data-bs-target={`#carousel${index}`}
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
              <div
                className="card-body"
                style={{ textAlign: "justify", marginLeft: "15px" }}
              >
                <h4>{cottage.cottagename}</h4>
                <h4 className="btn price">
                  <b>₱ {cottage.price} </b>
                </h4>
                <h5
                  className="fs-6"
                  style={{ color: "grey", fontFamily: "arial" }}
                >
                  {cottage.description}
                </h5>
                {cottage.amenities.split(",").map((amenity, i) => (
                  <li key={i}>{amenity}</li>
                ))}
                <button
                  className="btn btn-primary"
                  style={{ float: "right" }}
                  onClick={() => handleReserve(cottage)}
                  disabled={cottage.availability === "Reserved"}
                >
                  {cottage.availability === "Reserved"
                    ? "Not Available"
                    : "Reserve"}
                </button>
              </div>
            </div>
          </div>
        ))}
        <hr />
      </div>
    </>
  );
}export default Cottages;
