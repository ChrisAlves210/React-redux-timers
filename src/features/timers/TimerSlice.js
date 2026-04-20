import { createSlice } from "@reduxjs/toolkit";
import { createTimer } from "./createTimer";

const timersSlice = createSlice({
  name: "timers",
  initialState: [],
  reducers: {
    addTimer: (state, action) => {
      state.push(createTimer(action.payload));
    },
    pauseTimer: (state, action) => {
      const timer = state.find((t) => t.id === action.payload);
      if (timer && timer.isRunning) {
        timer.elapsed += Date.now() - timer.startTime;
        timer.isRunning = false;
      }
    },
    resumeTimer: (state, action) => {
      const timer = state.find((t) => t.id === action.payload);
      if (timer && !timer.isRunning) {
        timer.startTime = Date.now();
        timer.isRunning = true;
      }
    },
    resetTimer: (state, action) => {
      const timer = state.find((t) => t.id === action.payload);
      if (timer) {
        timer.elapsed = 0;
        timer.startTime = Date.now();
        timer.isRunning = false;
      }
    },
  },
});

export const { addTimer, pauseTimer, resumeTimer, resetTimer } =
  timersSlice.actions;
export default timersSlice.reducer;