import Header from "./user/Client_side/Home_Header.jsx";
import Background from "./user/Client_side/Background.jsx";
import Footer from "./user/Client_side/Home_Footer.jsx";

import Rooms from "./user/Client_side/Rooms.jsx";
import Cottage from "./user/Client_side/Cottage.jsx";
import Contact from "./user/Client_side/Contact.jsx";
import { Outlet } from "react-router-dom";
// import DailyActivities from "./user/Client_side/Activities.jsx";

function Layout() {
  return (
    <>
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
