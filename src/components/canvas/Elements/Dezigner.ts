import EllipseCreator from './Ellipse/EllipseCreator';
import LineCreator from './Line/LineCreator';
import RectangleCreator from './Rectangle/RectangleCreator';
import GraphicCreator from './Graphic/GraphicCreator';
import TextCreator from './Text/TextCreator';
import { initialBlackColor } from '../../../state/stateData/colorData';

class Dezigner {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  private elementCreators(properties: any) {
    switch (properties.type) {
      case 'Ellipse':
        return new EllipseCreator(
          {
            ...properties,
            radius: 0,
            startAngle: 0,
            endAngle: 2 * Math.PI,
            counterClockwise: false,
            lineWeight: 1,
            strokeStyle: initialBlackColor,
            strokeType: 'default',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 0,
            shadowColor: initialBlackColor,
          },
          this.canvas,
          this.context
        ).createStateData();
      case 'Line':
        properties.x1 = properties.x2 = properties.x;
        properties.y1 = properties.y2 = properties.y;
        delete properties.x;
        delete properties.y;
        return new LineCreator(
          {
            ...properties,
            length: 0,
            angle: 0,
            lineWeight: 1,
            strokeStyle: initialBlackColor,
            strokeType: 'default',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 0,
            shadowColor: initialBlackColor,
          },
          this.canvas,
          this.context
        ).createStateData();
      case 'Rectangle':
        return new RectangleCreator(
          {
            ...properties,
            width: 0,
            height: 0,
            lineWeight: 1,
            strokeStyle: initialBlackColor,
            strokeType: 'default',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 0,
            shadowColor: initialBlackColor,
          },
          this.canvas,
          this.context
        ).createStateData();
      case 'Image':
        return new GraphicCreator(
          { ...properties },
          this.canvas,
          this.context
        ).createStateData();
      case 'Text':
        return new TextCreator(
          {
            ...properties,
            width: 1,
            height: 1,
            fontSize: 12,
            fontFace: 'sans-serif',
            fontFamily: 'sans-serif Archivo',
            fontWeight: 500,
            fontStyle: 'normal',
            message: '',
            fillOrStroke: 'fill',
            textBaseline: 'middle',
            textAlign: 'left',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 0,
            shadowColor: initialBlackColor,
          },
          this.canvas,
          this.context
        ).createStateData();
      default:
        break;
    }
  }

  private elementUpdaters(
    properties: any,
    previousElement: any,
    updateMode: string
  ) {
    switch (previousElement.type) {
      case 'Ellipse':
        return new EllipseCreator(
          properties,
          this.canvas,
          this.context
        ).updateStateData(previousElement, updateMode);
      case 'Line':
        properties.x1 = properties.x;
        properties.y1 = properties.y;
        properties.x2 = properties.x;
        properties.y2 = properties.y;
        delete properties.x;
        delete properties.y;
        return new LineCreator(
          properties,
          this.canvas,
          this.context
        ).updateStateData(previousElement, updateMode);
      case 'Rectangle':
        return new RectangleCreator(
          properties,
          this.canvas,
          this.context
        ).updateStateData(previousElement, updateMode);
      case 'Image':
        return new GraphicCreator(
          properties,
          this.canvas,
          this.context
        ).updateStateData(previousElement, updateMode);
      case 'Text':
        return new TextCreator(
          properties,
          this.canvas,
          this.context
        ).updateStateData(previousElement, updateMode);
      default:
        break;
    }
  }

  private elementDrawers(properties: any) {
    switch (properties.type) {
      case 'Ellipse':
        return new EllipseCreator(
          properties,
          this.canvas,
          this.context
        ).drawElement();
      case 'Line':
        return new LineCreator(
          properties,
          this.canvas,
          this.context
        ).drawElement();
      case 'Rectangle':
        return new RectangleCreator(
          properties,
          this.canvas,
          this.context
        ).drawElement();
      case 'Image':
        return new GraphicCreator(
          properties,
          this.canvas,
          this.context
        ).drawElement();
      case 'Text':
        return new TextCreator(
          properties,
          this.canvas,
          this.context
        ).drawElement();
      default:
        break;
    }
  }

  private offsetPositionUpdaters(properties: any) {
    switch (properties.targetElement.type) {
      case 'Rectangle':
        return new RectangleCreator(
          properties.targetElement,
          this.canvas,
          this.context
        ).setOffsetPosition(properties.clientX, properties.clientY);
      case 'Line':
        return new LineCreator(
          properties.targetElement,
          this.canvas,
          this.context
        ).setOffsetPosition(properties.clientX, properties.clientY);
      case 'Ellipse':
        return new EllipseCreator(
          properties.targetElement,
          this.canvas,
          this.context
        ).setOffsetPosition(properties.clientX, properties.clientY);
      case 'Image':
        return new GraphicCreator(
          properties.targetElement,
          this.canvas,
          this.context
        ).setOffsetPosition(properties.clientX, properties.clientY);
      case 'Text':
        return new TextCreator(
          properties.targetElement,
          this.canvas,
          this.context
        ).setOffsetPosition(properties.clientX, properties.clientY);
      default:
        break;
    }
  }

  private dragPositionConfirmers(properties: any) {
    switch (properties.element.type) {
      case 'Rectangle':
        return new RectangleCreator(
          properties.element,
          this.canvas,
          this.context
        ).confirmDragPosition(properties.clientX, properties.clientY);
      case 'Line':
        return new LineCreator(
          properties.element,
          this.canvas,
          this.context
        ).confirmDragPosition(properties.clientX, properties.clientY);
      case 'Ellipse':
        return new EllipseCreator(
          properties.element,
          this.canvas,
          this.context
        ).confirmDragPosition(properties.clientX, properties.clientY);
      case 'Image':
        return new GraphicCreator(
          properties.element,
          this.canvas,
          this.context
        ).confirmDragPosition(properties.clientX, properties.clientY);
      case 'Text':
        return new TextCreator(
          properties.element,
          this.canvas,
          this.context
        ).confirmDragPosition(properties.clientX, properties.clientY);
      default:
        break;
    }
  }

  private resizePositionConfirmers(properties: any) {
    switch (properties.element.type) {
      case 'Rectangle':
        return new RectangleCreator(
          properties.element,
          this.canvas,
          this.context
        ).confirmResizePosition(properties.clientX, properties.clientY);
      case 'Line':
        return new LineCreator(
          properties.element,
          this.canvas,
          this.context
        ).confirmResizePosition(properties.clientX, properties.clientY);
      case 'Ellipse':
        return new EllipseCreator(
          properties.element,
          this.canvas,
          this.context
        ).confirmResizePosition(properties.clientX, properties.clientY);
      case 'Image':
        return new GraphicCreator(
          properties.element,
          this.canvas,
          this.context
        ).confirmResizePosition(properties.clientX, properties.clientY);
      default:
        break;
    }
  }

  private resizePositionSetters(properties: any) {
    switch (properties.targetElement.type) {
      case 'Rectangle':
        return new RectangleCreator(
          properties.targetElement,
          this.canvas,
          this.context
        ).setResizePosition(properties.clientX, properties.clientY);
      case 'Line':
        return new LineCreator(
          properties.targetElement,
          this.canvas,
          this.context
        ).setResizePosition(properties.clientX, properties.clientY);
      case 'Ellipse':
        return new EllipseCreator(
          properties.targetElement,
          this.canvas,
          this.context
        ).setResizePosition(properties.clientX, properties.clientY);
      case 'Image':
        return new GraphicCreator(
          properties.targetElement,
          this.canvas,
          this.context
        ).setResizePosition(properties.clientX, properties.clientY);
      default:
        break;
    }
  }

  private resizePositionGetters(properties: any) {
    switch (properties.targetElement.type) {
      case 'Rectangle':
        return new RectangleCreator(
          properties.targetElement,
          this.canvas,
          this.context
        ).getResizePosition();
      case 'Line':
        return new LineCreator(
          properties.targetElement,
          this.canvas,
          this.context
        ).getResizePosition();
      case 'Ellipse':
        return new EllipseCreator(
          properties.targetElement,
          this.canvas,
          this.context
        ).getResizePosition();
      case 'Image':
        return new GraphicCreator(
          properties.targetElement,
          this.canvas,
          this.context
        ).getResizePosition();
      default:
        break;
    }
  }

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.context = context;
  }

  public create(properties: any) {
    return this.elementCreators(properties);
  }

  public update(properties: any, previousElement: any, updateMode: string) {
    return this.elementUpdaters(properties, previousElement, updateMode);
  }

  public draw(properties: any) {
    return this.elementDrawers(properties);
  }

  public setOffsetPosition(properties: any) {
    return this.offsetPositionUpdaters(properties);
  }

  public confirmDragPosition(properties: any) {
    return this.dragPositionConfirmers(properties);
  }

  public confirmResizePosition(properties: any) {
    return this.resizePositionConfirmers(properties);
  }

  public setResizePosition(properties: any) {
    return this.resizePositionSetters(properties);
  }

  public getResizePosition(properties: any) {
    return this.resizePositionGetters(properties);
  }
}

export default Dezigner;
