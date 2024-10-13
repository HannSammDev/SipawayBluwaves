import React from "react";

export const Select_Rooms = ({ availableRooms, guests, checkInDate, checkOutDate }) => {
  console.log("Available Rooms:", availableRooms);

  // Filter rooms that are available
  const filteredRooms = availableRooms.filter(room => room.availability === "not reserved");

  return (
    <>
      <div className="row">
        <div className="col container mt-5" style={{ paddingLeft: "2em" }}>
          <div className="mb-5">
            <h4>AVAILABLE ROOMS</h4>
          </div>
          {filteredRooms.length === 0 ? (
            <p>No available rooms for selected dates.</p>
          ) : (
            filteredRooms.map((room, index) => (
              <div
                key={index}
                style={{
                  width: "700px",
                  padding: "5px",
                  boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 0.1)",
                  marginBottom: "2em",
                }}
                className="row featurette d-flex align-items-center"
              >
                <div className="col-md-5 order-md-1">
                  <img
                    className="img-fluid mx-auto hover-img"
                    src={room.images[0]} // Displaying only the first image for simplicity
                    alt={room.roomname}
                  />
                </div>
                <div className="col-md-7 order-md-2 px-md-5 mb-4">
                  <h4 className="lh-1 mb-4 mt-2">{room.roomname}</h4>
                  <p>{room.description}</p>
                  <p>{"₱" + room.price}</p>
                  <a
                    className="btn btn-sm btn-primary"
                    href={`/guest/${room.id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Select Room
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="col">
          {/* <div
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
              <p className="col">Check-in: {new Date(checkInDate).toLocaleDateString()}</p>
              <p className="col">Check-out: {new Date(checkOutDate).toLocaleDateString()}</p>
            </div>
            <hr />
            <div className="row">
              <p>{guests.adults} Adult{guests.adults !== 1 ? "s" : ""} | {guests.children} Child{guests.children !== 1 ? "ren" : ""}</p>
              <p className="col">Standard Room</p>
              <p className="col">1000 pesos</p>
            </div>
            <hr className="bg-dark" style={{ borderWidth: "3px" }} />
            <div className="row">
              <p className="col">Total:</p>
              <p className="col">00.00</p>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};
