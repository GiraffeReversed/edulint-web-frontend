import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from './Navbar';
import { ModeContext, getMode, setModeToUI } from './utils/Mode';
import AnalysisBlock from './editor/AnalysisBlock';
import About from './About';
import FAQ from './FAQ';
import Teachers from './Teachers';
import Privacy from './Privacy';

import 'bootstrap-dark-5/dist/css/bootstrap-nightshade.min.css';
import './App.css';

function App() {
  let [mode, setMode] = React.useState(getMode());
  setModeToUI(mode);
  let analysisBlock = <AnalysisBlock />;

  // TODO handle errors
  return (
    <React.StrictMode>
      <BrowserRouter>
        <ModeContext.Provider value={[mode, setMode]} >
          <Navbar app={this} />
          <div className="container-lg p-0 content d-flex flex-column rounded-bottom align-items-stretch pt-2">
            <Routes>
              <Route path="/" element={analysisBlock} />
              <Route path="/editor" element={analysisBlock} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/teachers" element={<Teachers />} />
              <Route path="/privacy" element={<Privacy />} />
            </Routes>
          </div>
        </ModeContext.Provider>
      </BrowserRouter>
    </React.StrictMode >
  );
}

export default App;
