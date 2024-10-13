import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/GuestInformation.css";
import axios from 'axios';

const Guest_Information = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [numberOfadult, setNoOfAdults] = useState("");
  const [checkIn, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [numberOfKids, setNumberOfKids] = useState(0);
  const [kidsAges, setKidsAges] = useState(Array(numberOfKids).fill(""));

  const handleNumberOfKidsChange = (e) => {
    const count = parseInt(e.target.value);
    setNumberOfKids(count);
    setKidsAges(Array(count).fill(""));
  };

  const handleKidAgeChange = (index, e) => {
    const ages = [...kidsAges];
    ages[index] = e.target.value;
    setKidsAges(ages);
  };

  const handleGuest = (e) => {
    e.preventDefault();
    axios.post("http://localhost:4000/guest", {
        firstname: firstname,
        lastname: lastname,
        address: address,
        contactNo: contactNo,
        email: email,
        numberOfadult: numberOfadult,
        numberOfKids: numberOfKids,
        kidsAges: kidsAges,
        checkIn: checkIn,
        checkout: checkout
      })
      .then((response) => {
        console.log("Response:", response.data);
        window.location.href = '/Reserv'
      })
      .catch((error) => {
        console.error("There was an error making the request:", error);
      });
  };

  return (
    <div className="hotel-booking">
      <div className="form-container" style={{ marginTop: "9em" }}>
        <form
          encType="multipart/form-data"
          className="bg-white p-4 shadow rounded col"
          style={{ maxWidth: "600px" }}
          onSubmit={handleGuest}
        >
          <div className="row">
            <div className="mb-3">
              <h5 className="mb-3">Guest Information</h5>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="firstName" className="form-label">
                    First Name:
                  </label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="firstName"
                    name="first_name"
                    value={firstname}
                    required
                    onChange={(event) => setFirstname(event.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="lastName" className="form-label">
                    Last Name:
                  </label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="lastName"
                    name="last_name"
                    value={lastname}
                    required
                    onChange={(event) => setLastname(event.target.value)}
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="address" className="form-label">
                    Address:
                  </label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="address"
                    name="address"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="contactNo" className="form-label">
                    Contact No.:
                  </label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="contactNo"
                    value={contactNo}
                    name="contact_no"
                    required
                    onChange={(event) => setContactNo(event.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    className="form-control mb-3"
                    id="email"
                    value={email}
                    name="email"
                    required
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="numberOfAdults" className="form-label">
                    Adults:
                  </label>
                  <input
                    type="number"
                    className="form-control mb-3"
                    id="numberOfAdults"
                    name="number_of_adults"
                    value={numberOfadult}
                    required
                    onChange={(event) => setNoOfAdults(event.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="numberOfKids" className="form-label">
                    Kids:
                  </label>
                  <input
                    type="number"
                    name="numberOfKids"
                    id="numberOfKids"
                    className="form-control mb-3"
                    required
                    value={numberOfKids}
                    onChange={handleNumberOfKidsChange}
                  />
                </div>
                {[...Array(numberOfKids)].map((_, index) => (
                  <div key={index} className="col-md-6">
                    <label
                      htmlFor={`kidAge${index + 1}`}
                      className="form-label"
                    >
                      Age of Kid {index + 1}:
                    </label>
                    <input
                      type="number"
                      className="form-control mb-3"
                      id={`kidAge${index + 1}`}
                      value={kidsAges[index]}
                      onChange={(e) => handleKidAgeChange(index, e)}
                      required
                    />
                  </div>
                ))}
                <div className="col-md-6">
                  <label htmlFor="checkInDate" className="form-label">
                    Check-In Date:
                  </label>
                  <input
                    type="date"
                    className="form-control mb-3"
                    id="checkInDate"
                    name="check_in_date"
                    value={checkIn}
                    required
                    onChange={(event) => setCheckin(event.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="checkOutDate" className="form-label">
                    Check-Out Date:
                  </label>
                  <input
                    type="date"
                    className="form-control mb-3"
                    id="checkOutDate"
                    name="check_out_date"
                    value={checkout}
                    required
                    onChange={(event) => setCheckout(event.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <button className="btn btn-primary w-50" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Guest_Information;
