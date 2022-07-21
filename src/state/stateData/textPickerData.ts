import AlignLeft from '../../assets/images/baselineleft.svg';
import AlignCenter from '../../assets/images/baselinecenter.svg';
import AlignRight from '../../assets/images/baselineright.svg';
import BaselineTop from '../../assets/images/aligntop.svg';
import BaselineBottom from '../../assets/images/alignbottom.svg';
import BaselineMiddle from '../../assets/images/aligncenter.svg';
import { ColorInterface, initialBlackColor } from './colorData';

interface TextData {
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize: number; //50
  fontFace: string; //sans-serif
  fontFamily: string; // Arial
  fontWeight: number; // bold
  fontStyle: string; //italic
  color: ColorInterface;
  fillOrStroke: string;
  textBaseline: string; //top
  textAlign: string; // center
  offsetShadowX: number;
  offsetShadowY: number;
  shadowBlur: number;
  shadowColor: ColorInterface;
}

export const textData: TextData = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  fontFamily: 'sans-serif ArchivoRegular',
  fontWeight: 400,
  fontStyle: 'normal',
  fontSize: 16,
  fillOrStroke: 'fill',
  textBaseline: 'left',
  textAlign: 'center',
  color: initialBlackColor,
  offsetShadowX: 0,
  offsetShadowY: 0,
  shadowBlur: 0,
  shadowColor: initialBlackColor,
  fontFace: 'sans-serif',
};

export const fonts = [
  { fontFamily: 'Archivo', fontVariant: 'sans-serif' },
  { fontFamily: 'CormorantGaramont', fontVariant: 'serif' },
  { fontFamily: 'NanumPenScript', fontVariant: 'cursive' },
  { fontFamily: 'BebasNeue', fontVariant: 'display' },
  { fontFamily: 'IBMPlexMono', fontVariant: 'monospace' },
];

export const fontWeight = [
  { name: 'Thin', value: 100 },
  { name: 'Extra light', value: 200 },
  { name: 'Light', value: 300 },
  { name: 'Regular', value: 400 },
  { name: 'Medium', value: 500 },
  { name: 'Semi bold', value: 600 },
  { name: 'Bold', value: 700 },
  { name: 'Extra bold', value: 800 },
  { name: 'Black', value: 900 },
];

export const fontFill = ['Fill', 'Stroke', 'Both'];

export const fontStyle = ['Italic', 'Normal', 'Oblique'];

export const textBaseline = [
  {
    image: BaselineTop,
    alt: 'baseline top',
    id: 'textBaselineTop',
    value: 'top',
  },
  {
    image: BaselineMiddle,
    alt: 'baseline middle',
    id: 'textBaselineMiddle',
    value: 'middle',
  },
  {
    image: BaselineBottom,
    alt: 'baseline bottom',
    id: 'textBaselineBottom',
    value: 'bottom',
  },
];

export const textAlign = [
  {
    image: AlignLeft,
    alt: 'align left',
    id: 'textAlignLeft',
    value: 'left',
  },
  {
    image: AlignCenter,
    alt: 'align center',
    id: 'textAlignCenter',
    value: 'center',
  },
  {
    image: AlignRight,
    alt: 'align right',
    id: 'textAlignRight',
    value: 'right',
  },
];
