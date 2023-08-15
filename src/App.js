import React from 'react';
import { Outlet, createBrowserRouter, RouterProvider, redirect } from "react-router-dom";

import Navbar from './Navbar';
import { ModeContext, getMode, setModeToUI } from './utils/Mode';
import { SettingsModal } from './utils/SettingsModal';
import { AnalysisBlock, AnalysisBlockCodeRedirector } from './editor/AnalysisBlock';
import About from './About';
import FAQ from './FAQ';
import Teachers from './Teachers';
import Privacy from './Privacy';

import 'bootstrap-dark-5/dist/css/bootstrap-nightshade.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './code_highlighting.css';
import './code_highlighting_dark.css';
import './App.css';
import { toast, ToastContainer, Flip } from 'react-toastify';
import { ProblemClickSettingsContext, getProblemClickSettings, permasetProblemClickSettings } from './utils/ProblemClickSettings';

// TODO handle errors
const router = createBrowserRouter(
  [
    {
      path: "/", element: <Body />,
      children: [
        { index: true, element: <AnalysisBlock /> },
        { path: "editor", element: <AnalysisBlock /> },
        {
          path: "editor/:name",
          element: <AnalysisBlockCodeRedirector />,
          loader: async ({ params }) => {
            const res = await fetch("https://edulint.rechtackova.cz/api/code/" + params.name);

            if (res.status === 404) {
              toast.info(<>No such file as <code>{params.name}</code> was uploaded.</>);
              return redirect("/editor");
            }
            return res;
          },
        },
        { path: "about", element: <About /> },
        { path: "faq", element: <FAQ /> },
        { path: "teachers", element: <Teachers /> },
        { path: "privacy", element: <Privacy /> },
      ]
    }
  ]
);

function Body() {
  let [mode, setMode] = React.useState(getMode());
  let [problemClickSettings, setProblemClickSettings] = React.useState(getProblemClickSettings(["gotoLine", "toggleExpls"]));
  let [showSettings, setShowSettings] = React.useState(false);
  setModeToUI(mode);

  return (
    <ModeContext.Provider value={[mode, setMode]} >
      <ProblemClickSettingsContext.Provider value={problemClickSettings} >
        <ToastContainer position="bottom-right" theme={mode} transition={Flip} />
        <SettingsModal
          show={showSettings}
          onHide={() => setShowSettings(false)}
          settings={problemClickSettings}
          onSettingSet={label => e => { let copy = { ...problemClickSettings }; copy[label] = e.target.checked; permasetProblemClickSettings(copy, setProblemClickSettings) }}
        />
        <Navbar onSettingsClick={() => setShowSettings(true)} />
        <div className="container-lg p-0 content d-flex flex-column rounded-bottom align-items-stretch pt-2">
          <Outlet />
        </div>
      </ProblemClickSettingsContext.Provider>
    </ModeContext.Provider>
  );
}

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}

export default App;
