import { useSelector, useDispatch } from 'react-redux';

import Line from '../../../../assets/images/line-weight.svg';
import DashedBorder from '../../../../assets/images/dashed-border.svg';
import SolidBorder from '../../../../assets/images/solid-border.svg';
import { setSelectedElement, updateElement } from '../../../../state/canvas';
import { setLine } from '../../../../state/linePicker';
import { RootState } from '../../../../state/store';
import ColorParent from '../ColorPicker/ColorParent/ColorParent';

import './LinePicker.css';

const LinePicker: React.FC = () => {
  const dispatch = useDispatch();

  const { canvasMode } = useSelector((state: RootState) => state.toolsPanel);
  const { selectedElement } = useSelector((state: RootState) => state.canvas);
  const { displayLinePicker, line } = useSelector(
    (state: RootState) => state.linePicker
  );

  function confirmDisplay() {
    if (!selectedElement) {
      return canvasMode === 'Rectangle' || canvasMode === 'Line';
    }
    var { type } = selectedElement as any;
    return (
      canvasMode === 'Rectangle' ||
      canvasMode === 'Line' ||
      canvasMode === 'Ellipse' ||
      ((canvasMode === 'Rectangle' ||
        canvasMode === 'Selection' ||
        canvasMode === 'Resizing') &&
        type === 'Rectangle') ||
      ((canvasMode === 'Line' ||
        canvasMode === 'Selection' ||
        canvasMode === 'Resizing') &&
        type === 'Line') ||
      ((canvasMode === 'Ellipse' ||
        canvasMode === 'Selection' ||
        canvasMode === 'Resizing') &&
        type === 'Ellipse')
    );
  }

  function handleChange(e: React.ChangeEvent) {
    //  changing the value of the lineWeight in state to be viewed
    dispatch(
      setLine({
        line: {
          ...line,
          lineWeight: parseInt((e.target as HTMLInputElement).value) || 0,
        },
      })
    );

    //  changing the value of the currently selected element
    if (!selectedElement) return;
    var cSE = { ...(selectedElement as any) };
    cSE.lineWeight = parseInt((e.target as HTMLInputElement).value) || 0;
    dispatch(setSelectedElement({ selectedElement: cSE }));
    dispatch(updateElement({ id: cSE.id, updatedElement: { ...cSE } }));
  }

  function handleChangeType(e: React.ChangeEvent) {
    dispatch(
      setLine({
        line: {
          ...line,
          strokeType: (e.target as HTMLInputElement).value,
        },
      })
    );

    //  changing the value of the currently selected element
    if (!selectedElement) return;
    var cSE = { ...(selectedElement as any) };
    cSE.strokeType = (e.target as HTMLInputElement).value;
    dispatch(setSelectedElement({ selectedElement: cSE }));
    dispatch(updateElement({ id: cSE.id, updatedElement: { ...cSE } }));
  }

  return (
    <>
      {confirmDisplay() && displayLinePicker && (
        <div className="editor-line__weight-container">
          <div className="editors-panel__row">
            <div className="editors-panel__row-item">
              <img src={Line} alt="line weight" />
              <input
                className="line-weight__values-item__input"
                placeholder="0"
                type="number"
                value={line.lineWeight}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="editors-panel__row">
            <div className="editors-panel__row-item">
              <label
                className="radio-input"
                htmlFor={'dashedBorder'}
                style={{
                  backgroundColor: `${
                    line.strokeType === 'dashed' ? '#e5e5e5' : '#ffffff'
                  }`,
                }}
              >
                <img src={DashedBorder} alt="dashed border" />
              </label>
              <input
                type="radio"
                name="strokeType"
                id="dashedBorder"
                value="dashed"
                onChange={handleChangeType}
              />
            </div>
            <div className="editors-panel__row-item">
              <label
                className="radio-input"
                htmlFor={'defaultBorder'}
                style={{
                  backgroundColor: `${
                    line.strokeType === 'default' ? '#e5e5e5' : '#ffffff'
                  }`,
                }}
              >
                <img src={SolidBorder} alt="default border" />
              </label>
              <input
                type="radio"
                name="strokeType"
                id="defaultBorder"
                value="default"
                onChange={handleChangeType}
              />
            </div>
          </div>
          <ColorParent />
        </div>
      )}
    </>
  );
};

export default LinePicker;
