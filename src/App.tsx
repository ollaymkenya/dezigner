import React from 'react';

//components
import Tools from './components/tools/Tools';
import ItemTab from './components/itemsPanel/ItemsPanel';
import EditorsPanel from './components/editorsPanel/EditorsPanel';
import Canvas from './components/canvas/Elements/Canvas/Canvas';

import './App.css';

//fonts
// archivo
import './assets/fonts/Archivo/static/Archivo/Archivo-Black.ttf';
import './assets/fonts/Archivo/static/Archivo/Archivo-BlackItalic.ttf';
import './assets/fonts/Archivo/static/Archivo/Archivo-Bold.ttf';
import './assets/fonts/Archivo/static/Archivo/Archivo-BoldItalic.ttf';
import './assets/fonts/Archivo/static/Archivo/Archivo-ExtraBold.ttf';
import './assets/fonts/Archivo/static/Archivo/Archivo-ExtraBoldItalic.ttf';
import './assets/fonts/Archivo/static/Archivo/Archivo-ExtraLight.ttf';
import './assets/fonts/Archivo/static/Archivo/Archivo-ExtraLightItalic.ttf';
import './assets/fonts/Archivo/static/Archivo/Archivo-Italic.ttf';
import './assets/fonts/Archivo/static/Archivo/Archivo-Light.ttf';
import './assets/fonts/Archivo/static/Archivo/Archivo-LightItalic.ttf';
import './assets/fonts/Archivo/static/Archivo/Archivo-Medium.ttf';
import './assets/fonts/Archivo/static/Archivo/Archivo-MediumItalic.ttf';
import './assets/fonts/Archivo/static/Archivo/Archivo-Regular.ttf';
import './assets/fonts/Archivo/static/Archivo/Archivo-SemiBold.ttf';
import './assets/fonts/Archivo/static/Archivo/Archivo-Thin.ttf';
import './assets/fonts/Archivo/static/Archivo/Archivo-ThinItalic.ttf';
// bebas neue
import './assets/fonts/Bebas_Neue/BebasNeue-Regular.ttf';
// coromorand garamond
import './assets/fonts/Cormorant_Garamond/CormorantGaramond-Bold.ttf';
import './assets/fonts/Cormorant_Garamond/CormorantGaramond-BoldItalic.ttf';
import './assets/fonts/Cormorant_Garamond/CormorantGaramond-Italic.ttf';
import './assets/fonts/Cormorant_Garamond/CormorantGaramond-Light.ttf';
import './assets/fonts/Cormorant_Garamond/CormorantGaramond-LightItalic.ttf';
import './assets/fonts/Cormorant_Garamond/CormorantGaramond-Medium.ttf';
import './assets/fonts/Cormorant_Garamond/CormorantGaramond-MediumItalic.ttf';
import './assets/fonts/Cormorant_Garamond/CormorantGaramond-Regular.ttf';
import './assets/fonts/Cormorant_Garamond/CormorantGaramond-SemiBold.ttf';
import './assets/fonts/Cormorant_Garamond/CormorantGaramond-SemiBoldItalic.ttf';
// ibm plex mono
import './assets/fonts/IBM_Plex_Mono/IBMPlexMono-Bold.ttf';
import './assets/fonts/IBM_Plex_Mono/IBMPlexMono-BoldItalic.ttf';
import './assets/fonts/IBM_Plex_Mono/IBMPlexMono-ExtraLight.ttf';
import './assets/fonts/IBM_Plex_Mono/IBMPlexMono-ExtraLightItalic.ttf';
import './assets/fonts/IBM_Plex_Mono/IBMPlexMono-Italic.ttf';
import './assets/fonts/IBM_Plex_Mono/IBMPlexMono-Light.ttf';
import './assets/fonts/IBM_Plex_Mono/IBMPlexMono-LightItalic.ttf';
import './assets/fonts/IBM_Plex_Mono/IBMPlexMono-Medium.ttf';
import './assets/fonts/IBM_Plex_Mono/IBMPlexMono-MediumItalic.ttf';
import './assets/fonts/IBM_Plex_Mono/IBMPlexMono-MediumItalic.ttf';
import './assets/fonts/IBM_Plex_Mono/IBMPlexMono-Regular.ttf';
import './assets/fonts/IBM_Plex_Mono/IBMPlexMono-SemiBold.ttf';
import './assets/fonts/IBM_Plex_Mono/IBMPlexMono-SemiBoldItalic.ttf';
import './assets/fonts/IBM_Plex_Mono/IBMPlexMono-Thin.ttf';
import './assets/fonts/IBM_Plex_Mono/IBMPlexMono-ThinItalic.ttf';
// nanum pen script
import './assets/fonts/Nanum_Pen_Script/NanumPenScript-Regular.ttf';

const App: React.FC = () => {
  return (
    <div className="App">
      <Canvas />
      <Tools />
      <ItemTab />
      <EditorsPanel />
    </div>
  );
};

export default App;
