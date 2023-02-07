import React from 'react';
import { Outlet, createBrowserRouter, RouterProvider, redirect } from "react-router-dom";

import Navbar from './Navbar';
import { ModeContext, getMode, setModeToUI } from './utils/Mode';
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
import { toast, ToastContainer } from 'react-toastify';

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
  setModeToUI(mode);

  return (
    <ModeContext.Provider value={[mode, setMode]} >
      <ToastContainer position="bottom-right" theme={mode} />
      <Navbar />
      <div className="container-lg p-0 content d-flex flex-column rounded-bottom align-items-stretch pt-2">
        <Outlet />
      </div>
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
