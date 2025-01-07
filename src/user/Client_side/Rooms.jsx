import React, { useState, useEffect } from 'react';
import { Badge } from 'react-bootstrap';
import { collection, getDocs } from 'firebase/firestore';
import { textDB } from '../../firebase';
import { useNavigate } from 'react-router-dom';

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [status, setStatus] = useState([]);
  const [statustwo, setStatustwo] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomsCollection = collection(textDB, 'rooms');
        const roomSnapshot = await getDocs(roomsCollection);
        const roomList = roomSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRooms(roomList);
      } catch (error) {
        console.error('Error fetching rooms: ', error);
      }
    };

    fetchRooms();
    fetchStatusone();
    fetchStatustwo();
  }, []);

  const fetchStatustwo = async () => {
    try {
      const guestCollection = collection(textDB, 'guestData');
      const guestSnapshot = await getDocs(guestCollection);
      const guestData = guestSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStatustwo(guestData);
      console.log(guestData, 'succes feth peding  ');
    } catch (error) {
      console.log('Error to Fetch availability', error);
    }
  };
  const fetchStatusone = async () => {
    try {
      const reservationCollection = collection(textDB, 'Pending');
      const statusSnapshot = await getDocs(reservationCollection);
      const statusData = statusSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStatus(statusData);
      console.log(statusData, 'succes feth peding  ');
    } catch (error) {
      console.log('Error to Fetch availability', error);
    }
  };
  const handleReserve = (room) => {
    navigate('/guest', { state: room });
  };

  return (
    <div>
      <h2 id="rooms">Rooms</h2>
      {rooms.map((room, index) => (
        <div className="cards col-md-4" key={room.id}>
          <div className="row" style={{ width: '100%' }}>
            {/* Carousel in Card */}
            <div
              id={`roomCarousel${index}`}
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                {room.images.map((image, i) => (
                  <div
                    key={i}
                    className={`carousel-item ${i === 0 ? 'active' : ''}`}
                  >
                    <img
                      src={image}
                      className="d-block w-100"
                      alt={`Room Image ${i + 1}`}
                    />
                  </div>
                ))}
              </div>
              {/* Carousel Indicators */}
              <div className="carousel-indicators">
                {room.images.map((_, idx) => (
                  <button
                    key={idx}
                    data-bs-target={`#roomCarousel${index}`}
                    aria-label={`Slide ${idx + 1}`}
                    aria-current={idx === 0 ? 'true' : 'false'}
                    className={idx === 0 ? 'active' : ''}
                    data-bs-slide-to={idx}
                  ></button>
                ))}
              </div>
              {/* Carousel Controls */}
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target={`#roomCarousel${index}`}
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
                type="button"
                data-bs-target={`#roomCarousel${index}`}
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>

            {/* Room Details */}

            <div
              className="card-body"
              style={{ textAlign: 'justify', marginLeft: '15px' }}
            >
              <div className="">
                <h4>{room.roomname}</h4>
                {(() => {
                  const roomAvailability = status.find(
                    (avail) => avail.roomname === room.roomname,
                  );
                  return (
                    roomAvailability?.availability && (
                      <h6>
                        <Badge bg="warning">
                          {roomAvailability.availability}
                        </Badge>
                      </h6>
                    )
                  );
                })() || // This "or" makes it fall back to the second condition if the first fails
                  (() => {
                    const room_availability = statustwo.find(
                      (avail) => avail.roomname === room.roomname,
                    );
                    return (
                      room_availability?.status && (
                        <h6>
                          <Badge bg="warning">
                            {room_availability.status}
                          </Badge>
                        </h6>
                      )
                    );
                  })()}
              </div>


              <h4 className="btn price  ">
                <b className="me-2">₱ {room.price}</b>

                <span style={{ fontSize: '14px', color: 'grey' }}>
                  {room.pricingtype}
                </span>
              </h4>

              <h5
                className="fs-6"
                style={{ color: 'grey', fontFamily: 'arial' }}
              >
                {room.description}
              </h5>
              <ul>
                {room.amenities.split(',').map((amenity, i) => (
                  <li key={i}>{amenity}</li>
                ))}
              </ul>
              {/* <button
                className="btn btn-primary"
                style={{ float: 'right' }}
                onClick={() => handleReserve(room)}
                disabled={availability.availability === 'Pending'}
              >
                {room.availability === 'Reserved' ? 'Not Available' : 'Reserve'}
              </button> */}
              <button
                className="btn btn-primary"
                style={{ float: 'right' }}
                onClick={() => handleReserve(room)}
                disabled={
                  status.find((avail) => avail.roomname === room.roomname)
                    ?.availability === 'Not Available'
                  ||
                  statustwo.find((avail) => avail.roomname === room.roomname)
                    ?.status === 'Not Available'
                }
              >
                {room.availability === 'Reserved' ? 'Not Available' : 'Reserve'}
              </button>
            </div>
          </div>
        </div>
      ))}
      <hr />
    </div>
  );
}

export default Rooms;
