import Mouse from '../Mouse';

export interface GraphicProperties {
  id: string;
  name: string;
  visible: boolean;
  unlocked: boolean;
  editing: boolean;
  type: string;
  imageData: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

class Graphic {
  properties: GraphicProperties;
  context: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  public static offsetPosition = { x1: 0, y1: 0, x2: 0, y2: 0 };
  public static image: { id: string; image: HTMLImageElement | null } = {
    id: 'none',
    image: null,
  };
  public static resizePosition: {
    cursor: string;
    x: number;
    y: number;
    targetPosition: string;
  };

  constructor(
    properties: GraphicProperties,
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

  public createGraphicData(): GraphicProperties {
    return this.properties;
  }

  public confirmGraphicDragPosition(
    graphic: GraphicProperties,
    clientX: number,
    clientY: number
  ) {
    const { x, y, width, height } = graphic;
    var isDragging =
      clientX >= x &&
      clientX <= x + width &&
      clientY >= y &&
      clientY <= y + height;
    return isDragging;
  }

  public confirmGraphicResizePosition(
    graphic: GraphicProperties,
    clientX: number,
    clientY: number
  ) {
    const { x, y, width, height } = graphic;

    const { minX, maxX, minY, maxY } = Graphic.getMinMax(
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

  public setGraphicOffsetPosition(
    graphic: GraphicProperties,
    clientX: number,
    clientY: number
  ) {
    return (Graphic.offsetPosition = {
      x1: clientX - graphic.x,
      y1: clientY - graphic.y,
      x2: clientX - (graphic.x + graphic.width),
      y2: clientY - (graphic.y + graphic.height),
    });
  }

  public static getGraphicResizePosition() {
    return this.resizePosition;
  }

  setGraphicResizePosition(
    graphic: GraphicProperties,
    clientX: number,
    clientY: number
  ) {
    const { x, y, width, height } = graphic;

    const { minX, maxX, minY, maxY } = Graphic.getMinMax(
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

    Graphic.resizePosition = {
      cursor,
      x: clientX,
      y: clientY,
      targetPosition: targetPosition.join(),
    };
  }

  updateGraphicData(previousElement: GraphicProperties, updateMode: string) {
    var nextElement;
    switch (updateMode) {
      case 'dragging':
        nextElement = {
          id: previousElement.id,
          name: previousElement.name,
          visible: previousElement.visible,
          unlocked: previousElement.unlocked,
          editing: previousElement.editing,
          type: previousElement.type,
          imageData: previousElement.imageData,
          x: this.properties.x - Graphic.offsetPosition.x1,
          y: this.properties.y - Graphic.offsetPosition.y1,
          width: previousElement.width,
          height: previousElement.height,
        };
        break;
      case 'resizing':
        var replaceVariable = {
          x: previousElement.x,
          y: previousElement.y,
          width: previousElement.width,
          height: previousElement.height,
        };
        if (Graphic.getGraphicResizePosition().targetPosition.includes('Top')) {
          replaceVariable = {
            ...replaceVariable,
            y: this.properties.y,
            height:
              previousElement.height + (previousElement.y - this.properties.y),
          };
        }
        if (
          Graphic.getGraphicResizePosition().targetPosition.includes('Right')
        ) {
          replaceVariable = {
            ...replaceVariable,
            width: this.properties.x - previousElement.x,
            x: previousElement.x,
          };
        }
        if (
          Graphic.getGraphicResizePosition().targetPosition.includes('Bottom')
        ) {
          replaceVariable = {
            ...replaceVariable,
            y: previousElement.y,
            height: this.properties.y - previousElement.y,
          };
        }
        if (
          Graphic.getGraphicResizePosition().targetPosition.includes('Left')
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
          id: previousElement.id,
          name: previousElement.name,
          visible: previousElement.visible,
          unlocked: previousElement.unlocked,
          editing: previousElement.editing,
          type: previousElement.type,
          imageData: previousElement.imageData,
          x,
          y,
          width,
          height,
        };
        break;
      default:
        break;
    }
    return nextElement;
  }

  public drawGraphic() {
    var { id, x, y, imageData, width, height } = this.properties;
    var { x: clientX, y: clientY } = new Mouse(
      this.canvas,
      x,
      y
    ).getMousePosition();
    var context = this.context;
    context.restore();
    if (Graphic.image.id === id && Graphic.image) {
      context.drawImage(
        Graphic.image.image as HTMLImageElement,
        clientX,
        clientY,
        width,
        height
      );
      context.save();
      return;
    }
    var image = new Image();
    image.onload = (e) => {
      Graphic.image = { id, image };
      context.drawImage(image, x, y, width, height);
    };
    image.src = imageData;
    context.save();
  }
}

export default Graphic;
