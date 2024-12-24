import Header from "./user/Client_side/Home_Header.jsx";
import Background from "./user/Client_side/Background.jsx";
import Footer from "./user/Client_side/Home_Footer.jsx";

import Rooms from "./user/Client_side/Rooms.jsx";
import Cottage from "./user/Client_side/Cottage.jsx";
import Contact from "./user/Client_side/Contact.jsx";
import { Outlet } from "react-router-dom";
import { ScrollTop } from 'primereact/scrolltop';
// import DailyActivities from "./user/Client_side/Activities.jsx";

function Layout() {
  return (
    <>
      <ScrollTop className="d-flex justify-content-center align-items-center bg-primary text-white rounded-circle shadow-lg" style={{
        width: '2.5rem', height: '2.5rem'
      }} />
      <Header />
      <Outlet />
      <Background />
      <Cottage />

      <Rooms />
      {/* <DailyActivities/> */}
      <Contact />
      <Footer />

    </>
  );
}
export default Layout;
