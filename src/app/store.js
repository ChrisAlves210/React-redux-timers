import { configureStore } from "@reduxjs/toolkit";
import timersReducer from "../features/timers/TimerSlice";

export const store = configureStore({
  reducer: {
    timers: timersReducer,
  },
});
