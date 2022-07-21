import { ColorInterface } from '../../../../state/stateData/colorData';
import Mouse from '../Mouse';

export interface LineProperties {
  id: string;
  name: string;
  visible: boolean;
  unlocked: boolean;
  editing: boolean;
  type: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  length: number;
  angle: number;
  color: ColorInterface;
  lineWeight: number;
  strokeStyle: ColorInterface;
  strokeType: string;
  shadowOffsetX: number;
  shadowOffsetY: number;
  shadowBlur: number;
  shadowColor: ColorInterface;
}

class Line {
  properties: LineProperties;
  context: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  static offsetPosition = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
  };

  private static resizePosition = {
    cursor: 'Selection',
    x: 0,
    y: 0,
    targetPosition: 'none',
  };

  constructor(
    properties: LineProperties,
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ) {
    this.properties = properties;
    this.canvas = canvas;
    this.context = context;
  }

  public static setLineOffsetPosition(
    line: LineProperties,
    clientX: number,
    clientY: number
  ) {
    // do something
    return (Line.offsetPosition = {
      x1: clientX - line.x1,
      y1: clientY - line.y1,
      x2: clientX - line.x2,
      y2: clientY - line.y2,
    });
  }

  public static setLineResizePosition(
    line: LineProperties,
    clientX: number,
    clientY: number
  ) {
    var cursor = 'Selection';
    const { x1, y1, angle } = line;
    const cursorsIndexes = [
      angle === 90 || angle === 270,
      angle === 0 || angle === 180,
      (angle > 0 && angle < 90) || (angle > 180 && angle < 270),
      (angle > 90 && angle < 180) || (angle > 270 && angle < 360),
    ];

    let targetPosition =
      Line.getLengthAndAngle(x1, y1, clientX, clientY).length <= 5
        ? 'Start'
        : 'End';

    const cursors = {
      0: 'VerticalResize',
      1: 'HorizontalResize',
      2: 'TopRightResize',
      3: 'TopLeftResize',
    };
    type key = keyof typeof cursors;
    cursor =
      cursors[
        cursorsIndexes.findIndex((cursorsIndex) => cursorsIndex === true) as key
      ];

    this.resizePosition = {
      cursor,
      x: clientX,
      y: clientY,
      targetPosition,
    };
  }

  public static getLineResizePosition() {
    return Line.resizePosition;
  }

  public static confirmLineDragPosition(
    line: LineProperties,
    clientX: number,
    clientY: number
  ) {
    const { x1, y1, angle } = line;
    let lengthAndAngle = Line.getLengthAndAngle(x1, y1, clientX, clientY);
    return Math.abs(lengthAndAngle.angle - angle) <= 3;
  }

  public static confirmLineResizePosition(
    line: LineProperties,
    clientX: number,
    clientY: number
  ) {
    const { x1, y1, x2, y2 } = line;
    let lengthAndAngle = Line.getLengthAndAngle(x1, y1, clientX, clientY);
    let lengthAndAngle1 = Line.getLengthAndAngle(x2, y2, clientX, clientY);

    const resize = lengthAndAngle.length <= 5 || lengthAndAngle1.length <= 5;
    return resize;
  }

  public static getLengthAndAngle(
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) {
    const imaginaryPoint = {
      x: x2,
      y: y1,
    };
    const adjLine = imaginaryPoint.x - x1;
    const oppLine = imaginaryPoint.y - y2;
    var length = Math.hypot(adjLine, oppLine);
    var angle: number;
    if (length === 0) {
      return {
        length,
        angle: 0,
      };
    }
    if (adjLine === 0) {
      return oppLine > 0 ? { length, angle: 90 } : { length, angle: 270 };
    } else if (oppLine === 0) {
      return adjLine > 0 ? { length, angle: 0 } : { length, angle: 180 };
    } else {
      angle = (Math.atan(oppLine / adjLine) * 180) / Math.PI;
      if (x2 > x1) {
        if (angle < 0) {
          angle += 360;
        }
      }
      if (x1 > x2) {
        angle += 180;
      }
      return { length, angle };
    }
  }

  public createLineData(): LineProperties {
    return this.properties;
  }

  public updateLineData(
    previousElement: LineProperties,
    updateMode: string
  ): LineProperties {
    const { x1, y1 } = previousElement;
    var nextElement: LineProperties;
    switch (updateMode) {
      case 'dragging':
        nextElement = {
          ...previousElement,
          x1: this.properties.x1 - Line.offsetPosition.x1,
          y1: this.properties.y1 - Line.offsetPosition.y1,
          x2: this.properties.x2 - Line.offsetPosition.x2,
          y2: this.properties.y2 - Line.offsetPosition.y2,
        };
        break;
      case 'resizing':
        nextElement = {
          ...previousElement,
          x1:
            Line.resizePosition.targetPosition === 'Start'
              ? this.properties.x2
              : x1,
          y1:
            Line.resizePosition.targetPosition === 'Start'
              ? this.properties.y2
              : y1,
          x2:
            Line.resizePosition.targetPosition === 'End'
              ? this.properties.x2
              : previousElement.x2,
          y2:
            Line.resizePosition.targetPosition === 'End'
              ? this.properties.y2
              : previousElement.y2,
          length:
            Line.resizePosition.targetPosition === 'Start'
              ? Line.getLengthAndAngle(
                  this.properties.x2,
                  this.properties.y2,
                  previousElement.x2,
                  previousElement.y2
                ).length
              : Line.getLengthAndAngle(
                  x1,
                  y1,
                  this.properties.x2,
                  this.properties.y2
                ).length,
          angle:
            Line.resizePosition.targetPosition === 'Start'
              ? Line.getLengthAndAngle(
                  this.properties.x2,
                  this.properties.y2,
                  previousElement.x2,
                  previousElement.y2
                ).angle
              : Line.getLengthAndAngle(
                  x1,
                  y1,
                  this.properties.x2,
                  this.properties.y2
                ).angle,
        };
        break;
      default:
        nextElement = {
          ...previousElement,
          x2: this.properties.x2,
          y2: this.properties.y2,
          length: Line.getLengthAndAngle(
            x1,
            y1,
            this.properties.x2,
            this.properties.y2
          ).length,
          angle: Line.getLengthAndAngle(
            x1,
            y1,
            this.properties.x2,
            this.properties.y2
          ).angle,
        };
        break;
    }
    return nextElement;
  }

  public drawLine() {
    var context = this.context;
    var {
      x1,
      y1,
      x2,
      y2,
      color,
      shadowOffsetX,
      shadowOffsetY,
      shadowBlur,
      shadowColor,
      strokeType,
      strokeStyle,
      lineWeight,
    } = this.properties;
    //  setting some values
    context.fillStyle = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
    context.lineWidth = lineWeight;
    context.shadowOffsetX = shadowOffsetX;
    context.shadowOffsetY = shadowOffsetY;
    context.shadowBlur = shadowBlur;
    context.shadowColor = `rgba(${shadowColor.rgb.r}, ${shadowColor.rgb.g}, ${shadowColor.rgb.b}, ${shadowColor.rgb.a})`;
    context.restore();
    context.beginPath();
    x1 = new Mouse(this.canvas, x1, y1).getMousePosition().x;
    y1 = new Mouse(this.canvas, x1, y1).getMousePosition().y;
    x2 = new Mouse(this.canvas, x2, y2).getMousePosition().x;
    y2 = new Mouse(this.canvas, x2, y2).getMousePosition().y;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
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
    return;
  }
}

export default Line;
