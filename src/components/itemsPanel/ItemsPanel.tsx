import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import Component from './component/Component';

import './ItemsPanel.css';

const ItemTab: React.FC = () => {
  const { elements } = useSelector((state: RootState) => state.canvas);

  return (
    <div className="item-panel">
      <div className="item-panel_title">
        <div className="item-panel__categories">
          <span>Layers
          </span>
        </div> 
      </div>
      <ul className="panel-layers">
        {elements.map((item, index) => {
          return (
            !item.parentId && (
              <Component
                id={item.id}
                name={item.name}
                visible={item.visible}
                unlocked={item.unlocked}
                editing={item.editing}
                opened={item.opened}
                key={index}
                type={item.type}
                children={item.children}
              />
            )
          );
        })}
      </ul>
    </div>
  );
};

export default ItemTab;
