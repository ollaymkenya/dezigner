import React, { ChangeEvent, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { setCanvasMode, setCursor } from '../../../state/toolsPanel';
import { setColorMode } from '../../../state/colorPicker';
import { setElement } from '../../../state/canvas';

import './ToolItem.css';
import ChevronDown from '../../../assets/images/chevron-down-outline.svg';

import ImageInterface from '../interfaces.tools';
import Dezigner from '../../canvas/Elements/Dezigner';
import { RootState } from '../../../state/store';

interface ImageElementInterface extends ImageInterface {
  index: number;
  type: string;
}

var dezigner: Dezigner;

const ToolItem: React.FC<ImageElementInterface> = (tool) => {
  const dispatch = useDispatch();
  const { canvasMode } = useSelector((state: RootState) => state.toolsPanel);

  useLayoutEffect(() => {
    // creating the canvas and context
    var canvas = document.getElementById('canvas')! as HTMLCanvasElement;
    var context = canvas.getContext('2d')!;
    dezigner = new Dezigner(canvas, context);
  });

  function handleOnChange(e: ChangeEvent) {
    e.preventDefault();
    const image = ((e.target! as HTMLInputElement).files as FileList)[0];
    var reader = new FileReader();
    var element;

    reader.readAsDataURL(image);
    reader.onloadend = () => {
      var img = new Image();
      img.onload = () => {
        element = dezigner.create({
          id: uuidv4(),
          name: 'Graphic',
          visible: true,
          unlocked: true,
          editing: false,
          type: canvasMode,
          imageData: reader.result as string,
          x: 0,
          y: 0,
          width: img.width,
          height: img.height,
        });
        dispatch(setElement({ element }));
      };
      img.src = reader.result as string;
    };
    dispatch(setCanvasMode({ canvasMode: 'Default' }));
  }

  function handleOnClick(e: React.MouseEvent, toolName: string) {
    dispatch(
      setColorMode({ colorMode: toolName === 'Default' ? 'Canvas' : 'Element' })
    );
  }

  return (
    <li className="tool-icon__item">
      {tool.name === 'Image' && (
        <input
          className="image-input"
          type="file"
          accept="image/*"
          onClick={() => {
            dispatch(setCanvasMode({ canvasMode: tool.name }));
            dispatch(setColorMode({ colorMode: 'canvas' }));
            dispatch(setCursor({ cursor: 'Default' }));
          }}
          onChange={handleOnChange}
        />
      )}
      <div
        className="tool-icon__parent"
        onClick={(e) => {
          e.preventDefault();
          handleOnClick(e as React.MouseEvent, tool.name);
          dispatch(setCanvasMode({ canvasMode: tool.name }));
          dispatch(setCursor({ cursor: tool.name }));
        }}
      >
        <div className="tool-icon__image">
          <img src={tool.src} alt={tool.name} width={tool.width} />
        </div>
        {tool.children && (
          <span className="tool-icon__chevron">
            <img src={ChevronDown} alt="chevron down" width="12" />
          </span>
        )}
      </div>
      {tool.children && (
        <ul
          className="tool-icon__children"
          style={{
            position: 'absolute',
            top: '37px',
            left: tool.type === 'drawing' ? `${tool.index - 2}px` : '-150px',
            right: tool.type === 'personalization' ? '0px' : 'auto',
          }}
        >
          {tool.children.map((currentImage, index) => {
            return (
              <li
                className="tool-icon__child"
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  handleOnClick(e as React.MouseEvent, tool.name);
                  dispatch(setCanvasMode({ canvasMode: currentImage.name }));
                  dispatch(setCursor({ cursor: tool.name }));
                }}
              >
                <div className="tool-icon__child-item">
                  <img
                    src={currentImage.src}
                    alt={currentImage.name}
                    width={currentImage.width}
                  />
                  <span className="tool-icon__child-name">
                    {currentImage.name}
                  </span>
                </div>
                <span className="tool-icon__item-shortcut">
                  {true && currentImage.shortcut}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
};

export default ToolItem;
