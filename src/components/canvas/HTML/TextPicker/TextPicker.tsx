import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../state/store';

import {
  fontFill,
  fonts,
  fontStyle,
  fontWeight,
  textAlign,
  textBaseline,
} from '../../../../state/stateData/textPickerData';

import './TextPicker.css';

import {
  setFillOrStroke,
  setFontFamily,
  setFontSize,
  setFontStyle,
  setFontWeight,
  setTextAlign,
  setTextBaseline,
} from '../../../../state/textPicker';
import { setSelectedElement, updateElement } from '../../../../state/canvas';

const TextPicker: React.FC = () => {
  const { selectedElement } = useSelector((state: RootState) => state.canvas);
  const dispatch = useDispatch();

  function handleChangeFontFamily(e: React.ChangeEvent) {
    dispatch(
      setFontFamily({ fontFamily: (e.target as HTMLSelectElement).value })
    );
    if (!selectedElement) return;
    var cSE = { ...(selectedElement as any) };
    cSE.fontFamily = (e.target as HTMLSelectElement).value;
    cSE.fontFace = (e.target as HTMLSelectElement).value.split(' ')[0];
    dispatch(setSelectedElement({ selectedElement: cSE }));
    return dispatch(updateElement({ id: cSE.id, updatedElement: cSE }));
  }

  function handleChangeFontWeight(e: React.ChangeEvent) {
    dispatch(
      setFontWeight({
        fontWeight: parseInt((e.target as HTMLSelectElement).value),
      })
    );
    if (!selectedElement) return;
    var cSE = { ...(selectedElement as any) };
    cSE.fontWeight = parseInt((e.target as HTMLSelectElement).value);
    dispatch(setSelectedElement({ selectedElement: cSE }));
    return dispatch(updateElement({ id: cSE.id, updatedElement: cSE }));
  }

  function handleFontSize(e: React.ChangeEvent) {
    dispatch(
      setFontSize({ fontSize: parseInt((e.target as HTMLSelectElement).value) })
    );
    if (!selectedElement) return;
    var cSE = { ...(selectedElement as any) };
    cSE.fontSize = parseInt((e.target as HTMLSelectElement).value);
    dispatch(setSelectedElement({ selectedElement: cSE }));
    return dispatch(updateElement({ id: cSE.id, updatedElement: cSE }));
  }

  function handleChangeFillOrStroke(e: React.ChangeEvent) {
    dispatch(
      setFillOrStroke({ fillOrStroke: (e.target as HTMLSelectElement).value })
    );
    if (!selectedElement) return;
    var cSE = { ...(selectedElement as any) };
    cSE.fillOrStroke = (e.target as HTMLSelectElement).value;
    dispatch(setSelectedElement({ selectedElement: cSE }));
    return dispatch(updateElement({ id: cSE.id, updatedElement: cSE }));
  }

  function handleChangeFontStyle(e: React.ChangeEvent) {
    dispatch(
      setFontStyle({ fontStyle: (e.target as HTMLSelectElement).value })
    );
    if (!selectedElement) return;
    var cSE = { ...(selectedElement as any) };
    cSE.fontStyle = (e.target as HTMLSelectElement).value;
    dispatch(setSelectedElement({ selectedElement: cSE }));
    return dispatch(updateElement({ id: cSE.id, updatedElement: cSE }));
  }

  function handleChangeTextBaseline(e: React.ChangeEvent) {
    dispatch(
      setTextBaseline({ textBaseline: (e.target as HTMLSelectElement).value })
    );
    if (!selectedElement) return;
    var cSE = { ...(selectedElement as any) };
    cSE.textBaseline = (e.target as HTMLSelectElement).value;
    dispatch(setSelectedElement({ selectedElement: cSE }));
    return dispatch(updateElement({ id: cSE.id, updatedElement: cSE }));
  }

  function handleChangeTextAlign(e: React.ChangeEvent) {
    dispatch(
      setTextAlign({ textAlign: (e.target as HTMLSelectElement).value })
    );
    if (!selectedElement) return;
    var cSE = { ...(selectedElement as any) };
    cSE.textAlign = (e.target as HTMLSelectElement).value;
    dispatch(setSelectedElement({ selectedElement: cSE }));
    return dispatch(updateElement({ id: cSE.id, updatedElement: cSE }));
  }

  const {
    fontFamily,
    fontWeight: fWeight,
    fontSize,
    fillOrStroke,
    textBaseline: tBaseline,
    textAlign: tAlign,
    fontStyle: fStyle,
  } = useSelector((state: RootState) => state.textPicker);
  const { canvasMode } = useSelector((state: RootState) => state.toolsPanel);
  return (
    <>
      {canvasMode === 'Text' && (
        <div className="editors-panel__container">
          <span className="editors-panel__title">Text</span>
          <div className="editors-panel__inner-container">
            <div className="editors-panel__row">
              <div className="editors-panel__row-item">
                <select
                  className="editors-panel__text"
                  name="fontFamily"
                  id="fontFamily"
                  defaultValue={fontFamily}
                  onChange={handleChangeFontFamily}
                >
                  {fonts.map((font) => {
                    return (
                      <option
                        key={font.fontFamily + font.fontVariant}
                        value={font.fontVariant + ' ' + font.fontFamily}
                      >
                        {font.fontFamily}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="editors-panel__row">
              <div className="editors-panel__row-item">
                <select
                  className="editors-panel__text"
                  name="fontWeight"
                  id="fontWeight"
                  defaultValue={fWeight}
                  onChange={handleChangeFontWeight}
                >
                  {fontWeight.map((fw) => {
                    return (
                      <option key={fw.value + fw.name} value={fw.value}>
                        {fw.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="editors-panel__row-item">
                <input
                  className="font-size__input"
                  placeholder="0"
                  type="number"
                  value={fontSize}
                  onChange={handleFontSize}
                />
              </div>
            </div>
            <div className="editors-panel__row">
              <div className="editors-panel__row-item">
                <select
                  className="editors-panel__text"
                  name="fontFill"
                  id="fontFill"
                  defaultValue={fillOrStroke}
                  onChange={handleChangeFillOrStroke}
                >
                  {fontFill.map((fF) => {
                    return (
                      <option key={fF} value={fF}>
                        {fF}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="editors-panel__row">
              <div className="editors-panel__row-item">
                <select
                  className="editors-panel__text"
                  name="fontStyle"
                  id="fontStyle"
                  defaultValue={fStyle}
                  onChange={handleChangeFontStyle}
                >
                  {fontStyle.map((fs) => (
                    <option key={fs} value={fs}>
                      {fs}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="editors-panel__row">
              {textBaseline.map((tB) => {
                return (
                  <div key={tB.id} className="editors-panel__row-item">
                    <label
                      className="radio-input"
                      htmlFor={tB.id}
                      style={{
                        backgroundColor: `${
                          tBaseline === tB.value ? '#e5e5e5' : '#ffffff'
                        }`,
                      }}
                    >
                      <img src={tB.image} alt={tB.alt} />
                    </label>
                    <input
                      type="radio"
                      name="textBaseline"
                      id={tB.id}
                      value={tB.value}
                      onChange={handleChangeTextBaseline}
                    />
                  </div>
                );
              })}
              {textAlign.map((tA) => {
                return (
                  <div
                    key={tA.id + tA.value + tA.alt}
                    className="editors-panel__row-item"
                  >
                    <label
                      className="radio-input"
                      htmlFor={tA.id}
                      style={{
                        backgroundColor: `${
                          tAlign === tA.value ? '#e5e5e5' : '#ffffff'
                        }`,
                      }}
                    >
                      <img src={tA.image} alt={tA.alt} />
                    </label>
                    <input
                      type="radio"
                      name="textAlign"
                      id={tA.id}
                      value={tA.value}
                      onChange={handleChangeTextAlign}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TextPicker;
