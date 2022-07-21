import ElementCreator from '../ElementCreator';
import Rectangle, { RectangleProperties } from './Rectangle';

class RectangleCreator extends ElementCreator {
  properties: RectangleProperties;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  constructor(
    properties: RectangleProperties,
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ) {
    super();
    this.properties = properties;
    this.canvas = canvas;
    this.context = context;
  }

  public createElement(): Rectangle {
    return new Rectangle(this.properties, this.canvas, this.context);
  }

  public createStateData(): RectangleProperties {
    return this.createElement().createRectangleData();
  }

  public updateStateData(
    previousElement: RectangleProperties,
    updateMode: string
  ): RectangleProperties {
    return this.createElement().updateRectangleData(
      previousElement,
      updateMode
    );
  }

  public setOffsetPosition(x: number, y: number) {
    Rectangle.setRectangleOffsetPosition(this.properties, x, y);
  }

  public setResizePosition(x: number, y: number) {
    Rectangle.setRectangleResizePosition(this.properties, x, y);
  }

  public getResizePosition() {
    return Rectangle.getRectangleResizePosition();
  }

  public confirmDragPosition(clientX: number, clientY: number) {
    return Rectangle.confirmRectangleDragPosition(
      this.properties,
      clientX,
      clientY
    );
  }

  public confirmResizePosition(clientX: number, clientY: number) {
    return Rectangle.confirmRectangleResizePosition(
      this.properties,
      clientX,
      clientY
    );
  }

  public drawElement() {
    return this.createElement().drawRectangle();
  }
}

export default RectangleCreator;
