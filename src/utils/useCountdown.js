import { useState, useEffect, useCallback } from "react";
import moment from "moment-timezone";

const targetTimezone = "America/Mexico_City";

const useCountdown = (targetDate) => {
  
  const calculateTimeRemaining = useCallback(() => {
    const now = moment().tz(targetTimezone);
    const target = moment.tz(targetDate, targetTimezone);
    const duration = target.diff(now);

    const days = Math.floor(duration / (1000 * 60 * 60 * 24));
    const hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((duration % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }, [targetDate, targetTimezone]);

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining);
    }, 1000);

    return () => clearInterval(interval);
  }, [calculateTimeRemaining]);

  const isFutureDate = moment().tz(targetTimezone).isBefore(moment.tz(targetDate, targetTimezone));

  return { timeRemaining, isFutureDate };
};

export default useCountdown;
