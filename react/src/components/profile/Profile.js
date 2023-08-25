import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ShowProfile from "./ShowProfile";
import UpdateProfile from "./UpdateProfile";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const currentUserID = sessionStorage.getItem("userId");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/bank-api/getUserByUserId/${currentUserID}`
      );
      console.log("response", response);

      setProfile(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [showUpdateProfile]);

  return (
    <React.Fragment>
      <section className="header1">
        <h1>Customer Profile</h1>
      </section>
      <Outlet />
      {showUpdateProfile ? (
        <UpdateProfile
          setProfileVisibility={setShowUpdateProfile}
          profile={profile}
        />
      ) : (
        <ShowProfile
          setProfileVisibility={setShowUpdateProfile}
          profile={profile}
        />
      )}
    </React.Fragment>
  );
};

export default Profile;