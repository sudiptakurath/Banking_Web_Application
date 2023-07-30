import React from "react";
import { Outlet } from "react-router-dom";
import "./Contactus.css";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";

function Contactus() {
  return (
    <React.Fragment>
      <section className="header1">
        <h1>Contact Us</h1>
      </section>

      <div className="container-contactus">
        <div className="form-contactus">
          <div className="contactus-info">
            <h3 className="contact-title">Contact US !!!</h3>
            <div className="info">
              <div className="contact-number">
                <MailOutlineIcon />
                <p>www.bank.com</p>
                <p>contact@bank.com</p>
              </div>
              <div className="contact-number">
                <PhoneInTalkIcon />
                <p>1800 11 2018</p>
                <p>1800 1080</p>
              </div>
            </div>
          </div>
          <div className="contactus-about">
            <p className="about-bank">
              Our Bank welcomes you to explore the world of premier banking in
              India. Our commitment to nation-building is complete &
              comprehensive.We have a network that is unmatched in terms of
              reach. We have a network of more than 1600 branches, sales teams
              and processing centers across India.
            </p>
          </div>
        </div>
      </div>

      <Outlet />
    </React.Fragment>
  );
}

export default Contactus;
