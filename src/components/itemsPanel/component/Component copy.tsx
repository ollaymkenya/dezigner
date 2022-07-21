import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../state/store';

import {
  setLock,
  removeElement,
  setVisible,
  setEditing,
  editName,
  setOpen,
} from '../../../state/canvas';

import './Component.css';

import CaretForward from '../../../assets/images/caret-forward-outline.svg';
import ComponentIcon from '../../../assets/images/component-outline.svg';
import Unlock from '../../../assets/images/lock-open-outline.svg';
import Lock from '../../../assets/images/lock-closed-outline.svg';
import Visible from '../../../assets/images/eye-outline.svg';
import Invisible from '../../../assets/images/eye-off-outline.svg';

import ComponentInterface from '../interfaces.itemspanel';

const Component: React.FC<ComponentInterface> = (item) => {
  const { elements } = useSelector((state: RootState) => state.canvas);
  const dispatch = useDispatch();

  return (
    <li
      className="panel-layer__component-item"
      tabIndex={0}
      onKeyUp={(e) => {
        e.stopPropagation();
        e.code === 'Delete' &&
          !item.editing &&
          dispatch(removeElement({ item }));
      }}
    >
      <div className="panel-layer__component">
        <div
          className={
            'panel-layer__component-parent' + (item.children ? '' : ' child')
          }
        >
          <div
            className="layer-content"
            onDoubleClick={(e) => {
              dispatch(setEditing({ id: item.id, isEditing: true }));
            }}
          >
            {item.children && (
              <div
                className="layer-dropdown"
                onClick={(e) => {
                  dispatch(setOpen({ id: item.id }));
                }}
              >
                <img
                  src={CaretForward}
                  alt="caret-forward"
                  width="8px"
                  style={{
                    transition: 'transform .125s ease-in',
                    transform: item.opened ? 'rotate(40deg)' : 'rotate(0deg)',
                  }}
                />
              </div>
            )}
            <div className="layer-icon">
              <img src={ComponentIcon} alt="component icon" />
            </div>
            <div className="layer-title">
              {item.editing || <span>{item.name}</span>}
              {item.editing && (
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) =>
                    dispatch(editName({ id: item.id, name: e.target.value }))
                  }
                  onKeyUp={(e) =>
                    e.code === 'Enter' &&
                    dispatch(setEditing({ id: item.id, isEditing: false }))
                  }
                  onBlur={() =>
                    dispatch(setEditing({ id: item.id, isEditing: false }))
                  }
                  autoFocus
                />
              )}
            </div>
          </div>
          <div className="layer-mode__tools">
            <div
              className="layer-locked__mode"
              onClick={(e) => {
                dispatch(
                  setLock({ item, unlocked: item.unlocked ? false : true })
                );
              }}
            >
              <img
                src={item.unlocked ? Unlock : Lock}
                alt={item.unlocked ? 'unlocked mode' : 'locked mode'}
                width="12px"
              />
            </div>
            <div
              className="layer-visibleinvisible__mode"
              onClick={() =>
                dispatch(
                  setVisible({ item, visible: item.visible ? false : true })
                )
              }
            >
              <img
                src={item.visible ? Visible : Invisible}
                alt={item.visible ? 'visible mode' : 'invisble mode'}
                width="12px"
              />
            </div>
          </div>
        </div>
        {item.children && (
          <ul
            className="panel-layers"
            style={{
              transform: item.opened ? 'translateY(0%)' : 'translateY(-100%)',
              opacity: item.opened ? '1' : '0',
              height: item.opened ? '100%' : '0',
            }}
          >
            {elements.map((component, index) => {
              return (
                component.parentId === item.id && (
                  <Component
                    id={component.id}
                    parentId={component.parentId}
                    name={component.name}
                    visible={component.visible}
                    unlocked={component.unlocked}
                    editing={component.editing}
                    opened={component.opened}
                    key={index}
                    type={component.type}
                    children={component.children}
                  />
                )
              );
            })}
          </ul>
        )}
      </div>
    </li>
  );
};

export default Component;
