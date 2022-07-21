import React, { ChangeEvent, MouseEvent, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../state/store';
import { v4 as uuidv4 } from 'uuid';

import './Canvas.css';

import {
  setAction,
  setElement,
  setSelectedElement,
  updateElement,
} from '../../../../state/canvas';
import { setCanvasMode, setCursor } from '../../../../state/toolsPanel';

import Dezigner from '../Dezigner';
import {
  initialShapeColor,
  initialBlackColor,
} from '../../../../state/stateData/colorData';
import { setDimensions } from '../../../../state/dimensions';
import TextArea from '../../HTML/TextArea/TextArea';
import { setTextWidth, setTextHeight } from '../../../../state/textArea';

export var dezigner: Dezigner;

export const Canvas: React.FC = () => {
  const { action, elements, selectedElement } = useSelector(
    (state: RootState) => state.canvas
  );
  const { canvasMode, cursor } = useSelector(
    (state: RootState) => state.toolsPanel
  );
  const { canvasColor } = useSelector((state: RootState) => state.colorPicker);
  const { dimensions } = useSelector((state: RootState) => state.dimensions);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    // creating the canvas and context
    var canvas = document.getElementById('canvas')! as HTMLCanvasElement;
    var context = canvas.getContext('2d')! as CanvasRenderingContext2D;
    context && context.clearRect(0, 0, canvas.width, canvas.height);
    dezigner = new Dezigner(canvas, context);
    elements.forEach((element) => {
      if (element.type === 'Text' && action === 'typing') {
        let { textWidth, textHeight } = dezigner.draw(element)!;
        dispatch(setTextWidth({ textWidth }));
        dispatch(setTextHeight({ textHeight }));
        if (!(element.width === textWidth && element.height === textHeight)) {
          dispatch(
            updateElement({
              id: element.id,
              updatedElement: {
                ...element,
                width: textWidth,
                height: textHeight,
              },
            })
          );
        }
      } else {
        dezigner.draw(element)!;
      }
    });

    setTimeout(() => {
      if (document.querySelector("textarea[name='fake-input']")) {
        (
          document.querySelector(
            "textarea[name='fake-input']"
          ) as HTMLTextAreaElement
        ).focus();
      }
    }, 100);
  }, [elements, cursor, action, dispatch]);

  function positionIsWithinElement(
    clientX: number,
    clientY: number,
    element: any
  ) {
    return dezigner.confirmDragPosition({ element, clientX, clientY });
  }

  function positionIsWithinResizableElement(
    clientX: number,
    clientY: number,
    element: any
  ) {
    return dezigner.confirmResizePosition({ element, clientX, clientY });
  }

  function getElementAtPosition(
    x: number,
    y: number,
    elements: any[],
    action: string
  ) {
    switch (action) {
      case 'dragging':
        return elements[
          elements.lastIndexOf(
            elements.find((element) => positionIsWithinElement(x, y, element))
          )
        ];
      case 'resizing':
        return elements.find((element) =>
          positionIsWithinResizableElement(x, y, element)
        );
      default:
        break;
    }
  }

  function handleSelection(e: MouseEvent) {
    const { clientX, clientY } = e;
    const targetElement = getElementAtPosition(
      clientX,
      clientY,
      elements,
      'dragging'
    );
    console.log({ targetElement, clientX, clientY });
    if (targetElement) {
      dezigner.setOffsetPosition({
        targetElement,
        clientX,
        clientY,
      });
      dispatch(setCursor({ cursor: 'SelectionDown' }));
      dispatch(setSelectedElement({ selectedElement: targetElement }));
      dispatch(setAction({ action: 'dragging' }));
    }
  }

  function handleResizing(e: MouseEvent) {
    const { clientX, clientY } = e;
    const targetElement = getElementAtPosition(
      clientX,
      clientY,
      elements,
      'resizing'
    );
    dispatch(setAction({ action: 'resizing' }));
    dispatch(setSelectedElement({ selectedElement: targetElement }));
  }

  function getRequiredColor() {
    switch (canvasMode) {
      case 'Rectangle':
      case 'Ellipse':
        return initialShapeColor;
      case 'Line':
      case 'Text':
        return initialBlackColor;
      default:
        break;
    }
  }

  function updateDimensionsInEditrosView(element: any) {
    var x, y, width, height, angle, length, radius, x1, y1, x2, y2;
    switch (element.type) {
      case 'Rectangle':
      case 'Text':
      case 'Image':
        x = element.x;
        y = element.y;
        width = element.width;
        height = element.height;
        return { x, y, width, height };
      case 'Line':
        x1 = element.x1;
        y1 = element.y1;
        x2 = element.x2;
        y2 = element.y2;
        angle = element.angle.toFixed(2);
        length = element.length.toFixed(2);
        return { x1, y1, x2, y2, angle, length };
      case 'Ellipse':
        x = element.x;
        y = element.y;
        radius = element.radius;
        return { x, y, radius };
      default:
        return dimensions;
    }
  }

  function updateEditorsView(element: any) {
    var updatedEditorsDimensions = updateDimensionsInEditrosView(element);

    dispatch(
      setDimensions({
        dimensions: { ...dimensions, ...updatedEditorsDimensions },
      })
    );
  }

  function handleCreate(canvasMode: string, e: MouseEvent) {
    // checking if we are actually creating a new text while another exist which means we have to blur first
    if (
      (document.querySelector(
        "textarea[name='fake-input']"
      ) as HTMLTextAreaElement) &&
      action === 'typing'
    ) {
      return;
    }
    const element = dezigner.create({
      id: uuidv4(),
      name: canvasMode,
      type: canvasMode,
      visible: true,
      unlocked: true,
      editing: false,
      x: e.clientX,
      y: e.clientY,
      color: getRequiredColor(),
    });
    dispatch(setElement({ element }));
    dispatch(setSelectedElement({ selectedElement: element }));
    updateEditorsView(element);

    if (canvasMode === 'Text') {
      return dispatch(setAction({ action: 'typing' }));
    }
    return dispatch(setAction({ action: 'drawing' }));
  }

  function handleUpdate(
    previousElement: any,
    e: MouseEvent | ChangeEvent,
    updateMode: string
  ) {
    var properties =
      canvasMode === 'Text'
        ? {
            message: (e.target as HTMLInputElement).value,
          }
        : {
            x: (e as MouseEvent).clientX,
            y: (e as MouseEvent).clientY,
          };
    var element = dezigner.update(properties, previousElement, updateMode);
    dispatch(setSelectedElement({ selectedElement: element }));
    dispatch(
      updateElement({ id: previousElement.id, updatedElement: element })
    );
    updateEditorsView(element);
  }

  function handleMouseDown(e: MouseEvent) {
    switch (canvasMode) {
      case 'Default':
        break;
      case 'Selection':
        handleSelection(e);
        break;
      case 'Resizing':
        handleResizing(e);
        break;
      default:
        handleCreate(canvasMode, e);
        break;
    }
  }

  function handleMouseMove(e: MouseEvent) {
    switch (action) {
      case 'drawing':
        return handleUpdate(elements[elements.length - 1], e, action);
      case 'dragging':
        return handleUpdate(selectedElement, e, action);
      case 'resizing':
        return handleUpdate(selectedElement, e, action);
      default:
        break;
    }
  }

  function handleMouseUp() {
    if (action === 'dragging' || action === 'resizing') {
      dispatch(setCursor({ cursor: 'Selection' }));
      dispatch(setCanvasMode({ canvasMode: 'Selection' }));
    }
    if (canvasMode !== 'Text') {
      dispatch(setAction({ action: 'none' }));
      setSelectedElement(null);
    }
  }

  function handleDoubleClick(e: MouseEvent) {
    const { clientX, clientY } = e;
    const targetElement = getElementAtPosition(
      clientX,
      clientY,
      elements,
      'resizing'
    );
    if (targetElement) {
      dezigner.setResizePosition({
        targetElement,
        clientX,
        clientY,
      });
      const { cursor } = dezigner.getResizePosition({ targetElement })!;
      dispatch(setCursor({ cursor }));
      dispatch(setCanvasMode({ canvasMode: 'Resizing' }));
    }
  }

  return (
    <div className="canvas-container">
      <>
        <canvas
          id="canvas"
          width={window.innerWidth}
          height={window.innerHeight}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onDoubleClick={handleDoubleClick}
          onMouseUp={handleMouseUp}
          style={{
            cursor: `url(${cursor}), auto`,
            backgroundColor: `rgba(${canvasColor.rgb.r}, ${canvasColor.rgb.g}, ${canvasColor.rgb.b}, ${canvasColor.rgb.a})`,
          }}
        >
          <p>
            Your browser does not support HTML5 Canvas. Try Chrome, Firefox or
            any other browser that supports HTML5 Canvas.
          </p>
        </canvas>
        <TextArea />
      </>
    </div>
  );
};

export default Canvas;
