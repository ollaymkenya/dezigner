import { createSlice } from '@reduxjs/toolkit';
import { LineData } from './stateData/lineData';

export const linePickerSlice = createSlice({
  name: 'linePicker',
  initialState: {
    displayLinePicker: false,
    line: LineData,
  },
  reducers: {
    setLine(state, action) {
      state.line = action.payload.line;
    },
    setDisplayLinePicker(state, action) {
      state.displayLinePicker = action.payload.displayLinePicker;
    },
  },
});

export const { setLine, setDisplayLinePicker } = linePickerSlice.actions;
export default linePickerSlice.reducer;
