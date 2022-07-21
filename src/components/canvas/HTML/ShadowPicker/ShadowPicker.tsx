import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedElement, updateElement } from '../../../../state/canvas';
import { setBlur, setX, setY } from '../../../../state/shadowPicker';
import { RootState } from '../../../../state/store';
import ColorParent from '../ColorPicker/ColorParent/ColorParent';
import './ShadowPicker.css';

const ShadowPicker: React.FC = () => {
  const dispatch = useDispatch();

  const { displayShadowPicker, shadowOffsetX, shadowOffsetY, shadowBlur } =
    useSelector((state: RootState) => state.shadowPicker);
  const { selectedElement } = useSelector((state: RootState) => state.canvas);

  function getShadowValue() {
    if (!selectedElement) return { shadowOffsetX, shadowOffsetY, shadowBlur };
    const {
      shadowOffsetX: x,
      shadowOffsetY: y,
      shadowBlur: blur,
    } = selectedElement as any;
    return { shadowOffsetX: x, shadowOffsetY: y, shadowBlur: blur };
  }

  function handleChange(e: ChangeEvent) {
    const value = parseInt((e.target as HTMLInputElement).value) || 0;
    var cSE = { ...(selectedElement as any) };
    switch ((e.target as HTMLInputElement).dataset.name) {
      case 'shadowOffsetX':
        dispatch(setX({ shadowOffsetX: value }));
        if (!selectedElement) return;
        cSE.shadowOffsetX = value;
        break;
      case 'shadowOffsetY':
        dispatch(setY({ shadowOffsetY: value }));
        if (!selectedElement) return;
        cSE.shadowOffsetY = value;
        break;
      case 'shadowBlur':
        dispatch(setBlur({ shadowBlur: value }));
        if (!selectedElement) return;
        cSE.shadowBlur = value;
        break;
      default:
        break;
    }
    dispatch(setSelectedElement({ selectedElement: cSE }));
    dispatch(updateElement({ id: cSE.id, updatedElement: cSE }));
  }

  return displayShadowPicker ? (
    <div className="editor-shadow__values-container">
      <div className="editors-panel__row">
        <div className="editors-panel__row-item">
          <span className="shadow-values__item-label">X</span>
          <input
            className="shadow-values__item-input"
            placeholder="0"
            type="number"
            data-name="shadowOffsetX"
            value={getShadowValue().shadowOffsetX}
            onChange={handleChange}
          />
        </div>
        <div className="editors-panel__row-item">
          <span className="shadow-values__item-label">Y</span>
          <input
            className="shadow-values__item-input"
            placeholder="0"
            type="number"
            data-name="shadowOffsetY"
            value={getShadowValue().shadowOffsetY}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="editors-panel__row">
        <div className="editors-panel__row-item">
          <span className="shadow-values__item-label">Blur</span>
          <input
            className="shadow-values__item-input"
            placeholder="0"
            type="number"
            data-name="shadowBlur"
            value={getShadowValue().shadowBlur}
            onChange={handleChange}
          />
        </div>
      </div>
      <ColorParent />
    </div>
  ) : (
    <></>
  );
};

export default ShadowPicker;
