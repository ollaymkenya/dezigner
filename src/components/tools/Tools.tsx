import React from 'react';

import './Tools.css';

import ToolItem from './toolItem/ToolItem';
import { personalization, tools } from '../../state/stateData/toolsData';

const Tools: React.FC = () => {
  return (
    <div className="tools">
      <ul className="tool-icons">
        {tools.map((image, index) => {
          return (
            <ToolItem
              src={image.src}
              name={image.name}
              width={image.width}
              children={image.children}
              key={index}
              index={index}
              type="drawing"
            />
          );
        })}
      </ul>
      <div className="project-name">
        <span>First project </span>
        <span> / </span>
        <strong> Dezignr</strong>
      </div>
      <ul className="tool-icons">
        {personalization.map(function (image, index) {
          return (
            <ToolItem
              src={image.src}
              name={image.name}
              width={image.width}
              children={image.children}
              index={index}
              type="personalization"
              key={index}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Tools;
