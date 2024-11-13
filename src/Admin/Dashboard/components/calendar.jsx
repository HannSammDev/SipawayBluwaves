import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import "primereact/resources/themes/saga-blue/theme.css"; 
import "primereact/resources/primereact.min.css";         
// import "primeicons/primeicons.css";                       

export default function ReservationCalendar() {
  const [date, setDate] = useState(null);

  return (
    <div className="card flex justify-content-center">
      <Calendar
        value={date}
        onChange={(e) => setDate(e.value)}
        inline
        showWeek
      />
    </div>
  );
}
