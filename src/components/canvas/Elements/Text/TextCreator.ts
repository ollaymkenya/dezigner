// import ElementCreator from '../ElementCreator';
import Text, { TextProperties } from './Text';

class TextCreator {
  properties: TextProperties;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  constructor(
    properties: TextProperties,
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ) {
    this.properties = properties;
    this.canvas = canvas;
    this.context = context;
  }

  public createElement(): Text {
    return new Text(this.properties, this.canvas, this.context);
  }

  public createStateData(): TextProperties {
    return this.createElement().createTextData();
  }

  public updateStateData(
    previousElement: TextProperties,
    updateMode: string
  ): TextProperties {
    return this.createElement().updateTextData(previousElement, updateMode);
  }

  public drawElement() {
    return this.createElement().drawText();
  }

  public confirmDragPosition(clientX: number, clientY: number) {
    return Text.confirmTextDragPosition(this.properties, clientX, clientY);
  }

  public setOffsetPosition(x: number, y: number) {
    Text.setTextOffsetPosition(this.properties, x, y);
  }

  public getResizePosition() {
    return Text.offsetPosition;
  }
}

export default TextCreator;
