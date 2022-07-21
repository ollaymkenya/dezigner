import { ColorInterface } from '../../../../state/stateData/colorData';
import Mouse from '../Mouse';

export interface EllipseProperties {
  id: string;
  name: string;
  visible: boolean;
  unlocked: boolean;
  editing: boolean;
  type: string;
  x: number;
  y: number;
  radius: number;
  startAngle: number;
  endAngle: number;
  counterClockwise: boolean;
  color: ColorInterface;
  lineWeight: number;
  strokeStyle: ColorInterface;
  strokeType: string;
  shadowOffsetX: number;
  shadowOffsetY: number;
  shadowBlur: number;
  shadowColor: ColorInterface;
}

class Ellipse {
  properties: EllipseProperties;
  context: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  static offsetPosition: { x: number; y: number } = { x: 0, y: 0 };
  static resizePosition: {
    cursor: string;
    x: number;
    y: number;
    targetPosition: string;
  } = { cursor: 'Selection', x: 0, y: 0, targetPosition: 'none' };

  constructor(
    properties: EllipseProperties,
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ) {
    this.properties = properties;
    this.canvas = canvas;
    this.context = context;
  }

  public static getEllipseResizePosition() {
    return Ellipse.resizePosition;
  }

  public static confirmEllipseDragPosition(
    ellipse: EllipseProperties,
    clientX: number,
    clientY: number
  ) {
    const { x, y, radius } = ellipse;

    return (
      Math.sqrt((clientX - x) * (clientX - x) + (clientY - y) * (clientY - y)) <
      radius
    );
  }

  public static confirmEllipseResizePosition(
    ellipse: EllipseProperties,
    clientX: number,
    clientY: number
  ) {
    const { x, y, radius } = ellipse;
    const placeClickedRelativeToRadius = Math.sqrt(
      (clientX - x) * (clientX - x) + (clientY - y) * (clientY - y)
    );
    return Math.abs(placeClickedRelativeToRadius - radius) <= 2;
  }

  public static setEllipseOffsetPosition(
    ellipse: EllipseProperties,
    clientX: number,
    clientY: number
  ) {
    return (Ellipse.offsetPosition = {
      x: clientX - ellipse.x,
      y: clientY - ellipse.y,
    });
  }

  public static setEllipseResizePosition(
    ellipse: EllipseProperties,
    clientX: number,
    clientY: number
  ) {
    const { x, y } = ellipse;

    var cursor = 'Selection';
    var targetPosition: string[] = [];

    var targetPositions = {
      0: 'Top',
      1: 'Bottom',
      2: 'Left',
      3: 'Right',
    };

    var atPoints = [clientY > y, clientY < y, clientX < x, clientX > x];

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

  private getRadiusOfEllipse(x1: number, y1: number, x2: number, y2: number) {
    const imaginaryPoint = {
      x: x2,
      y: y1,
    };
    const lengthOfAdjascentImaginaryRadius = imaginaryPoint.x - x1;
    const lengthOfOppositeImaginaryRadius = imaginaryPoint.y - y2;
    const hypoteneusSquared =
      lengthOfAdjascentImaginaryRadius * lengthOfAdjascentImaginaryRadius +
      lengthOfOppositeImaginaryRadius * lengthOfOppositeImaginaryRadius;
    var lengthOfRadius = Math.sqrt(hypoteneusSquared);
    return parseFloat(lengthOfRadius.toFixed(2));
  }

  createEllipseData(): EllipseProperties {
    return this.properties;
  }

  public updateEllipseData(
    previousElement: EllipseProperties,
    updateMode: string
  ) {
    var nextElement;
    switch (updateMode) {
      case 'dragging':
        nextElement = {
          ...previousElement,
          x: this.properties.x - Ellipse.offsetPosition.x,
          y: this.properties.y - Ellipse.offsetPosition.y,
        };
        break;
      case 'resizing':
      default:
        nextElement = {
          ...previousElement,
          radius: this.getRadiusOfEllipse(
            previousElement.x,
            previousElement.y,
            this.properties.x,
            this.properties.y
          ),
        };
        break;
    }
    return nextElement;
  }

  drawEllipse() {
    var context = this.context;
    context.restore();
    var {
      x,
      y,
      radius,
      startAngle,
      endAngle,
      counterClockwise,
      color,
      lineWeight,
      strokeStyle,
      strokeType,
      shadowOffsetX,
      shadowOffsetY,
      shadowBlur,
      shadowColor,
    } = this.properties;
    //  setting some values
    context.fillStyle = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
    context.lineWidth = lineWeight;
    context.shadowOffsetX = shadowOffsetX;
    context.shadowOffsetY = shadowOffsetY;
    context.shadowBlur = shadowBlur;
    context.shadowColor = `rgba(${shadowColor.rgb.r}, ${shadowColor.rgb.g}, ${shadowColor.rgb.b}, ${shadowColor.rgb.a})`;

    x = new Mouse(this.canvas, x, y).getMousePosition().x;
    y = new Mouse(this.canvas, x, y).getMousePosition().y;

    context.beginPath();
    context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
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

export default Ellipse;
