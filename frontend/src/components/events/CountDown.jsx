import React, { useEffect, useState } from "react";

const Countdown = ({ endDate }) => {
  const calculateTimeLeft = () => {
    let timeLeft;
    let timeDifference = new Date(endDate).getTime() - Date.now();

    if (timeDifference > 0) {
      let remainingTime = new Date(timeDifference);

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      return (timeLeft = `Time remaining: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`);
    } else {
      return "The end date has already passed.";
    }
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 100000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div>
      <span className=" font-semibold md:font-bold text-xl md:text-2xl ">
        {" "}
        {timeLeft}
      </span>
    </div>
  );
};

export default Countdown;
