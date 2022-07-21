import { configureStore } from '@reduxjs/toolkit';
import toolsPanelReducer from './toolsPanel';
import canvasReducer from './canvas';
import shadowPickerReducer from './shadowPicker';
import colorPickerReducer from './colorPicker';
import dimensionsReducer from './dimensions';
import linePickerReducer from './linePicker';
import textPickerReducer from './textPicker';
import textAreaReducer from './textArea';

const store = configureStore({
  reducer: {
    toolsPanel: toolsPanelReducer,
    textPicker: textPickerReducer,
    canvas: canvasReducer,
    shadowPicker: shadowPickerReducer,
    colorPicker: colorPickerReducer,
    dimensions: dimensionsReducer,
    linePicker: linePickerReducer,
    textArea: textAreaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
