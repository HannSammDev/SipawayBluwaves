import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import Layout from "./ClientLayout";

import Login from "./user/Client_side/Login";
import { Register } from "./user/Client_side/Register";
// import { Day_use } from "./user/Client_side/DayUseAvailability";
// import { Overnight } from "./user/Client_side/Overnight";
// import ReservationDetails from "./Client_side/GuesrInfo";
// import UserDashboard from "./Client_side/Userdashboard";
// import { Reservation_Details } from "./Client_side/ResevationDetails";
// import { Gallery } from "./Client_side/Galery";
import { Rooms_Info } from "./user/Reservation/Rooms Details";
// import { GuestInfo } from "./user/Reservation/GuestInfo";
import { Side_nav } from "./Admin/Side_Nav";

import { Dashboard } from "./Admin/Dashboard/dashborad";
import { Admin_layout } from "./AdminLayout";
import { Addrooms } from "./Admin/RoomManagement/Addrooms";
import { RoomDetails } from "./Admin/RoomManagement/RoomsDetails";
import OccupiedRooms from "./Admin/Reservation_Management/RoomOccupied";
import { Admin_Login } from "./Admin/Login/Login";
import { EditRoom } from "./Admin/RoomManagement/EditRoom";
import { Available_rooms } from "./Admin/RoomManagement/AvailableRoom";
import AvailableRooms from "./user/Reservation/AvailableRooms";
import { AddCottages } from "./Admin/CottageManagement/Addcottage";
import { Available_cottages } from "./Admin/CottageManagement/AvailableCottages";
import { CottageDetails } from "./Admin/CottageManagement/CottageDetails";

import { GuestInfo } from "./user/Reservation/ReserveRoom";
import { Guest } from "./user/Reservation/ReserveCottage";
import DailyActivities from "./user/Client_side/css/Activities";
import { Registeradmin } from "./Admin/Login/Register";
import DailyActivitiesForm from "./Admin/Manage_activities/AddActivity";
import AdminActivityForm from "./Admin/Manage_activities/AddActivity";
import { EditCottage } from "./Admin/CottageManagement/Editicottage";
import { Check_in } from "./Admin/RoomManagement/Checkin";
import { Guest_List } from "./Admin/GuestM/GuestL";
import Reservation from "./Admin/Reservation_Management/reservations";

// import ReservationConfirmation from "./user/Client_side/Userdashboard";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        
        <Route path="/signup" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      {/* <Route path="/" element={<TestimonialPage />}>
        <Route path="/testimonail" element={<Testimonials />} />
      </Route> */}
      
      <Route path="/activity"   element={<DailyActivities/>}/>
      <Route path="/reserv" element={<Rooms_Info />} />
      <Route path="/guest" element={<GuestInfo/>} />
      <Route path="/cottagereserve" element={<Guest/>} />
     <Route path="/ava" element={<AvailableRooms/>} />



      {/* --------------Admin--------------------- */}

      <Route path="/radmin" element= {<Registeradmin/> }/>
      <Route path="/adminlogin" element={<Admin_Login/>} / >
      
      <Route  element={<Admin_layout/>}>

        <Route path="/dash" element={<Dashboard/>}/>
        {/* Room Management */}
        <Route path="/addroom" element={<Addrooms/>}/>
        <Route path="/roomsdetails" element={<RoomDetails/>} />
        <Route path="/occupied" element={<OccupiedRooms/>} />
        <Route path="/editroom/:id" element={<EditRoom/>} />
        <Route path="/rooms" element={<Available_rooms/>} />
        <Route path="/checkin/:id" element={<Check_in/>}/>

        {/* Cottage Management */}
        <Route path="/addcottage" element={<AddCottages/>} />
        <Route path="/cottageslist" element={<CottageDetails/>} />
        <Route path="/Cottage" element={<Available_cottages/>} />
        <Route path ='/editcottage/:id' element= {<EditCottage/>}/>

        {/* GuestM */}
        <Route path='/guestL' element={<Guest_List/>}/>
        
        {/* Activities */}
        <Route path="/activityF" element={<AdminActivityForm/>} />
        {/* Reservation */}
        <Route path="/reservatioms" element={<Reservation/>} />

        {/* ---------------- */}
        <Route path="/radmin" element={Registeradmin} />

      </Route>
    </Routes>

  </Router>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
