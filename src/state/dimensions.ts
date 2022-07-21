import { createSlice } from '@reduxjs/toolkit';
import { DimensionsData } from './stateData/dimensionsData';

export const dimensionsSlice = createSlice({
  name: 'dimensions',
  initialState: {
    dimensions: DimensionsData,
  },
  reducers: {
    setDimensions(state, action) {
      state.dimensions = action.payload.dimensions;
    },
  },
});

export const { setDimensions } = dimensionsSlice.actions;
export default dimensionsSlice.reducer;
