import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";

const ShowProfile = (props) => {
  const updateProfile = () => {
    props.setProfileVisibility(true);
  };

  return (
    <React.Fragment>
      <div className="">
        <table className="">
          <tr>
            <th>Customer First Name</th>
            <th>Customer Last Name</th>
            <th>Address</th>
            <th>City</th>
            <th>Email ID</th>
            <th>Mobile Number</th>
          </tr>

          <tr>
            <td>{props.profile.firstName}</td>
            <td>{props.profile.lastName}</td>
            <td>{props.profile.address}</td>
            <td>{props.profile.city}</td>
            <td>{props.profile.email}</td>
            <td>{props.profile.contactNum}</td>
          </tr>
        </table>
      </div>

      <div className="btn-profile">
        <Button
          onClick={updateProfile}
          variant="contained"
          size="large"
          color="info"
        >
          Update Profile
        </Button>
      </div>
    </React.Fragment>
  );
};

export default ShowProfile;
