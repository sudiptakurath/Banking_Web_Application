import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";

function Dashboard() {
  return (
    <React.Fragment>
      <Header />
      <div className="name">Welcome Name</div>
      <div className="lastlogin">Last Login</div>
      <Outlet />
    </React.Fragment>
  );
}

export default Dashboard;
