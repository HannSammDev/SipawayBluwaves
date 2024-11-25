import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { collection, getDocs } from "firebase/firestore";
import { textDB } from "../../../firebase";
import { Container, Row, Col, Card } from "react-bootstrap";

export default function ReservationCalendar() {
  const [reservations, setReservations] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const reservationCollection = collection(textDB, "guestData");
      const reservationsSnapshot = await getDocs(reservationCollection);
      const reservationsList = reservationsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setReservations(reservationsList);
      console.log("Fetched reservations:", reservationsList);

      const eventsList = reservationsList.map((reservation) => ({
        id: reservation.id,
        title: ` ${reservation.cottagename}${reservation.roomname}`,
        start: reservation.checkInDate,
        end: reservation.checkOutDate,
        // backgroundColor: reservation.checkedIn ? "#ff7f7f" : "#1e90ff",
      }));

      setEvents(eventsList);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  return (
    <Container className="mt-2">
      <Row className="jitem-center justify-content-center">
        <Col md={30}>
          <Card
            className="shadow-lg border-0 rounded-3"
            style={{ boxShadow: "0 1rem 3rem rgba(0,0,0,.175)", borderRadius: "1rem" }}
          >
            <Card.Body className="p-5">
              <Card.Title
                className="text-left mb-4 text-dark fs-4 fw-bold"
                // style={{ fontFamily: 'Arial, sans-serif' }}
              >
                Reservation Calendar
              </Card.Title>
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                  start: "today prev,next",
                  center: "title",
                  end: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                height="75vh"
                events={events}
                eventDisplay="block"
                dayMaxEventRows={2}
                views={{
                  dayGrid: {
                    dayMaxEventRows: 2,
                  },
                  timeGrid: {
                    dayMaxEventRows: 6,
                  },
                }}
                eventContent={({ event, el }) => (
                  <div
                    className="bg-warning p-2 rounded-3 shadow-sm text-dark fs-6 fw-bold text-center"
                    style={{color: 'white', textDecoration: 'none' }}
                  >
                    {event.title}
                  </div>
                )}
                eventMouseEnter={(_, el) => {
                  el.style.cursor = 'pointer';
                  el.style.transform = 'scale(1.05)';
                  el.style.transition = 'all 0.2s ease-in-out';
                }}
                eventMouseLeave={(_, el) => {
                  el.style.transform = 'scale(1)';
                }}
                dayCellDidMount={info => {
                  info.el.style.color = '#007bff'; // Custom color for the dates
                }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
