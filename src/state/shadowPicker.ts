import { createSlice } from '@reduxjs/toolkit';
import InitialState from './stateData/shadowData';

export const shadowPickerSlice = createSlice({
  name: 'shadowPicker',
  initialState: InitialState,
  reducers: {
    setDisplayShadowPicker(state, action) {
      state.displayShadowPicker = action.payload.displayShadowPicker;
    },
    setX(state, action) {
      state.shadowOffsetX = action.payload.shadowOffsetX;
    },
    setY(state, action) {
      state.shadowOffsetY = action.payload.shadowOffsetY;
    },
    setBlur(state, action) {
      state.shadowBlur = action.payload.shadowBlur;
    },
    setColor: (state, action) => {
      state.color = action.payload.color;
    },
  },
});

export const { setDisplayShadowPicker, setX, setY, setBlur, setColor } =
  shadowPickerSlice.actions;
export default shadowPickerSlice.reducer;
