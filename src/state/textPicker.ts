import { createSlice } from '@reduxjs/toolkit';
import { textData } from './stateData/textPickerData';

export const editorsPanelSlice = createSlice({
  name: 'editorsPanel',
  initialState: textData,
  reducers: {
    setX(state, action) {
      state.x = action.payload.x;
    },
    setY(state, action) {
      state.y = action.payload.y;
    },
    setWidth(state, action) {
      state.width = action.payload.width;
    },
    setHeight(state, action) {
      state.height = action.payload.height;
    },
    setFontFamily(state, action) {
      state.fontFamily = action.payload.fontFamily;
    },
    setFontWeight(state, action) {
      state.fontWeight = action.payload.fontWeight;
    },
    setFontStyle(state, action) {
      state.fontStyle = action.payload.fontStyle;
    },
    setFontFace(state, action) {
      state.fontFace = action.payload.fontFace;
    },
    setFontSize(state, action) {
      state.fontSize = action.payload.fontSize;
    },
    setFillOrStroke(state, action) {
      state.fillOrStroke = action.payload.fillOrStroke;
    },
    setTextBaseline(state, action) {
      state.textBaseline = action.payload.textBaseline;
    },
    setTextAlign(state, action) {
      state.textAlign = action.payload.textAlign;
    },
    setColor(state, action) {
      state.color = action.payload.color;
    },
    setOffsetShadowX(state, action) {
      state.offsetShadowX = action.payload.offsetShadowX;
    },
    setOffsetShadowY(state, action) {
      state.offsetShadowY = action.payload.offsetShadowY;
    },
    setShadowBlur(state, action) {
      state.shadowBlur = action.payload.shadowBlur;
    },
    setShadowColor(state, action) {
      state.shadowColor = action.payload.shadowColor;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setX,
  setY,
  setWidth,
  setHeight,
  setFontFamily,
  setFontWeight,
  setFontStyle,
  setFontSize,
  setFontFace,
  setFillOrStroke,
  setTextBaseline,
  setTextAlign,
  setColor,
  setOffsetShadowX,
  setOffsetShadowY,
  setShadowBlur,
  setShadowColor,
} = editorsPanelSlice.actions;
export default editorsPanelSlice.reducer;
