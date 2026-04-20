import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  pauseTimer,
  resumeTimer,
  resetTimer,
  restartTimer,
  renameTimer,
} from "../features/timers/TimerSlice";
import { formatTime } from "../utils/formatTime";

const TimerCard = ({ timer }) => {
  const dispatch = useDispatch();
  const [displayTime, setDisplayTime] = useState(timer.elapsed);
  const [isEditingLabel, setIsEditingLabel] = useState(false);
  const [labelDraft, setLabelDraft] = useState(timer.label);

  useEffect(() => {
    setLabelDraft(timer.label);
  }, [timer.label]);

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
  const handleRestart = () => dispatch(restartTimer(timer.id));
  const handleStartEdit = () => setIsEditingLabel(true);
  const handleCancelEdit = () => {
    setLabelDraft(timer.label);
    setIsEditingLabel(false);
  };
  const handleSaveLabel = () => {
    dispatch(
      renameTimer({
        id: timer.id,
        label: labelDraft || "Untitled Timer",
      })
    );
    setIsEditingLabel(false);
  };
  const handleLabelKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSaveLabel();
    }
    if (event.key === "Escape") {
      handleCancelEdit();
    }
  };

  return React.createElement(
    "div",
    { className: "timer-card" },
    isEditingLabel
      ? React.createElement("input", {
          className: "timer-label-input",
          value: labelDraft,
          autoFocus: true,
          onChange: (event) => setLabelDraft(event.target.value),
          onBlur: handleSaveLabel,
          onKeyDown: handleLabelKeyDown,
          "aria-label": "Edit timer label",
        })
      : React.createElement(
          "h3",
          {
            className: "timer-label",
            onDoubleClick: handleStartEdit,
            title: "Double-click to rename",
          },
          timer.label
        ),
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
    ),
    " ",
    React.createElement(
      "button",
      { onClick: handleRestart },
      "Restart"
    )
  );
};

export default TimerCard;