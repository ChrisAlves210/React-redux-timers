import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTimer } from "../features/timers/TimerSlice";
import TimerCard from "./TimerCard";

function TimerBoard() {
  const timers = useSelector((state) => state.timers);
  const dispatch = useDispatch();

  const handleAddTimer = () => {
    const label = prompt("Enter a timer label:") || "New Timer";
    dispatch(addTimer(label));
  };

  return React.createElement(
    "div",
    null,
    React.createElement("h2", null, "All Timers"),
    React.createElement(
      "button",
      { onClick: handleAddTimer },
      "Add Timer"
    ),
    React.createElement(
      "div",
      null,
      timers.map((timer) =>
        React.createElement(TimerCard, { key: timer.id, timer })
      )
    )
  );
}

export default TimerBoard;