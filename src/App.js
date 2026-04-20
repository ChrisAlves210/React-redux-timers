import React, { useEffect, useState } from "react";
import TimerBoard from "./components/TimerBoard";
import "./App.css";

const getInitialTheme = () => {
  try {
    return localStorage.getItem("theme") === "dark";
  } catch (e) {
    return false;
  }
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
    try {
      localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    } catch (e) {
      // Ignore storage failures to keep rendering resilient.
    }
  }, [isDarkMode]);

  return React.createElement(
    "div",
    { className: "app-shell" },
    React.createElement(
      "div",
      { className: "app-header" },
      React.createElement("h1", null, "Redux Timer App"),
      React.createElement(
        "button",
        {
          className: "theme-toggle",
          onClick: () => setIsDarkMode((prev) => !prev),
        },
        isDarkMode ? "Switch to Light" : "Switch to Dark"
      )
    ),
    React.createElement(TimerBoard, null)
  );
}

export default App;