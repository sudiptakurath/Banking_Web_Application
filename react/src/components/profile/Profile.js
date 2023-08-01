import React from "react";
import { Outlet } from "react-router-dom";

function Profile() {
  return (
    <React.Fragment>
      <section className="header1">
        <h1>Customer Profile</h1>
      </section>
      <Outlet />
    </React.Fragment>
  );
}

export default Profile;
