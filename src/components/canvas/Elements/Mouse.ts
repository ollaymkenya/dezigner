class Mouse {
  canvas: HTMLCanvasElement;
  clientX: number;
  clientY: number;

  constructor(canvas: HTMLCanvasElement, clientX: number, clientY: number) {
    this.canvas = canvas;
    this.clientX = clientX;
    this.clientY = clientY;
  }

  public getMousePosition() {
    var rect = this.canvas.getBoundingClientRect();
    return {
      x: this.clientX - rect.left + 7,
      y: this.clientY - rect.top + 7,
    };
  }
}

export default Mouse;
