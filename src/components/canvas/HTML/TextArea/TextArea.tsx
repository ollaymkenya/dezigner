import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAction, setSelectedElement, updateElement } from '../../../../state/canvas';
import dimensions, { setDimensions } from '../../../../state/dimensions';
import { RootState } from '../../../../state/store';
import {
  setMessage,
  setTextHeight,
  setTextWidth,
} from '../../../../state/textArea';
import { dezigner } from '../../Elements/Canvas/Canvas';

import './TextArea.css';

const TextArea: React.FC = () => {
  const dispatch = useDispatch();
  const { action, elements } = useSelector((state: RootState) => state.canvas);
  const { message, textWidth, textHeight } = useSelector(
    (state: RootState) => state.textArea
  );
  const { canvasMode } = useSelector((state: RootState) => state.toolsPanel);
  function updateDimensionsInEditrosView(element: any) {
    const { x, y, width, height } = element;
    return { x, y, width, height };
  }

  function updateEditorsView(element: any) {
    var updatedEditorsDimensions = updateDimensionsInEditrosView(element);

    dispatch(
      setDimensions({
        dimensions: { ...dimensions, ...updatedEditorsDimensions },
      })
    );
  }

  function handleUpdate(
    previousElement: any,
    e: MouseEvent | ChangeEvent,
    updateMode: string
  ) {
    var properties = {
      message: (e.target as HTMLInputElement).value,
    };
    var element = dezigner.update(properties, previousElement, updateMode);
    dispatch(setSelectedElement({ selectedElement: element }));
    dispatch(
      updateElement({ id: previousElement.id, updatedElement: element })
    );
    updateEditorsView(element);
  }

  function handleBlur() {
    dispatch(setAction({ action: 'none' }));
    dispatch(setMessage({ message: '' }));
    dispatch(setTextWidth({ width: 1 }));
    dispatch(setTextHeight({ height: 1 }));
  }

  function handleOnTextChange(e: ChangeEvent) {
    switch (action) {
      case 'typing':
        handleUpdate(elements[elements.length - 1], e, action);
        return dispatch(
          setMessage({ message: (e.target as HTMLTextAreaElement).value })
        );
      default:
        break;
    }
  }

  return (
    <>
      {canvasMode === 'Text' && action === 'typing' && (
        <div
          id="fake-input"
          className="fake-input"
          style={{
            position: 'absolute',
            top: `${elements[elements.length - 1].y - 38}px`,
            left: `${elements[elements.length - 1].x - 190}px`,
            border: '1px solid',
            color: 'black',
          }}
        >
          <textarea
            name="fake-input"
            value={message}
            onChange={handleOnTextChange}
            onBlur={handleBlur}
            spellCheck="false"
            style={{
              width: `${textWidth + 5}px`,
              height: `${textHeight}px`,
              border: 'none',
              resize: 'none',
              outline: 'none',
            }}
          ></textarea>
        </div>
      )}
    </>
  );
};

export default TextArea;
