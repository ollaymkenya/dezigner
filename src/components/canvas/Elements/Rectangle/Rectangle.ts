import { ColorInterface } from '../../../../state/stateData/colorData';
import Mouse from '../Mouse';

export interface RectangleProperties {
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
  color: ColorInterface;
  lineWeight: number;
  strokeStyle: ColorInterface;
  strokeType: string;
  shadowOffsetX: number;
  shadowOffsetY: number;
  shadowBlur: number;
  shadowColor: ColorInterface;
}

class Rectangle {
  properties: RectangleProperties;
  context: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  static offsetPosition = { x1: 0, y1: 0, x2: 0, y2: 0 };
  static resizePosition = {
    cursor: 'Selection',
    x: 0,
    y: 0,
    targetPosition: 'none',
  };

  constructor(
    properties: RectangleProperties,
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ) {
    this.properties = properties;
    this.canvas = canvas;
    this.context = context;
  }

  private static getMinMax(x1: number, y1: number, x2: number, y2: number) {
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);
    return { minX, maxX, minY, maxY };
  }

  public static setRectangleOffsetPosition(
    rectangle: RectangleProperties,
    clientX: number,
    clientY: number
  ) {
    return (Rectangle.offsetPosition = {
      x1: clientX - rectangle.x,
      y1: clientY - rectangle.y,
      x2: clientX - (rectangle.x + rectangle.width),
      y2: clientY - (rectangle.y + rectangle.height),
    });
  }

  public static setRectangleResizePosition(
    rectangle: RectangleProperties,
    clientX: number,
    clientY: number
  ) {
    const { x, y, width, height } = rectangle;

    const { minX, maxX, minY, maxY } = this.getMinMax(
      x,
      y,
      x + width,
      y + height
    );

    var atPoints = [
      Math.abs(clientY - minY) <= 3 && clientX >= minX && clientX <= maxX,
      Math.abs(clientY - maxY) <= 3 && clientX >= minX && clientX <= maxX,
      Math.abs(clientX - minX) <= 3 && clientY >= minY && clientY <= maxY,
      Math.abs(clientX - maxX) <= 3 && clientY >= minY && clientY <= maxY,
    ];

    var cursor = 'Selection';
    var targetPosition: string[] = [];

    var targetPositions = {
      0: 'Top',
      1: 'Bottom',
      2: 'Left',
      3: 'Right',
    };

    type keyType = keyof typeof targetPositions;
    atPoints.forEach((item, index) => {
      if (item) targetPosition.push(targetPositions[index as keyType]);
    });

    switch (targetPosition.join('')) {
      case 'Top':
      case 'Bottom':
        cursor = 'VerticalResize';
        break;
      case 'Left':
      case 'Right':
        cursor = 'HorizontalResize';
        break;
      case 'TopRight':
      case 'BottomLeft':
        cursor = 'TopRightResize';
        break;
      case 'TopLeft':
      case 'BottomRight':
        cursor = 'TopLeftResize';
        break;
      default:
        break;
    }

    this.resizePosition = {
      cursor,
      x: clientX,
      y: clientY,
      targetPosition: targetPosition.join(),
    };
  }

  public static getRectangleResizePosition() {
    return Rectangle.resizePosition;
  }

  public static confirmRectangleDragPosition(
    rectangle: RectangleProperties,
    clientX: number,
    clientY: number
  ) {
    const { x, y, width, height } = rectangle;
    const { minX, maxX, minY, maxY } = this.getMinMax(
      x,
      y,
      x + width,
      y + height
    );

    return (
      clientX >= minX && clientX <= maxX && clientY >= minY && clientY <= maxY
    );
  }

  public static confirmRectangleResizePosition(
    rectangle: RectangleProperties,
    clientX: number,
    clientY: number
  ) {
    const { x, y, width, height } = rectangle;
    const { minX, maxX, minY, maxY } = this.getMinMax(
      x,
      y,
      x + width,
      y + height
    );

    return (
      (minY - 3 <= clientY &&
        clientY <= minY + 3 &&
        clientX >= minX &&
        clientX <= maxX) ||
      (maxY - 3 <= clientY &&
        clientY <= maxY + 3 &&
        clientX >= minX &&
        clientX <= maxX) ||
      (minX - 3 <= clientX &&
        clientX <= minX + 3 &&
        clientY >= minY &&
        clientY <= maxY) ||
      (maxX - 3 <= clientX &&
        clientX <= maxX + 3 &&
        clientY >= minY &&
        clientY <= maxY)
    );
  }

  createRectangleData(): RectangleProperties {
    return this.properties;
  }

  updateRectangleData(
    previousElement: RectangleProperties,
    updateMode: string
  ): RectangleProperties {
    var nextElement: RectangleProperties;
    switch (updateMode) {
      case 'dragging':
        nextElement = {
          ...previousElement,
          x: this.properties.x - Rectangle.offsetPosition.x1,
          y: this.properties.y - Rectangle.offsetPosition.y1,
        };
        break;
      case 'resizing':
        var replaceVariable = {
          x: previousElement.x,
          y: previousElement.y,
          width: previousElement.width,
          height: previousElement.height,
        };
        if (
          Rectangle.getRectangleResizePosition().targetPosition.includes('Top')
        ) {
          replaceVariable = {
            ...replaceVariable,
            y: this.properties.y,
            height:
              previousElement.height + (previousElement.y - this.properties.y),
          };
        }
        if (
          Rectangle.getRectangleResizePosition().targetPosition.includes(
            'Right'
          )
        ) {
          replaceVariable = {
            ...replaceVariable,
            width: this.properties.x - previousElement.x,
            x: previousElement.x,
          };
        }
        if (
          Rectangle.getRectangleResizePosition().targetPosition.includes(
            'Bottom'
          )
        ) {
          replaceVariable = {
            ...replaceVariable,
            y: previousElement.y,
            height: this.properties.y - previousElement.y,
          };
        }
        if (
          Rectangle.getRectangleResizePosition().targetPosition.includes('Left')
        ) {
          replaceVariable = {
            ...replaceVariable,
            x: this.properties.x,
            width:
              previousElement.width + (previousElement.x - this.properties.x),
          };
        }
        const { x, y, width, height } = replaceVariable;
        nextElement = {
          ...previousElement,
          x,
          y,
          width,
          height,
        };
        break;
      default:
        nextElement = {
          ...previousElement,
          width: this.properties.x - previousElement.x,
          height: this.properties.y - previousElement.y,
        };
        break;
    }
    return nextElement;
  }

  drawRectangle() {
    var context = this.context;
    context.restore();
    var {  x,  y,  width,  height,  color,  lineWeight,  strokeType,  strokeStyle,  shadowOffsetX,  shadowOffsetY,  shadowBlur,  shadowColor} = this.properties;
    const { x: clientX, y: clientY } = new Mouse( this.canvas, x, y).getMousePosition();
    //  setting some values
    context.fillStyle = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
    context.lineWidth = lineWeight;
    context.shadowOffsetX = shadowOffsetX;
    context.shadowOffsetY = shadowOffsetY;
    context.shadowBlur = shadowBlur;
    context.shadowColor = `rgba(${shadowColor.rgb.r}, ${shadowColor.rgb.g}, ${shadowColor.rgb.b}, ${shadowColor.rgb.a})`;

    // beginning to draw
    context.beginPath();
    context.rect(clientX, clientY, width, height);
    context.fill();
    // setting the border line to be dashed and setting the stroke color
    if (strokeType === 'dashed') context.setLineDash([10, 5]);
    context.strokeStyle = `rgba(${strokeStyle.rgb.r}, ${strokeStyle.rgb.g}, ${strokeStyle.rgb.b}, ${strokeStyle.rgb.a})`;
    // drawing the line
    if (lineWeight) context.stroke();
    context.closePath();
    // returning default values
    context.lineWidth = 1;
    context.setLineDash([]);
    context.strokeStyle = '#000000';
    context.save();
  }
}

export default Rectangle;
