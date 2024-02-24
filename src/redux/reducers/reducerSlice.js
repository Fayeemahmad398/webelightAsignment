import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  loading: false,
  data: [],
  dataOfCommits: [],
};

export const reducerSlice = createSlice({
  name: "ManageAllRepoes",
  initialState,
  reducers: {
    SetMostStaredRepoes: (state, action) => {
      state.data = [...state.data, ...action.payload];
    },
    setGraphData: (state, action) => {
      state.dataOfCommits = action.payload;
    },

    setLoader: (state, action) => {
      state.loading = action.payload;
    },

    clearPrevData: (state) => {
      state.data = [];
    },
  },
});

export const { SetMostStaredRepoes, setLoader, clearPrevData ,setGraphData} =
  reducerSlice.actions;

export default reducerSlice.reducer;
