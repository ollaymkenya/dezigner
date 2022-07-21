import { useSelector, useDispatch } from 'react-redux';
import Line from '../../../../../assets/images/line-weight.svg';
import { RootState } from '../../../../../state/store';
import { setDisplayLinePicker } from '../../../../../state/linePicker';
import { setColorMode } from '../../../../../state/colorPicker';

const LineParent: React.FC = () => {
  const dispatch = useDispatch();

  const { canvasMode } = useSelector((state: RootState) => state.toolsPanel);
  const { selectedElement } = useSelector((state: RootState) => state.canvas);
  const { displayLinePicker } = useSelector(
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

  function handleClick() {
    displayLinePicker === true
      ? dispatch(setColorMode({ colorMode: 'Element' }))
      : dispatch(setColorMode({ colorMode: 'Border' }));
    dispatch(setDisplayLinePicker({ displayLinePicker: !displayLinePicker }));
  }

  return (
    <>
      {confirmDisplay() && (
        <div className="editors-panel__inner-container" onClick={handleClick}>
          <div className="editors-panel__row-start">
            <div className="editors-current__shadow-image">
              <img src={Line} alt="Line widths" />
            </div>
            <div className="editors-effect__type">
              <span>Line</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LineParent;
