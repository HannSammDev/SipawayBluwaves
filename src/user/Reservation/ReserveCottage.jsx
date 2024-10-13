import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Headertwo } from "./HeaderTwo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { textDB } from "../../firebase";

export const Guest = () => {
  const location = useLocation();
  const cottage = location.state;
  const navigate = useNavigate();

  const [guests, setGuests] = useState({ adults: 1, children: 0 });
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [specialCode, setSpecialCode] = useState("");

  const [isGuestsExpanded, setIsGuestsExpanded] = useState(false);
  const [isCalendarExpanded, setIsCalendarExpanded] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [guestDetails, setGuestDetails] = useState({
    firstname: "",
    lastname: "",
    phoneNumber: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: ""
  });

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    setCheckInDate(today.toISOString().split("T")[0]);
    setCheckOutDate(tomorrow.toISOString().split("T")[0]);
  }, []);

  const toggleExpanded = (setter) => () => {
    setter((prev) => !prev);
  };

  const updateGuests = (type, action) => () => {
    if (action === "increase") {
      setGuests((prev) => ({
        ...prev,
        [type]: prev[type] + 1,
      }));
    } else if (action === "decrease" && guests[type] > 0) {
      setGuests((prev) => ({
        ...prev,
        [type]: prev[type] - 1,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGuestDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reservationRef = await addDoc(collection(textDB, "reservations"), {
        cottageId: cottage.id,
        guests,
        checkInDate,
        checkOutDate,
        specialCode,
        cottagePrice: cottage.price,
        fiftyPercentPrice: cottage.price * 0.5,
        paymentMethod: "GCash",
        availability: "Pending",
        guestDetails
      });

      console.log("Reservation added with ID: ", reservationRef.id);

      const cottageRef = doc(textDB, "cottages", cottage.id);
      await updateDoc(cottageRef, {
        // availability: "Reserved",
      });

      console.log("Cottage availability updated for cottage ID: ", cottage.id);

      setIsSubmitted(true);
      navigate("/confirmation");
    } catch (error) {
      console.error("Error adding reservation: ", error);
    }
  };

  const fiftyPercentPrice = cottage.price * 0.5;

  return (
    <>
      <Headertwo />
      <div className="container mt-5 justify-content-between">
        <div
          className="card"
          style={{
            maxWidth: "2000px",
            boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 0.1)",
            borderRadius: "5px",
            padding: "1em",
          }}
        >
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-lg-4">
                <div className="dropdown">
                  <button
                    className="btn btn-light border border-dark dropdown-toggle"
                    onClick={toggleExpanded(setIsGuestsExpanded)}
                  >
                    Guests: {guests.adults} Adult
                    {guests.adults !== 1 ? "s" : ""}, {guests.children} Child
                    {guests.children !== 1 ? "ren" : ""}
                  </button>
                  {isGuestsExpanded && (
                    <div className="dropdown-menu p-3 show">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        {["Adults", "Children"].map((type) => (
                          <div key={type}>
                            <label className="me-2">{type}:</label>
                            <div
                              className="btn-group"
                              style={{ marginRight: "1em" }}
                            >
                              <button
                                className="btn btn-light border border-dark"
                                onClick={updateGuests(
                                  type.toLowerCase(),
                                  "decrease"
                                )}
                              >
                                -
                              </button>
                              <span className="btn btn-light border border-dark disabled">
                                {guests[type.toLowerCase()]}
                              </span>
                              <button
                                className="btn btn-light border border-dark"
                                onClick={updateGuests(
                                  type.toLowerCase(),
                                  "increase"
                                )}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {[
                {
                  state: checkInDate,
                  setter: setCheckInDate,
                  label: "Check-in",
                },
                {
                  state: checkOutDate,
                  setter: setCheckOutDate,
                  label: "Check-out",
                },
              ].map(({ state, setter, label }) => (
                <div key={label} className="col-lg-4 mb-3">
                  <button
                    className="btn btn-light border border-dark w-100"
                    onClick={toggleExpanded(setIsCalendarExpanded)}
                  >
                    {label}: {new Date(state).toLocaleDateString()}
                  </button>
                  {isCalendarExpanded && (
                    <div className="mt-2">
                      <label className="form-label">{label} Date:</label>
                      <input
                        type="date"
                        className="form-control"
                        value={state}
                        onChange={(e) => setter(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-md-7">
            <div className="d-flex align-items-center mb-4">
              <a
                className="fs-5"
                style={{ marginRight: "10px" }}
                onClick={() => window.history.back()}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </a>
              <h4>Guest Details</h4>
            </div>
            <form
              onSubmit={handleSubmit}
              style={{
                maxWidth: "2000px",
                boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 0.1)",
                borderRadius: "5px",
                // padding: "1em",
              }}
            >
              <div className="card p-3">
                <div className="mb-3">
                  <div className="row">
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="First Name"
                        name="firstname"
                        value={guestDetails.firstname}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last Name"
                        name="lastname"
                        value={guestDetails.lastname}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="row">
                    <div className="col">
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="Phone Number"
                        name="phoneNumber"
                        value={guestDetails.phoneNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        name="email"
                        value={guestDetails.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Address"
                    name="address"
                    value={guestDetails.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <div className="row">
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="City"
                        name="city"
                        value={guestDetails.city}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="State/Province"
                        name="state"
                        value={guestDetails.state}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="row">
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Postal/ZIP Code"
                        name="zip"
                        value={guestDetails.zip}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Country"
                        name="country"
                        value={guestDetails.country}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-sm col-md-3"
                >
                  Pay with Gcash
                </button>
              </div>
            </form>
          </div>
          <div className="col">
            <div
              className="mb-3"
              style={{
                padding: "3em",
                boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 0.1)",
                maxWidth: "550px",
                marginTop: "2em",
              }}
            >
              <h5 className="">Your Stay</h5>
              <div className="row">
                <p className="col">
                  Check-in: {new Date(checkInDate).toLocaleDateString()}
                </p>
                <p className="col">
                  Check-out: {new Date(checkOutDate).toLocaleDateString()}
                </p>
              </div>
              <hr />
              <div className="row">
                <p>
                  {guests.adults} Adult{guests.adults !== 1 ? "s" : ""} |{" "}
                  {guests.children} Child{guests.children !== 1 ? "ren" : ""}
                </p>
                <p className="col">{cottage.cottagename}</p>
                <p className="col">{cottage.price}</p>
              </div>
              <hr className="bg-dark" style={{ borderWidth: "3px" }} />
              <div className="row">
                <p className="col">Total:</p>
                <p className="col">{cottage.price}</p>
              </div>
              <div className="row">
                <p className="col">50%:</p>
                <p className="col">{fiftyPercentPrice}</p>
              </div>
            </div>

            <div className="card p-3">
              <h5>Policies</h5>
              <p>
                <b>Reservation Policy:</b> Guests must pay 50% of the total
                booking amount in advance to reserve the cottage.
              </p>
              <p>
                <b>Cancellation Policy:</b> No refunds will be issued if guests
                do not show up on the reserved date.
              </p>
              <p>
                <b>Payment Method:</b> GCash
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
