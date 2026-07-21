import React, { useRef } from "react";
import { FaWallet, FaCoins, FaGift } from "react-icons/fa";

import tether from "../tether.png";
import Airdrop from "./Airdrop";
import StatCard from "./dashboard/StatCard";
import DashboardHeader from "./dashboard/DashboardHeader";
import StakeCard from "./staking/StakeCard";

import { useBlockchain } from "../contexts/BlockchainContext";

import "../styles/staking.css";
import PortfolioHero from "./dashboard/PortfolioHero";
import DashboardCards from "./dashboard/DashboardCards";

const Main = () => {
  const {
    account,
    tetherBalance,
    rwdBalance,
    stakingBalance,
    stakeTokens,
    unstakeTokens,
    transactionStatus,
  } = useBlockchain();

  const inputRef = useRef(null);

  return (
    <div id="content" className="mt-3">
      {/* Dashboard */}

      <div className="container">

        <DashboardHeader />

        <PortfolioHero
          stakingBalance={window.web3.utils.fromWei(
            stakingBalance,
            "Ether"
          )}
          rwdBalance={window.web3.utils.fromWei(
            rwdBalance,
            "Ether"
          )}
        />

        <div className="mb-4">
          <DashboardCards
            account={account}
            stakingBalance={window.web3.utils.fromWei(
              stakingBalance,
              "Ether"
            )}
            rwdBalance={window.web3.utils.fromWei(
              rwdBalance,
              "Ether"
            )}
          />
        </div>
      </div>

      {/* Staking Card */}

      <StakeCard>
        <form
          className="mb-3"
          onSubmit={(event) => {
            event.preventDefault();

            let amount = inputRef.current.value;

            amount = window.web3.utils.toWei(
              amount.toString(),
              "Ether"
            );

            stakeTokens(amount);
          }}
        >
          <h3 className="stake-title">
            Stake Your USDT
          </h3>

          <p className="stake-subtitle">
            Secure your tokens and earn staking rewards.
          </p>

          <p className="balance-text">
            Available Balance{" "}
            <strong>
              {window.web3.utils.fromWei(
                tetherBalance,
                "Ether"
              )}{" "}
              USDT
            </strong>
          </p>

          <div className="stake-input-wrapper">

            <input
              id="stake-amount"
              ref={inputRef}
              type="number"
              className="stake-input"
              placeholder="0.00"
              min="0"
              step="any"
              required
            />

            <div className="stake-token">

              <img
                src={tether}
                alt="USDT"
                className="stake-token-icon"
              />

              <span>USDT</span>

            </div>

          </div>

          <button
            type="submit"
            className="primary-action stake-button"
          >
            Stake Tokens
          </button>
        </form>

        <button
          type="button"
          className="secondary-action"
          onClick={() => unstakeTokens()}
        >
          Withdraw Tokens
        </button>

        <div
          className="text-center mt-4"
          style={{ color: "#3B82F6" }}
        >
          <strong>Airdrop</strong>

          <br />

          <Airdrop stakingBalance={stakingBalance} />
        </div>

        {transactionStatus && (
          <div
            className="text-center mt-4"
            style={{
              color: "#22C55E",
              fontWeight: 600,
            }}
          >
            {transactionStatus}
          </div>
        )}
      </StakeCard>
    </div>
  );
};

export default Main;