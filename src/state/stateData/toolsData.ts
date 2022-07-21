// tools
import Cursor from '../../assets/images/cursor-fill.svg';
import ArtBoard from '../../assets/images/artboard-outline.svg';
import Rectangle from '../../assets/images/square-outline.svg';
import Line from '../../assets/images/line-outline.svg';
import Ellipse from '../../assets/images/ellipse-outline.svg';
import Image from '../../assets/images/image-outline.svg';
import Text from '../../assets/images/text-outline.svg';
import Selection from '../../assets/images/hand-right-outline.svg';

// personalization
import Play from '../../assets/images/play-outline.svg';
import Zoom from '../../assets/images/zoom-in-outline.svg';
import ZoomOut from '../../assets/images/zoom-out-outline.svg';
import ZoomToFit from '../../assets/images/zoom-to-fit-outline.svg';
import ImageInterface from '../../components/tools/interfaces.tools';

// cursors
import DefaultCursor from '../../assets/images/default.svg';
import ShapeCursor from '../../assets/images/cross-cursor.svg';
import TextCursor from '../../assets/images/ibeam.svg';
import SelectionUpCursor from '../../assets/images/select-mouse-up.svg';
import SelectionDownCursor from '../../assets/images/select-mouse-down.svg';
import HorizontalResizeCursor from '../../assets/images/horizontal-resize.svg';
import VerticalResizeCursor from '../../assets/images/vertical-resize.svg';
import TopRightResizeCursor from '../../assets/images/top-right-resize.svg';
import TopLeftResizeCursor from '../../assets/images/top-left-resize.svg';

export const tools: ImageInterface[] = [
  {
    name: 'Default',
    src: Cursor,
    width: '16px',
  },
  {
    name: 'Frame',
    src: ArtBoard,
    width: '16px',
  },
  {
    name: 'Rectangle',
    src: Rectangle,
    width: '18px',
    children: [
      {
        name: 'Rectangle',
        src: Rectangle,
        width: '16px',
        shortcut: 'R',
      },
      {
        name: 'Line',
        src: Line,
        width: '15px',
        shortcut: 'L',
      },
      {
        name: 'Ellipse',
        src: Ellipse,
        width: '16px',
        shortcut: 'O',
      },
    ],
  },
  {
    name: 'Image',
    src: Image,
    width: '16px',
  },
  {
    name: 'Text',
    src: Text,
    width: '16px',
  },
  {
    name: 'Selection',
    src: Selection,
    width: '16px',
  },
];

export const personalization: ImageInterface[] = [
  {
    name: 'Play',
    src: Play,
    width: '16px',
  },
  {
    name: 'Zoom',
    src: Zoom,
    width: '16px',
    children: [
      {
        name: 'Zoom In',
        src: Zoom,
        width: '16px',
        shortcut: 'ctrl + =',
      },
      {
        name: 'Zoom Out',
        src: ZoomOut,
        width: '16px',
        shortcut: 'ctrl + -',
      },
      {
        name: 'Zoom To Fit',
        src: ZoomToFit,
        width: '16px',
        shortcut: 'ctrl + 1',
      },
    ],
  },
];

export const cursors = {
  Default: DefaultCursor,
  Line: ShapeCursor,
  Rectangle: ShapeCursor,
  Text: TextCursor,
  Selection: SelectionUpCursor,
  SelectionDown: SelectionDownCursor,
  HorizontalResize: HorizontalResizeCursor,
  VerticalResize: VerticalResizeCursor,
  TopRightResize: TopRightResizeCursor,
  TopLeftResize: TopLeftResizeCursor,
} as const;

export type cursorKeys = keyof typeof cursors;