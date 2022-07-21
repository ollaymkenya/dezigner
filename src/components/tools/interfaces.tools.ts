export default interface ImageInterface {
  name: string;
  src: string;
  width: string;
  children?: {
    name: string;
    src: string;
    width: string;
    shortcut?: string;
  }[];
}
