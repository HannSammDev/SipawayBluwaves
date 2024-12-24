import React from "react";
import { Topbar } from "./Admin/TopBar";
import { Side_nav } from "./Admin/Side_Nav";
import { Outlet } from "react-router-dom";

export const Admin_layout = () => {
  return (
    <div className="container-fluid" style={{ height: '100vh' }}>
      <div className="row col d-flex" style={{ height: '100%' }}>
      <Side_nav className="" />
      
       
        <div className="admin-content col" style={{ height: '50em', overflowY: 'auto', overflowX: 'hidden',padding:'0px' }}>
        <Topbar />
          <Outlet  />
        </div>
        
      </div>
    </div>
  );
};
