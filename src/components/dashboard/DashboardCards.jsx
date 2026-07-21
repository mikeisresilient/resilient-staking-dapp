import React from "react";
import { FaWallet, FaCoins, FaGift } from "react-icons/fa";
import StatCard from "./StatCard";

const DashboardCards = ({
  account,
  stakingBalance,
  rwdBalance,
}) => {
  return (
    <div className="row g-4">

      <div className="col-lg-4 col-md-6 d-flex">
        <StatCard
          icon={<FaCoins color="#3B82F6" />}
          title="Total Staked"
          value={Number(stakingBalance)}
          suffix=" USDT"
          subtitle="Currently Locked"
        />
      </div>

      <div className="col-lg-4 col-md-6 d-flex">
        <StatCard
          icon={<FaGift color="#F59E0B" />}
          title="Reward Balance"
          value={Number(rwdBalance)}
          suffix=" RWD"
          subtitle="Available Rewards"
        />
      </div>

      <div className="col-lg-4 col-md-12 d-flex">
        <StatCard
          icon={<FaWallet color="#22C55E" />}
          title="Wallet"
          value={
            account
              ? `${account.slice(0, 8)}...${account.slice(-6)}`
              : "Not Connected"
          }
          subtitle="Connected"
        />
      </div>

    </div>
  );
};

export default DashboardCards;