import React from 'react';

import './EditorsPanel.css';

import Dimensions from '../../components/canvas/HTML/Dimensions/Dimensions';
import TextPicker from '../canvas/HTML/TextPicker/TextPicker';
import ColorParent from '../canvas/HTML/ColorPicker/ColorParent/ColorParent';
import ColorPicker from '../canvas/HTML/ColorPicker/ColorPicker';
import ShadowParent from '../canvas/HTML/ShadowPicker/ShadowParent/ShadowParent';
import ShadowPicker from '../canvas/HTML/ShadowPicker/ShadowPicker';
import LinePicker from '../canvas/HTML/LineWeightPicker/LinePicker';
import LineParent from '../canvas/HTML/LineWeightPicker/LineParent/LineParent';

const EditorsPanel: React.FC = () => {
  return (
    <div className="editors-panel">
      <Dimensions />
      <TextPicker />
      <ColorParent />
      <ColorPicker />
      <ShadowParent />
      <ShadowPicker />
      <LineParent />
      <LinePicker />
    </div>
  );
};

export default EditorsPanel;
