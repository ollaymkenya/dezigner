import { useDispatch, useSelector } from 'react-redux';
import {
  setDisplayColorPicker,
  setPosition,
} from '../../../../../state/colorPicker';
import { RootState } from '../../../../../state/store';

import './ColorParent.css';

const ColorParent: React.FC = () => {
  const dispatch = useDispatch();

  const { color, colorMode, canvasColor, borderColor, shadowColor } =
    useSelector((state: RootState) => state.colorPicker);
  // const { canvasMode } = useSelector((state: RootState) => state.toolsPanel);
  const { selectedElement } = useSelector((state: RootState) => state.canvas);

  function getRequiredColor() {
    switch (colorMode) {
      case 'Canvas':
        return canvasColor;
      case 'Element':
        return color;
      case 'Border':
        return borderColor;
      case 'Shadow':
        return shadowColor;
      default:
        if (selectedElement) return (selectedElement! as any).color;
        return color;
    }
  }

  function handleClick(e: React.MouseEvent) {
    var top =
      e.clientY >= 44 && e.clientY <= 64
        ? 44
        : e.clientY >= 152 && e.clientY <= 172
        ? 152
        : 220;

    dispatch(
      setPosition({ position: { top, left: 0, right: 190, bottom: 0 } })
    );
    dispatch(setDisplayColorPicker({ displayColorPicker: true }));
  }

  return (
    <div className="color-parent">
      <div className="editors-panel__row">
        <div onClick={handleClick} className="editors-panel__row-item">
          <div
            className="editors-current__color-image"
            style={{
              backgroundColor: `rgba(${getRequiredColor().rgb.r}, ${
                getRequiredColor().rgb.g
              }, ${getRequiredColor().rgb.b}, ${getRequiredColor().rgb.a})`,
              width: '20px',
              minWidth: '20px',
              height: '20px',
            }}
          ></div>
          <div className="editors-current__color-code">
            <span>{getRequiredColor().hex}</span>
          </div>
          <div className="editors-current__color-opacity">
            <span>{parseInt((getRequiredColor().hsl.a * 100).toString())}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorParent;
