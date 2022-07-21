import { createSlice } from '@reduxjs/toolkit';

import {
  cursors,
  cursorKeys,
} from './stateData/toolsData';

export const toolsPanelSlice = createSlice({
  name: 'toolsPanel',
  initialState: {
    canvasMode: 'Default',
    cursor: cursors.Default,
  },
  reducers: {
    setCanvasMode: (state, action) => {
      state.canvasMode = action.payload.canvasMode;
    },
    setCursor: (state, action) => {
      state.cursor = cursors[action.payload.cursor as cursorKeys];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCanvasMode, setCursor } = toolsPanelSlice.actions;
export default toolsPanelSlice.reducer;
