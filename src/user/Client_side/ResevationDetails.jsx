import axios from "axios";
import React, { useState, useEffect } from "react";

export const Reservation_Details = () => {
  const [total, setTotal] = useState(0);
  const [mustPay, setMustPay] = useState(0);
  const [pavilionCottage, setPavilionCottage] = useState(0);
  const [largeCottage, setLargeCottage] = useState(0);
  const [smallCottage, setSmallCottage] = useState(0);
  const [picnicTable, setPicnicTable] = useState(0);
  const [proofOfPayment, setProofOfPayment] = useState(null);

  useEffect(() => {
    calculateTotal();
  }, [pavilionCottage, largeCottage, smallCottage, picnicTable]);

  const calculateTotal = () => {
    const pavilionCost = 1500;
    const largeCost = 500;
    const smallCost = 400;
    const picnicCost = 300;

    const pavilionTotal = pavilionCottage * pavilionCost;
    const largeTotal = largeCottage * largeCost;
    const smallTotal = smallCottage * smallCost;
    const picnicTotal = picnicTable * picnicCost;

    const totalAmount = pavilionTotal + largeTotal + smallTotal + picnicTotal;
    const mustPayAmount = totalAmount / 2;

    setTotal(totalAmount);
    setMustPay(mustPayAmount);
  };

  const handleReserv = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("total", total);
    formData.append("mustPay", mustPay);
    formData.append("pavilionCottage", pavilionCottage);
    formData.append("largeCottage", largeCottage);
    formData.append("smallCottage", smallCottage);
    formData.append("picnicTable", picnicTable);
    formData.append("proof_of_payment", proofOfPayment); // Ensure this matches the backend

    axios
      .post("http://localhost:4000/reservation", formData)
      .then((response) => {
        console.log("Response:", response.data);
        window.location.href = "/Reserv";
      })
      .catch((error) => {
        console.error("There was an error making the request:", error);
      });
  };

  return (
    <div className="container d-flex justify-content-center">
      <form
        encType="multipart/form-data"
        className="bg-white p-3 shadow rounded justify-content-center"
        style={{ maxWidth: "800px" }}
        onSubmit={handleReserv}
      >
        <h4 className="text-center mb-5">Reservation Details</h4>
        <div>
          <div className="row g-3 mb-3">
            <ul
              className="list-unstyled col-6"
              style={{ display: "inline-block", textAlign: "left" }}
            >
              <li className="">
                <strong>Pavilion Cottage:</strong>{" "}
                <span style={{ display: "inline-block", width: "100px" }}>
                  Php 1,500
                </span>
                <select
                  name="pavilionCottage"
                  value={pavilionCottage}
                  className="form-select"
                  onChange={(e) => setPavilionCottage(parseInt(e.target.value))}
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </li>
              <li className="">
                <strong>Large Cottage:</strong>{" "}
                <span style={{ display: "inline-block", width: "100px" }}>
                  Php 500
                </span>
                <select
                  name="largeCottage"
                  value={largeCottage}
                  className="form-select"
                  onChange={(e) => setLargeCottage(parseInt(e.target.value))}
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </li>
            </ul>
            <ul className="list-unstyled col-6">
              <li className="">
                <strong>Small Cottage:</strong>{" "}
                <span style={{ display: "inline-block", width: "100px" }}>
                  Php 400
                </span>
                <select
                  name="smallCottage"
                  value={smallCottage}
                  className="form-select"
                  onChange={(e) => setSmallCottage(parseInt(e.target.value))}
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </li>
              <li className="">
                <strong>Picnic Table:</strong>{" "}
                <span style={{ display: "inline-block", width: "100px" }}>
                  Php 300
                </span>
                <select
                  name="picnicTable"
                  value={picnicTable}
                  className="form-select"
                  onChange={(e) => setPicnicTable(parseInt(e.target.value))}
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </li>
            </ul>
          </div>
          <h5 className="text-center mb-3">
            <b>Payment Section</b>
          </h5>
          <div className="row g-3 mb-3">
            <div className="col-6">
              <label htmlFor="total" className="form-label">
                Total
              </label>
              <input
                type="text"
                className="form-control form-control-sm"
                id="total"
                name="total"
                required
                readOnly
                value={`Php ${total}`}
              />
            </div>
            <div className="col-6">
              <label htmlFor="pay_50" className="form-label">
                Must pay 50%
              </label>
              <input
                type="text"
                className="form-control form-control-sm"
                id="pay_50"
                name="pay_50"
                required
                readOnly
                value={`Php ${mustPay}`}
              />
            </div>
          </div>
        </div>
        <div className="row g-3 align-items-center">
          <div className="col-md-6 text-center">
            <img
              src="../img/image.png"
              alt="QR Code"
              className="img-fluid mb-2"
              style={{ maxWidth: "70%" }}
            />
          </div>
          <div className="col-md-6">
            <p
              className="border p-2 mb-2"
              style={{ fontSize: "12px", textAlign: "justify" }}
            >
              Kindly scan the QR code for payment and can also use the GCash
              number and name provided below:
            </p>
            <div className="d-flex mb-2">
              <div className="me-2">
                <label className="form-label" style={{ fontSize: "13px" }}>
                  Gcash No:
                </label>
                <p className="border p-1">0987654321</p>
              </div>
              <div>
                <label className="form-label" style={{ fontSize: "13px" }}>
                  Gcash Name:
                </label>
                <p className="border p-1">Blue Waves</p>
              </div>
            </div>
            <input
              className="form-control form-control-sm mb-2"
              type="file"
              name="proof_of_payment"
              id="proof_of_payment"
              onChange={(event) => setProofOfPayment(event.target.files[0])} // Updated file input handling
              required
            />
          </div>
        </div>
        <div className="text-center">
          <button className="btn btn-primary w-50" type="submit">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};
