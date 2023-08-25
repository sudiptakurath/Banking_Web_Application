import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

function Header() {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("Accounts");
  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <React.Fragment>
      <header>
        <nav className="main-nav">
          <div className="logo">
            <a href="/bank/accounts">
              <h2>
                <span>Grp 3</span>
                <span>B</span>ank
              </h2>
            </a>
          </div>
          <div className="menu-link">
            <ul>
              <div onClick={() => navigate("/accounts")}>
                <li>Accounts</li>
              </div>
              <div onClick={() => navigate("/kyc")}>
                <li>KYC</li>
              </div>
              <div onClick={() => navigate("/transfer")}>
                <li>Transfer</li>
              </div>
              <div onClick={() => navigate("/statement")}>
                <li>Statement</li>
              </div>
              <div onClick={() => navigate("/profile")}>
                <li>Profile</li>
              </div>
              <div onClick={() => navigate("/contact-us")}>
                <li>ContactUs</li>
              </div>
            </ul>
          </div>
          <div className="social-media">
            <ul className="social-media-desktop">
              <li>
                <a href="/" target="">
                  <LogoutIcon color="primary" fontSize="large" />
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </React.Fragment>
  );
}

export default Header;
