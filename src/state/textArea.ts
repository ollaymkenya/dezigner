import { createSlice } from '@reduxjs/toolkit';
import { textData } from './stateData/textData';

export const textAreaSlice = createSlice({
  name: 'textArea',
  initialState: textData,
  reducers: {
    setTextWidth(state, action) {
      state.textWidth = action.payload.textWidth;
    },
    setTextHeight(state, action) {
      state.textHeight = action.payload.textHeight;
    },
    setMessage(state, action) {
      state.message = action.payload.message;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMessage, setTextWidth, setTextHeight } =
  textAreaSlice.actions;
export default textAreaSlice.reducer;
