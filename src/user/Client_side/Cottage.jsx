import React, { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { textDB } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
function Cottages() {
  const [cottages, setCottages] = useState([]);
  const [pendings, setPendings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchcottages = async () => {
      try {
        const cottagesCollection = collection(textDB, 'cottages');
        const cottagesnapshot = await getDocs(cottagesCollection);
        const cottageList = cottagesnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCottages(cottageList);
      } catch (error) {
        console.error('Error fetching cottages: ', error);
      }
    };

    fetchcottages();
    fetchPending();
  }, []);

  const fetchPending = async () => {
    try {
      const pendingCollection = collection(textDB, 'Peding');
      const pendingsnapshot = await getDocs(pendingCollection);
      const pendingList = pendingsnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPendings(pendingList);
      console.log('fetch success', pendingList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReserve = (cottage) => {
    navigate('/cottagereserve', { state: cottage });
  };

  return (
    <>
      <div>
        <h2 id="cottages">cottages</h2>
        {cottages.map((cottage, index) => (
          <div className="cards col-md-4" key={cottage.id}>
            <div className="row" style={{ width: '100%' }}>
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
                      aria-current={idx === 0 ? 'true' : 'false'}
                      className={idx === 0 ? 'active' : ''}
                      data-bs-slide-to={idx}
                    ></button>
                  ))}
                </div>
                <div className="carousel-inner">
                  {cottage.images.map((url, idx) => (
                    <div
                      className={`carousel-item ${idx === 0 ? 'active' : ''}`}
                      key={idx}
                    >
                      <img
                        className="d-block w-100 img-fluid"
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
                style={{ textAlign: 'justify', marginLeft: '15px' }}
              >
                <div>
                  <h4>{cottage.cottagename}</h4>
                  {(() => {
                    const cottageAvailability = pendings.find(
                      (avail) => avail.cottagename === cottage.cottagename,
                    );
                    return (
                      cottageAvailability?.availability && (
                        <h6>
                          <Badge bg="warning">
                            {cottageAvailability.availability}
                          </Badge>
                        </h6>
                      )
                    );
                  })()}
                </div>

                <h4 className="btn price">
                  <b>₱ {cottage.price} </b>
                  <span style={{ fontSize: '14px', color: 'grey' }}>
                    {cottage.pricingtype}
                  </span>
                </h4>
                <h5
                  className="fs-6"
                  style={{ color: 'grey', fontFamily: 'arial' }}
                >
                  {cottage.description}
                </h5>
                {cottage.amenities.split(',').map((amenity, i) => (
                  <li key={i}>{amenity}</li>
                ))}
                <button
                  className="btn btn-primary"
                  style={{ float: 'right' }}
                  onClick={() => handleReserve(cottage)}
                  disabled={
                    pendings.find(
                      (available) =>
                        available.cottagename === cottage.cottagename,
                    )?.availability === 'Pending'
                  }
                >
                  {cottage.availability === 'Reserved'
                    ? 'Not Available'
                    : 'Reserve'}
                </button>
              </div>
            </div>
          </div>
        ))}
        <hr />
      </div>

      {/* Add media query for small screens */}
      <style>
        {`
          /* Make carousel inner height responsive */
          .carousel-inner {
            height: auto !important; /* Ensures the height adjusts with content */
          }

          @media (max-width: 344px) {
            .carousel-item img {
              width: 100% !important;
              height: auto !important;
            }
            .carousel-inner {
              width: 100%;
              height: auto !important; /* Adjust height dynamically */
            }
            .cards {
              padding-left: 0;
              padding-right: 0;
            }
          }
        `}
      </style>
    </>
  );
}

export default Cottages;
