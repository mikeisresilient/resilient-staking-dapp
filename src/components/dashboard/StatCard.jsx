import React from "react";
import CountUpModule from "react-countup";

const CountUp = CountUpModule.default || CountUpModule;

const StatCard = ({
  icon,
  title,
  value,
  subtitle,
  suffix = ""
}) => {
  return (
    <div className="card-modern stat-card">
      <div className="stat-icon">
        {icon}
      </div>

      <div className="stat-title">
        {title}
      </div>

      <div className="stat-value">

        {typeof value === "number" ? (
          <>
            <CountUp
              end={value}
              duration={1.8}
              separator=","
              decimals={value % 1 !== 0 ? 2 : 0}
            />
            {suffix}
          </>
        ) : (
          value
        )}

      </div>

      <div className="stat-subtitle">
        {subtitle}
      </div>
    </div>
  );
};

export default StatCard;