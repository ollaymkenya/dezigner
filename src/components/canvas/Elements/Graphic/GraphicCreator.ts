import ElementCreator from '../ElementCreator';
import Graphic, { GraphicProperties } from './Graphic';

class GraphicCreator extends ElementCreator {
  properties: GraphicProperties;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  constructor(
    properties: GraphicProperties,
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ) {
    super();
    this.properties = properties;
    this.canvas = canvas;
    this.context = context;
  }

  public createElement(): Graphic {
    return new Graphic(this.properties, this.canvas, this.context);
  }

  public createStateData(): GraphicProperties {
    return this.createElement().createGraphicData();
  }

  confirmDragPosition(clientX: number, clientY: number) {
    return this.createElement().confirmGraphicDragPosition(
      this.properties,
      clientX,
      clientY
    );
  }

  setResizePosition(clientX: number, clientY: number) {
    return this.createElement().setGraphicResizePosition(
      this.properties,
      clientX,
      clientY,
    );
  }

  getResizePosition() {
    return Graphic.getGraphicResizePosition();
  }

  confirmResizePosition(clientX: number, clientY: number) {
    return this.createElement().confirmGraphicResizePosition(
      this.properties,
      clientX,
      clientY
    );
  }

  setOffsetPosition(clientX: number, clientY: number) {
    this.createElement().setGraphicOffsetPosition(
      this.properties,
      clientX,
      clientY
    );
  }

  updateStateData(previousElement: GraphicProperties, updateMode: string) {
    return this.createElement().updateGraphicData(previousElement, updateMode);
  }

  public drawElement() {
    return this.createElement().drawGraphic();
  }
}

export default GraphicCreator;
