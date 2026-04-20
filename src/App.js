import React from "react";
import TimerBoard from "./components/TimerBoard";
import "./App.css";

function App() {
  return React.createElement(
    "div",
    null,
    React.createElement("h1", null, "Redux Timer App"),
    React.createElement(TimerBoard, null)
  );
}

export default App;