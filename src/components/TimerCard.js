import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  pauseTimer,
  resumeTimer,
  resetTimer,
} from "../features/timers/TimerSlice";
import { formatTime } from "../utils/formatTime";

const TimerCard = ({ timer }) => {
  const dispatch = useDispatch();
  const [displayTime, setDisplayTime] = useState(timer.elapsed);

  useEffect(() => {
    let interval = null;

    if (timer.isRunning) {
      setDisplayTime(Date.now() - timer.startTime + timer.elapsed);
      interval = setInterval(() => {
        const now = Date.now();
        const newElapsed = now - timer.startTime + timer.elapsed;
        setDisplayTime(newElapsed);
      }, 1000);
    } else {
      setDisplayTime(timer.elapsed);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timer.isRunning, timer.startTime, timer.elapsed]);

  const handlePause = () => dispatch(pauseTimer(timer.id));
  const handleResume = () => dispatch(resumeTimer(timer.id));
  const handleReset = () => dispatch(resetTimer(timer.id));

  return React.createElement(
    "div",
    { className: "timer-card" },
    React.createElement("h3", null, timer.label),
    React.createElement(
      "p",
      { title: `${displayTime}ms` },
      "Elapsed Time: ",
      formatTime(displayTime)
    ),
    React.createElement(
      "p",
      null,
      "Status: ",
      timer.isRunning ? "Running" : "Paused"
    ),
    timer.isRunning
      ? React.createElement(
          "button",
          { onClick: handlePause },
          "Pause"
        )
      : React.createElement(
          "button",
          { onClick: handleResume },
          "Resume"
        ),
    " ",
    React.createElement(
      "button",
      { onClick: handleReset },
      "Reset"
    )
  );
};

export default TimerCard;