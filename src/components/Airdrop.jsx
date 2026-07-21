import React, { useState, useEffect, useRef } from 'react';

const Airdrop = ({ stakingBalance }) => {
  const [time, setTime] = useState({});
  const [seconds, setSeconds] = useState(20);
  const timerRef = useRef(null);

  const secondsToTime = (secs) => {
    let hours, minutes, seconds;
    hours = Math.floor(secs / (60 * 60));

    let devisor_for_minutes = secs % (60 * 60);
    minutes = Math.floor(devisor_for_minutes / 60);

    let devisor_for_seconds = devisor_for_minutes % 60;
    seconds = Math.ceil(devisor_for_seconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds,
    };
    return obj;
  };

  const startTimer = () => {
    if (timerRef.current === null && seconds > 0) {
      timerRef.current = setInterval(countDown, 1000);
    }
  };

  const countDown = () => {
    setSeconds((prevSeconds) => {
      const newSeconds = prevSeconds - 1;
      setTime(secondsToTime(newSeconds));
      if (newSeconds === 0) {
        clearInterval(timerRef.current);
      }
      return newSeconds;
    });
  };

  useEffect(() => {
    setTime(secondsToTime(seconds));
  }, []);

  useEffect(() => {
    if (stakingBalance >= '50000000000000000000') {
      startTimer();
    }
  }, [stakingBalance]);

  return (
    <div style={{ color: 'white' }}>
      {time.m}:{time.s}
    </div>
  );
};

export default Airdrop;
