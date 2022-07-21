import { createSlice } from '@reduxjs/toolkit';
import InitialColorData from './stateData/colorData';

export const colorPickerSlice = createSlice({
  name: 'colorPicker',
  initialState: InitialColorData,
  reducers: {
    setDisplayColorPicker(state, action) {
      state.displayColorPicker = action.payload.displayColorPicker;
    },
    setColor(state, action) {
      state.color = action.payload.color;
    },
    setCanvasColor(state, action) {
      state.canvasColor = action.payload.canvasColor;
    },
    setBorderColor(state, action) {
      state.borderColor = action.payload.borderColor;
    },
    setShadowColor(state, action) {
      state.shadowColor = action.payload.shadowColor;
    },
    setColorMode(state, action) {
      state.colorMode = action.payload.colorMode;
    },
    setPosition(state, action) {
      state.position = action.payload.position;
    },
  },
});

export const {
  setDisplayColorPicker,
  setColor,
  setCanvasColor,
  setBorderColor,
  setShadowColor,
  setColorMode,
  setPosition,
} = colorPickerSlice.actions;
export default colorPickerSlice.reducer;
