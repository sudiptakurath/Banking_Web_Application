import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import axios from "axios";

function Dashboard() {
  const [name, setName] = useState("");
  const [lastLogin, setLastLogin] = useState("");
  const currentUserID = 1;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/bank-api/getUserByUserId/${currentUserID}`
      );
      console.log("response", response);
      setName(`${response.data.firstName} ${response.data.lastName}`);
      setLastLogin(response.data.creationDate);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Header />

      <div className="name">Welcome {name}</div>
      <div className="lastlogin">Last Login {lastLogin}</div>

      <Outlet />
    </React.Fragment>
  );
}

export default Dashboard;
