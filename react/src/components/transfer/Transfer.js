import React from "react";
import { Outlet } from "react-router-dom";
import Button from "@mui/material/Button";
import Beneficiaries from "../Beneficiaries/Beneficiaries";

function Transfer() {
  return (
    <React.Fragment>
      <section className="header1">
        <h1>Money Transfer</h1>
      </section>
      <Outlet />
      <div className="btn-beneficiary">
        <Button variant="contained" href="/add-beneficiaries" size="large" color="info">
          Click to Add Beneficiary
        </Button>
      </div>
      <div className="btn-transfer">
        <Button variant="contained" href="#" size="large" color="info">
          Click to Initiate Transfer
        </Button>
      </div>
    </React.Fragment>
  );
}

export default Transfer;
