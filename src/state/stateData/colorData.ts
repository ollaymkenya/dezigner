import { ColorResult } from "react-color";

export interface ColorInterface extends ColorResult {
  oldHue: number;
  source: string;
}

export const initialCanvasColor = {
  hsl: { h: 300, s: 0, l: 0.9, a: 1 },
  hex: '#e5e5e5',
  rgb: { r: 229, g: 229, b: 229, a: 1 },
  hsv: { h: 300, s: 0, v: 0.9, a: 1 },
  oldHue: 300,
  source: 'hex',
};

// const initialFrameColor = {
//   hsl: { h: 36, s: 0, l: 1, a: 1 },
//   hex: '#ffffff',
//   rgb: { r: 255, g: 255, b: 255, a: 1 },
//   hsv: { h: 36, s: 0, v: 1, a: 1 },
//   oldHue: 36,
//   source: 'hex',
// };

export const initialBlackColor = {
  hsl: { h: 0, s: 0, l: 0, a: 1 },
  hex: '#000000',
  rgb: { r: 0, g: 0, b: 0, a: 1 },
  hsv: { h: 0, s: 0, v: 0, a: 1 },
  oldHue: 0,
  source: 'hsv',
};

export const initialShapeColor = {
  hsl: { h: 0, s: 0, l: 0.7575, a: 1 },
  hex: '#c1c1c1',
  rgb: { r: 193, g: 193, b: 193, a: 1 },
  hsv: { h: 0, s: 0, v: 0.7575, a: 1 },
  oldHue: 0,
  source: 'hsv',
};

const InitialColorData = {
  colorMode: 'Canvas',
  displayColorPicker: false,
  position: { top: 0, left: 0, right: 0, bottom: 0 },
  color: initialCanvasColor,
  canvasColor: initialCanvasColor,
  borderColor: initialBlackColor,
  shadowColor: initialCanvasColor,
};

export default InitialColorData;
