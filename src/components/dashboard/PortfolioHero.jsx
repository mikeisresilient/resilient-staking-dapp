import React from "react";

const PortfolioHero = ({ stakingBalance, rwdBalance }) => {
  const staked = Number(stakingBalance || 0);
  const rewards = Number(rwdBalance || 0);

  const total = staked + rewards;

  return (
    <div className="portfolio-hero">

      <p className="hero-label">
        Portfolio Overview
      </p>

      <h2 className="hero-value">
        {total.toLocaleString()} Tokens
      </h2>

      <p className="hero-description">
        Your staking portfolio at a glance
      </p>

    </div>
  );
};

export default PortfolioHero;