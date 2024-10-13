import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompress } from "@fortawesome/free-solid-svg-icons";
import { Headertwo } from "../../Reservation/HeaderTwo";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { textDB } from "../../../firebase";

const DailyActivities = () => {
  const [activities, setActivities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState('');

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const activityCollection = collection(textDB, 'activity');
        const activitySnapshot = await getDocs(activityCollection);
        const activityList = activitySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setActivities(activityList);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };
    fetchActivities();
  }, []);

  // Function to handle image expansion
  const handleExpandImage = (image) => {
    setCurrentImage(image);
    setShowModal(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentImage('');
  };

  return (
    <>
      <Headertwo />
      <div className="container my-5" style={{ marginTop: "2rem", marginBottom: "3rem" }}>
        <h2 className="text-center mb-4" style={{ color: "#2c3e50", fontWeight: 700, fontSize: "2.5rem", letterSpacing: "1px" }}>
          Daily Activities
        </h2>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {activities.map((activityItem, index) => (
            <div key={index} className="col d-flex align-items-stretch">
              <div
                className="card shadow-sm h-100"
                style={{
                  borderRadius: "15px",
                  overflow: "hidden",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.1)";
                }}
              >
                {/* Display the First Image */}
                <div className="card-img-top position-relative" style={{ height: "250px" }}>
                  {activityItem.images && activityItem.images[0] ? (
                    <>
                      <img
                        src={activityItem.images[0]}
                        alt={`Image of ${activityItem.activityName}`}
                        className="d-block w-100"
                        style={{ height: "250px", objectFit: "cover" }}
                        loading="lazy"
                      />
                      <button
                        onClick={() => handleExpandImage(activityItem.images[0])}
                        className="btn btn-transparent position-absolute bottom-0 end-0 m-3"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Expand Image"
                        style={{
                          borderRadius: "50%",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                          padding: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <FontAwesomeIcon icon={faCompress} style={{ fontSize: "20px", color: "#ffff" }} />
                      </button>
                    </>
                  ) : (
                    <div className="d-flex justify-content-center align-items-center h-100" style={{ backgroundColor: '#f0f0f0' }}>
                      <p className="text-muted">No Image Available</p>
                    </div>
                  )}
                </div>

                <div className="card-body text-center" style={{ padding: "30px 20px" }}>
                  <h5 className="card-title" style={{ fontWeight: 600, color: "#2c3e50", fontSize: "1.5rem" }}>
                    {activityItem.activityName}
                  </h5>
                  <p className="card-text" style={{ fontSize: "1rem", color: "#7f8c8d", lineHeight: "1.6" }}>
                    {activityItem.writeAnything}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Enlarged Image */}
      <div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex="-1" style={{ display: showModal ? 'block' : 'none', backgroundColor: 'rgba(0,0,0,0.8)' }}>
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
             
              <button type="button" className="btn btn-warning btn-close" onClick={handleCloseModal}></button>
            </div>
            <div className="modal-body p-0">
              <img src={currentImage} alt="Expanded view" className="img-fluid w-100" />
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default DailyActivities;
