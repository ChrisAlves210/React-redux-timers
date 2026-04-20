import { configureStore } from "@reduxjs/toolkit";
import timersReducer from "../features/timers/TimerSlice";
import { loadState, saveState } from "./localStorage";

const preloadedState = loadState();

export const store = configureStore({
  reducer: { timers: timersReducer },
  preloadedState,
});

store.subscribe(() => {
  const state = store.getState();
  saveState({ timers: state.timers });
});
