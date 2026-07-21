import React from "react";
import bank from "../bank.png";
import "./Navbar.css";

const Navbar = ({ account }) => {
  const shortAccount =
    account && account.length > 10
      ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
      : "Not Connected";

  return (
    <nav className="navbar-modern navbar navbar-expand-lg">
      <div className="container-fluid">

        <span className="navbar-brand-modern">
          <img
            src={bank}
            alt="logo"
            width="42"
          />

          <span>Resilient Stake</span>
        </span>

        <div className="wallet-section">

          <span className="connection-status">
            <span className="status-dot"></span>
            Connected
          </span>

          <div className="wallet-pill">
            {shortAccount}
          </div>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;