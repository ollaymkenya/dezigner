import { createSlice } from '@reduxjs/toolkit';
import ComponentInterface from '../components/itemsPanel/interfaces.itemspanel';

export const canvasSlice = createSlice({
  name: 'canvas',
  initialState: {
    action: 'selecting',
    elements: [] as any[],
    selectedElement: null,
  },
  reducers: {
    setAction: (state, action) => {
      state.action = action.payload.action;
    },
    setElement: (state, action) => {
      const element: any = action.payload.element;
      state.elements.push(element);
    },
    updateElement: (state, action) => {
      const index = state.elements.findIndex(
        (element) => element.id === action.payload.id
      );
      state.elements.splice(index, 1, action.payload.updatedElement);
    },
    setSelectedElement(state, action) {
      state.selectedElement = action.payload.selectedElement;
    },
    removeElement: (state, action) => {
      var itemToRemove = state.elements.find(
        (component) => component.id === action.payload.item.id
      );
      var indexOfItemToRemove = state.elements.findIndex(
        (component) => component.id === action.payload.item.id
      );

      function removeChildren(
        itemToRemove: ComponentInterface,
        indexOfItemToRemove: number
      ) {
        //removing the connection from the parent
        var parentOfComponent = state.elements.find(
          (component) => component.id === itemToRemove.parentId
        );
        parentOfComponent &&
          parentOfComponent.children?.splice(
            parentOfComponent.children.findIndex(
              (child: ComponentInterface) => child.id === itemToRemove.id
            ),
            1
          );
        // turning the component into an element if it doesn't have any children
        parentOfComponent &&
          (parentOfComponent?.children!.length ||
            (function () {
              parentOfComponent!.type = 'Element';
              // delete parentOfComponent?.children;
            })());
        // If it is not a parent or all its children have been deleted delete it from here
        if (
          itemToRemove.children === undefined ||
          !itemToRemove.children.length
        ) {
          return state.elements.splice(indexOfItemToRemove, 1);
        }
        //if it has children, we want to go throught each child deleting all their children as well
        var numberToLoop = itemToRemove.children.length;
        for (let i = 0; i < numberToLoop; i++) {
          let child = itemToRemove.children[0];
          let currentComponent = state.elements.find(
            (component) => component.id === child
          );
          let currentComponentIndex = state.elements.findIndex(
            (component) => component.id === child
          );
          removeChildren(
            currentComponent! as ComponentInterface,
            currentComponentIndex
          );
        }
        return state.elements.splice(indexOfItemToRemove, 1);
      }

      // calling the first removeChild method
      removeChildren(itemToRemove! as ComponentInterface, indexOfItemToRemove);
    },
    editName: (state, action) => {
      var indexOfComponentToFind = state.elements.findIndex(
        (component) => component.id === action.payload.id
      );
      state.elements[indexOfComponentToFind].name = action.payload.name;
    },
    setEditing: (state, action) => {
      var indexOfComponentToFind = state.elements.findIndex(
        (component) => component.id === action.payload.id
      );
      state.elements[indexOfComponentToFind].editing = action.payload.isEditing;
    },
    setLock: (state, action) => {
      var componentToFind = state.elements.find(
        (component) => component.id === action.payload.item.id
      )!;

      function lockUnlockChildren(component: ComponentInterface) {
        if (component.children === undefined) {
          return (component.unlocked = action.payload.unlocked);
        }
        component.unlocked = action.payload.unlocked;
        for (let i = 0; i < component.children.length; i++) {
          var currentChildId = component.children[i];
          var currentChild = state.elements.find(
            // eslint-disable-next-line no-loop-func
            (component) => component.id === currentChildId
          )!;
          lockUnlockChildren(currentChild as ComponentInterface);
        }
      }

      lockUnlockChildren(componentToFind as ComponentInterface);
    },
    setVisible: (state, action) => {
      var componentToFind = state.elements.find(
        (component) => component.id === action.payload.item.id
      )!;

      function visibleChildren(component: ComponentInterface) {
        if (component.children === undefined) {
          return (component.visible = action.payload.visible);
        }
        component.visible = action.payload.visible;
        for (let i = 0; i < component.children.length; i++) {
          var currentChildId = component.children[i];
          var currentChild = state.elements.find(
            // eslint-disable-next-line no-loop-func
            (component) => component.id === currentChildId
          )!;
          visibleChildren(currentChild as ComponentInterface);
        }
      }

      visibleChildren(componentToFind as ComponentInterface);
    },
    setOpen: (state, action) => {
      var indexOfComponentToFind = state.elements.findIndex(
        (component) => component.id === action.payload.id
      );
      state.elements[indexOfComponentToFind].opened =
        !state.elements[indexOfComponentToFind].opened;
    },
  },
});

export const {
  setAction,
  setElement,
  updateElement,
  removeElement,
  setSelectedElement,
  setLock,
  setOpen,
  setVisible,
  setEditing,
  editName,
} = canvasSlice.actions;
export default canvasSlice.reducer;
