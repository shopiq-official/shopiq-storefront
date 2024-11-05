import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  state: "loading",
};

const retainoSlice = createSlice({
  name: "retaino",
  initialState,
  reducers: {
    setReady(state) {
      state.state = "ready";
    },
  },
});

export const { setReady } = retainoSlice.actions;

export default retainoSlice.reducer;
