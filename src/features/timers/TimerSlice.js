import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const timerSlice = createSlice({
  name: "timers",
  initialState,
  reducers: {
    addTimer: (state, action) => {
      state.items.push(action.payload);
    },
  },
});

export const { addTimer } = timerSlice.actions;
export default timerSlice.reducer;