export interface Element {
  id: string;
  type: string;
}

abstract class ElementCreator {
  //  properties
  public abstract properties: any;
  public abstract canvas: HTMLCanvasElement;
  public abstract context: CanvasRenderingContext2D;

  //  methods
  public abstract createElement(): any;
  public abstract createStateData(): any;
  // public abstract updateStateData(previousElement: any): any;
  public abstract drawElement(): void;
}

export default ElementCreator;
