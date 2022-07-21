import ElementCreator from '../ElementCreator';
import Ellipse, { EllipseProperties } from './Ellipse';

class EllipseCreator extends ElementCreator {
  properties: EllipseProperties;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  constructor(
    properties: EllipseProperties,
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ) {
    super();
    this.properties = properties;
    this.canvas = canvas;
    this.context = context;
  }

  public createElement(): Ellipse {
    return new Ellipse(this.properties, this.canvas, this.context);
  }

  public createStateData(): EllipseProperties {
    return this.createElement().createEllipseData();
  }

  public updateStateData(
    previousElement: EllipseProperties,
    updateMode: string
  ): EllipseProperties {
    return this.createElement().updateEllipseData(previousElement, updateMode);
  }

  public getResizePosition() {
    return Ellipse.getEllipseResizePosition();
  }

  public confirmDragPosition(clientX: number, clientY: number) {
    return Ellipse.confirmEllipseDragPosition(
      this.properties,
      clientX,
      clientY
    );
  }

  public confirmResizePosition(clientX: number, clientY: number) {
    return Ellipse.confirmEllipseResizePosition(
      this.properties,
      clientX,
      clientY
    );
  }

  setOffsetPosition(clientX: number, clientY: number) {
    Ellipse.setEllipseOffsetPosition(this.properties, clientX, clientY);
  }

  setResizePosition(clientX: number, clientY: number) {
    Ellipse.setEllipseResizePosition(this.properties, clientX, clientY);
  }

  public drawElement() {
    return this.createElement().drawEllipse();
  }
}

export default EllipseCreator;
