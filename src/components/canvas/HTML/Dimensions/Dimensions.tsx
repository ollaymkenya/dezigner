import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../state/store';

import Angle from '../../../../assets/images/angle.svg';
import Width from '../../../../assets/images/width.svg';
import Height from '../../../../assets/images/height.svg';
import Circle from '../../../../assets/images/circle.svg';

import { setDimensions } from '../../../../state/dimensions';
import { setSelectedElement, updateElement } from '../../../../state/canvas';
import Line from '../../Elements/Line/Line';

const Dimensions: React.FC = () => {
  const dispatch = useDispatch();

  const { canvasMode } = useSelector((state: RootState) => state.toolsPanel);
  const { selectedElement } = useSelector((state: RootState) => state.canvas);
  const { dimensions } = useSelector((state: RootState) => state.dimensions);

  type dimensionKey = keyof typeof dimensions;

  function handleChange(e: React.ChangeEvent) {
    //  changing the view from editors panel
    let newDimensions = { ...dimensions };
    let keyOfProperty = (e.target as HTMLInputElement).dataset.name as string;
    newDimensions[keyOfProperty as dimensionKey] =
      parseFloat((e.target as HTMLInputElement).value) || 0;
    if ((selectedElement! as any).type === 'Line') {
      const { angle, length } = Line.getLengthAndAngle(
        newDimensions.x1,
        newDimensions.y1,
        newDimensions.x2,
        newDimensions.y2
      );
      newDimensions.angle = parseFloat(angle.toFixed(2));
      newDimensions.length = parseFloat(length.toFixed(2));
    }
    dispatch(setDimensions({ dimensions: newDimensions }));

    // changing the element value in the real element
    if (!selectedElement) return;
    var cSE = { ...(selectedElement as any) };
    cSE[keyOfProperty] = parseFloat((e.target as HTMLInputElement).value);
    if (cSE!.type === 'Line') {
      const { angle, length } = Line.getLengthAndAngle(
        cSE.x1,
        cSE.y1,
        cSE.x2,
        cSE.y2
      );
      cSE.angle = parseFloat(angle.toFixed(2));
      cSE.length = parseFloat(length.toFixed(2));
    }
    dispatch(setSelectedElement({ selectedElement: cSE }));
    dispatch(updateElement({ id: cSE!.id, updatedElement: cSE }));
  }

  function confirmShowXY() {
    if (!selectedElement) {
      return canvasMode === 'Rectangle' || canvasMode === 'Text';
    }
    var { type } = selectedElement as any;
    return (
      canvasMode === 'Rectangle' ||
      canvasMode === 'Text' ||
      ((canvasMode === 'Rectangle' ||
        canvasMode === 'Resizing' ||
        canvasMode === 'Selection') &&
        type === 'Rectangle') ||
      ((canvasMode === 'Text' ||
        canvasMode === 'Resizing' ||
        canvasMode === 'Selection') &&
        type === 'Text') ||
      ((canvasMode === 'Image' ||
        canvasMode === 'Resizing' ||
        canvasMode === 'Selection') &&
        type === 'Image') ||
      ((canvasMode === 'Ellipse' ||
        canvasMode === 'Resizing' ||
        canvasMode === 'Selection') &&
        type === 'Ellipse')
    );
  }

  function confirmShowWidthHeight() {
    if (!selectedElement) {
      return canvasMode === 'Rectangle' || canvasMode === 'Text';
    }
    var { type } = selectedElement as any;
    return (
      canvasMode === 'Rectangle' ||
      canvasMode === 'Text' ||
      ((canvasMode === 'Rectangle' ||
        canvasMode === 'Selection' ||
        canvasMode === 'Resizing') &&
        type === 'Rectangle') ||
      ((canvasMode === 'Text' ||
        canvasMode === 'Selection' ||
        canvasMode === 'Resizing') &&
        type === 'Text') ||
      ((canvasMode === 'Image' ||
        canvasMode === 'Selection' ||
        canvasMode === 'Resizing') &&
        type === 'Image')
    );
  }

  function confirmShowAngleAndLength() {
    if (!selectedElement) {
      return canvasMode === 'Line';
    }
    var { type } = selectedElement as any;
    return (
      canvasMode === 'Line' ||
      ((canvasMode === 'Line' ||
        canvasMode === 'Selection' ||
        canvasMode === 'Resizing') &&
        type === 'Line')
    );
  }

  function confirmShowRadius() {
    if (!selectedElement) return canvasMode === 'Ellipse';
    var { type } = selectedElement as any;
    return (
      canvasMode === 'Ellipse' ||
      ((canvasMode === 'Ellipse' ||
        canvasMode === 'Selection' ||
        canvasMode === 'Resizing') &&
        type === 'Ellipse')
    );
  }

  return (
    <>
      {canvasMode !== 'Default' && (
        <div className="editors-panel__container">
          <span className="editors-panel__title">Dimensions</span>
          <div className="editors-panel__inner-container">
            {confirmShowXY() && (
              <div className="editors-panel__row">
                <div className="editors-panel__row-item">
                  <span className="dimensions-values__item-label">X</span>
                  <input
                    className="dimensions-values__item-input"
                    placeholder="0"
                    type="number"
                    data-name="x"
                    value={dimensions.x}
                    onChange={handleChange}
                  />
                </div>
                <div className="editors-panel__row-item">
                  <span className="dimensions-values__item-label">Y</span>
                  <input
                    className="dimensions-values__item-input"
                    placeholder="0"
                    type="number"
                    value={dimensions.y}
                    data-name="y"
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}
            {confirmShowAngleAndLength() && (
              <>
                <div className="editors-panel__row">
                  <div className="editors-panel__row-item">
                    <span className="dimensions-values__item-label">X1</span>
                    <input
                      className="dimensions-values__item-input"
                      placeholder="0"
                      type="number"
                      data-name="x1"
                      value={dimensions.x1}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="editors-panel__row-item">
                    <span className="dimensions-values__item-label">Y1</span>
                    <input
                      className="dimensions-values__item-input"
                      placeholder="0"
                      type="number"
                      value={dimensions.y1}
                      data-name="y1"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="editors-panel__row">
                  <div className="editors-panel__row-item">
                    <span className="dimensions-values__item-label">X2</span>
                    <input
                      className="dimensions-values__item-input"
                      placeholder="0"
                      type="number"
                      data-name="x2"
                      value={dimensions.x2}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="editors-panel__row-item">
                    <span className="dimensions-values__item-label">Y2</span>
                    <input
                      className="dimensions-values__item-input"
                      placeholder="0"
                      type="number"
                      value={dimensions.y2}
                      data-name="y2"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </>
            )}
            {confirmShowWidthHeight() && (
              <div className="editors-panel__row">
                <div className="editors-panel__row-item">
                  <img src={Width} alt="width" />
                  <input
                    className="dimensions-values__item-input"
                    placeholder="0"
                    type="number"
                    value={dimensions.width}
                    data-name="width"
                    onChange={handleChange}
                  />
                </div>
                <div className="editors-panel__row-item">
                  <img src={Height} alt="height" />
                  <input
                    className="dimensions-values__item-input"
                    placeholder="0"
                    type="number"
                    value={dimensions.height}
                    data-name="height"
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}
            {confirmShowAngleAndLength() && (
              <div className="editors-panel__row">
                <div className="editors-panel__row-item">
                  <span className="dimensions-values__item-label">
                    <img src={Angle} alt="angle" />
                  </span>
                  <input
                    className="dimensions-values__item-input"
                    placeholder="0"
                    type="number"
                    data-name="angle"
                    value={dimensions.angle}
                    onChange={() => {}}
                  />
                </div>
                <div className="editors-panel__row-item">
                  <span className="dimensions-values__item-label">
                    <img src={Width} alt="length" />
                  </span>
                  <input
                    className="dimensions-values__item-input"
                    placeholder="0"
                    type="number"
                    data-name="length"
                    value={dimensions.length}
                    onChange={() => {}}
                  />
                </div>
              </div>
            )}
            {confirmShowRadius() && (
              <div className="editors-panel__row">
                <div className="editors-panel__row-item">
                  <span className="dimensions-values__item-label">
                    <img src={Circle} alt="border radius" />
                  </span>
                  <input
                    className="dimensions-values__item-input"
                    placeholder="0"
                    type="number"
                    data-name="radius"
                    value={dimensions.radius}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Dimensions;
