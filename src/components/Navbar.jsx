import React from "react";
import bank from "../bank.png";
import "./Navbar.css";

const Navbar = ({ account, onConnect, onDisconnect }) => {
  const isConnected = Boolean(account);

  const shortAccount =
    account && account.length > 10
      ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
      : "";

  return (
    <nav className="navbar-modern">
      <div className="container-fluid navbar-inner">

        {/* Brand */}
        <span className="navbar-brand-modern">
          <img
            src={bank}
            alt="Resilient Stake logo"
          />

          <span>Resilient Stake</span>
        </span>

        {/* Wallet Section */}
        <div className="wallet-section">

          {isConnected ? (
            <>
              <span className="connection-status connected">
                <span className="status-dot"></span>
                Connected
              </span>

              <div className="wallet-pill">
                {shortAccount}
              </div>

              <button
                type="button"
                className="disconnect-button"
                onClick={onDisconnect}
              >
                Disconnect
              </button>
            </>
          ) : (
            <>
              <span className="connection-status disconnected">
                <span className="status-dot"></span>
                Not Connected
              </span>

              <button
                type="button"
                className="connect-button"
                onClick={onConnect}
              >
                Connect Wallet
              </button>
            </>
          )}

        </div>

      </div>
    </nav>
  );
};

export default Navbar;