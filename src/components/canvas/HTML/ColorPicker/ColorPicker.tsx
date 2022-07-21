import React from 'react';
import { ChromePicker, ColorResult } from 'react-color';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../state/store';

import './ColorPicker.css';

import {
  setColor,
  setCanvasColor,
  setDisplayColorPicker,
  setBorderColor,
  setShadowColor,
} from '../../../../state/colorPicker';
import { setSelectedElement, updateElement } from '../../../../state/canvas';

const ColorPicker: React.FC = () => {
  const { color, shadowColor, canvasColor, colorMode, displayColorPicker, position } =
    useSelector((state: RootState) => state.colorPicker);
  // const { canvasMode } = useSelector((state: RootState) => state.toolsPanel);
  const { selectedElement } = useSelector((state: RootState) => state.canvas);
  const { displayLinePicker } = useSelector(
    (state: RootState) => state.linePicker
  );

  const dispatch = useDispatch();

  function getRequiredColor() {
    switch (colorMode) {
      case 'Canvas':
        return canvasColor;
      case 'Element':
        return color;
      case 'Shadow':
        return shadowColor;
      case 'Border':
        if (displayLinePicker && selectedElement)
          return (selectedElement! as any).strokeStyle;
        if (selectedElement) return (selectedElement! as any).color;
        return color;
      default:
        break;
    }
  }

  function handleChange(color: ColorResult) {
    var cSE = { ...(selectedElement as any) };
    switch (colorMode) {
      case 'Canvas':
        dispatch(setCanvasColor({ canvasColor: color }));
        break;
      case 'Element':
        dispatch(setColor({ color: color }));
        cSE.color = color;
        break;
      case 'Shadow':
        dispatch(setShadowColor({ shadowColor: color }));
        cSE.shadowColor = color;
        break;
      case 'Border':
        dispatch(setBorderColor({ borderColor: color }));
        cSE.strokeStyle = color;
        break;
      default:
        break;
    }
    if (!selectedElement) return;
    dispatch(setSelectedElement({ selectedElement: cSE }));
    return dispatch(updateElement({ id: cSE.id, updatedElement: cSE }));
  }

  function handleBlur() {
    dispatch(setDisplayColorPicker({ displayColorPicker: false }));
  }
 
  return (
    <div
      tabIndex={1}
      className="color-picker"
      style={{
        position: 'absolute',
        top: position.top === 0 ? 'auto' : `${position.top}px`,
        bottom: position.bottom === 0 ? 'auto' : `${position.bottom}px`,
        left: position.left === 0 ? 'auto' : `${position.left}px`,
        right: position.right === 0 ? 'auto' : `${position.right}px`,
      }}
      onBlur={handleBlur}
    >
      {displayColorPicker && (
        <ChromePicker color={getRequiredColor().rgb} onChange={handleChange} />
      )}
    </div>
  );
};

export default ColorPicker;
