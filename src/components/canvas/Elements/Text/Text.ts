import { ColorInterface } from '../../../../state/stateData/colorData';

export interface TextProperties {
  id: string;
  name: string;
  visible: boolean;
  unlocked: boolean;
  editing: boolean;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize: number; //50
  fontFace: string; //sans-serif
  fontFamily: string; // Arial
  fontWeight: number; // bold
  fontStyle: string; //italic
  message: string;
  color: ColorInterface;
  fillOrStroke: string;
  textBaseline: string; //top
  textAlign: string; // center
  shadowOffsetX: number;
  shadowOffsetY: number;
  shadowBlur: number;
  shadowColor: ColorInterface;
}

class Text {
  properties: TextProperties;
  context: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  static offsetPosition = { x1: 0, y1: 0, x2: 0, y2: 0 };

  constructor(
    properties: TextProperties,
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ) {
    this.properties = properties;
    this.canvas = canvas;
    this.context = context;
  }

  createTextData() {
    return this.properties;
  }

  private static getMinMax(x1: number, y1: number, x2: number, y2: number) {
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);
    return { minX, maxX, minY, maxY };
  }

  static confirmTextDragPosition(
    text: TextProperties,
    clientX: number,
    clientY: number
  ) {
    const { x, y, width, height } = text;
    const { minX, maxX, minY, maxY } = this.getMinMax(
      x,
      y,
      x + width,
      y + height
    );

    console.log({
      works: clientX >= minX,
    });
    return (
      clientX >= minX && clientX <= maxX && clientY >= minY && clientY <= maxY
    );
  }

  public static setTextOffsetPosition(
    text: TextProperties,
    clientX: number,
    clientY: number
  ) {
    return (this.offsetPosition = {
      x1: clientX - text.x,
      y1: clientY - text.y,
      x2: clientX - (text.x + text.width),
      y2: clientY - (text.y + text.height),
    });
  }

  updateTextData(previousElement: TextProperties, updateMode: string) {
    switch (updateMode) {
      case 'dragging':
        return {
          ...previousElement,
          x: this.properties.x - Text.offsetPosition.x1,
          y: this.properties.y - Text.offsetPosition.y1,
        };
      default:
        return { ...previousElement, message: this.properties.message };
    }
  }

  getWeightNames(fontFamily: string, fontWeight: number) {
    switch (fontFamily.split(' ')[1]) {
      case 'BebasNeue':
      case 'NanumPenScript':
        return 'Regular';
      case 'Archivo':
      case 'CormorantGaramond':
      case 'IBMPlexMono':
        if (fontWeight === 100) return 'Thin';
        if (fontWeight === 200) return 'ExtraLight';
        if (fontWeight === 300) return 'Light';
        if (fontWeight === 400) return 'Regular';
        if (fontWeight === 500) return 'Medium';
        if (fontWeight === 600) return 'SemiBold';
        if (fontWeight === 700) return 'Bold';
        if (fontWeight === 800) return 'ExtraBold';
        if (fontWeight === 900) return 'Black';
        break;
      default:
        return 'Regular';
    }
  }

  getFontStyle(fontStyle: string) {
    switch (fontStyle) {
      case 'italic':
        return 'Italic';
      default:
        return '';
    }
  }

  xYGetter(
    x: number,
    y: number,
    width: number,
    fontSize: number,
    iteration: number,
    textAlign: string
  ) {
    switch (textAlign) {
      case 'left':
        return { x: x - 190, y: y - 19 + iteration * fontSize * 1.45 };
      case 'center':
        return {
          x: x - 190 + width / 2,
          y: y - 19 + iteration * fontSize * 1.45,
        };
      case 'right':
        return {
          x: x - 190 + width,
          y: y - 19 + iteration * fontSize * 1.45,
        };
      default:
        return { x: x - 190, y: y - 19 + iteration * fontSize * 1.45 };
    }
  }

  public drawText() {
    var context = this.context;
    var {
      x,
      y,
      width,
      message,
      color,
      fontSize,
      fontFamily,
      fontWeight,
      fontStyle,
      textAlign,
      textBaseline,
      shadowColor,
      shadowOffsetX,
      shadowOffsetY,
      shadowBlur,
    } = this.properties;
    var msgToDisplay = message.split('\n');
    context.restore();
    context.fillStyle = color.hex;
    context.font = `${fontWeight} ${fontStyle} ${fontSize * 1.4}px ${
      fontFamily.split(' ')[1]
    }${this.getWeightNames(fontFamily, fontWeight)}${this.getFontStyle(
      fontStyle
    )}`;
    context.shadowColor = `rgba(${shadowColor.rgb.r}, ${shadowColor.rgb.g}, ${shadowColor.rgb.b}, ${shadowColor.rgb.a})`;
    context.shadowOffsetX = shadowOffsetX;
    context.shadowOffsetY = shadowOffsetY;
    context.shadowBlur = shadowBlur;
    //getting longest string to determine width of text input
    var longestString = msgToDisplay.reduce((a, b) =>
      a.length > b.length ? a : b
    );
    var textWidth = context.measureText(longestString).width;
    for (let i = 0; i < msgToDisplay.length; i++) {
      const { x: textX, y: textY } = this.xYGetter(
        x,
        y,
        width,
        fontSize,
        i,
        textAlign
      );
      const msg = msgToDisplay[i] || '';
      context.fillText(msg, textX, textY);
    }
    context.textBaseline = textBaseline as CanvasTextBaseline;
    context.textAlign = textAlign as CanvasTextAlign;
    context.save();
    return {
      textWidth: parseFloat(textWidth.toPrecision(2)),
      textHeight: msgToDisplay.length * fontSize * 1.72,
    };
  }
}

export default Text;
