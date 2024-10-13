// import { useState } from "react";

export const Check_in = () => {
  // const [rooms, setRoom] = useState([])
  return (
    <>
      <div className="container">
        <form action="">
          <div className="col ">
            <div
              className="mb-3 "
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
                  {/* Check-in: {new Date(checkInDate).toLocaleDateString()} */}
                </p>
                <p className="col">
                  {/* Check-out: {new Date(checkOutDate).toLocaleDateString()} */}
                </p>
              </div>
              <hr />
              <div className="row">
                <p>
                  {/* {guests.adults} Adult{guests.adults !== 1 ? "s" : ""} |{" "}
                  {guests.children} Child{guests.children !== 1 ? "ren" : ""} */}
                </p>
                <p className="col">{/* {cottage.cottagename} */}</p>
                <p className="col">{/* {cottage.price} */}</p>
              </div>
              <hr className="bg-dark" style={{ borderWidth: "3px" }} />
              <div className="row">
                <p className="col">Total:</p>
                <p className="col">{/* {cottage.price} */}</p>
              </div>
              <div className="row">
                <p className="col">50%:</p>
                <p className="col">{/* {fiftyPercentPrice} */}</p>
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">Balace</label>
                <input type="number" className="form-control" />
              </div>
              <button className="btn btn-primary">checkin</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
