import { useSelector, useDispatch } from 'react-redux';
import { setDisplayShadowPicker } from '../../../../../state/shadowPicker';
import { RootState } from '../../../../../state/store';

import ShadowImage from '../../../../../assets/images/sunlight.svg';
import { setColorMode } from '../../../../../state/colorPicker';

const ShadowParent: React.FC = () => {
  const dispatch = useDispatch();
  const { canvasMode } = useSelector((state: RootState) => state.toolsPanel);
  const { displayShadowPicker } = useSelector(
    (state: RootState) => state.shadowPicker
  );

  function handleClick(e: React.MouseEvent) {
    dispatch(
      setColorMode({ colorMode: displayShadowPicker ? 'Element' : 'Shadow' })
    );
    dispatch(
      setDisplayShadowPicker({ displayShadowPicker: !displayShadowPicker })
    );
  }

  return (
    <>
      {canvasMode !== 'Default' && (
        <div className="editors-panel__container" onClick={handleClick}>
          <span className="editors-panel__title">Effects</span>
          <div className="editors-panel__inner-container">
            <div className="editors-panel__row-start">
              <div className="editors-current__shadow-image">
                <img src={ShadowImage} alt="Shadow" />
              </div>
              <div className="editors-effect__type">
                <span>Shadow</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShadowParent;
