import ElementCreator from '../ElementCreator';
import Line, { LineProperties } from './Line';

class LineCreator extends ElementCreator {
  properties: LineProperties;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  constructor(
    properties: LineProperties,
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ) {
    super();
    this.properties = properties;
    this.canvas = canvas;
    this.context = context;
  }

  public createElement(): Line {
    return new Line(this.properties, this.canvas, this.context);
  }

  public createStateData(): LineProperties {
    return this.createElement().createLineData();
  }

  public updateStateData(
    previousElement: LineProperties,
    updateMode: string
  ): LineProperties {
    return this.createElement().updateLineData(previousElement, updateMode);
  }

  public setOffsetPosition(x: number, y: number) {
    Line.setLineOffsetPosition(this.properties, x, y);
  }

  public setResizePosition(x: number, y: number) {
    Line.setLineResizePosition(this.properties, x, y);
  }

  public getResizePosition() {
    return Line.getLineResizePosition();
  }

  confirmDragPosition(clientX: any, clientY: any) {
    return Line.confirmLineDragPosition(this.properties, clientX, clientY);
  }

  public confirmResizePosition(clientX: number, clientY: number) {
    return Line.confirmLineResizePosition(
      this.properties,
      clientX,
      clientY
    );
  }

  public drawElement() {
    return this.createElement().drawLine();
  }
}

export default LineCreator;
