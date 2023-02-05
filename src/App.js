import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Outlet } from 'react-router-dom';

import Navbar from './Navbar';
import AnalysisBlock from './editor/AnalysisBlock';
import About from './About';
import FAQ from './FAQ';
import Teachers from './Teachers';
import Privacy from './Privacy';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// TODO handle not found
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { element: <AnalysisBlock />, index: true },
      { path: "editor", element: <AnalysisBlock />, },
      { path: "about", element: <About /> },
      { path: "faq", element: <FAQ /> },
      { path: "teachers", element: <Teachers /> },
      { path: "privacy", element: <Privacy /> },
    ]
  }
]);

function Root() {
  return (
    <>
      <Navbar />
      <div className="container-lg p-0 content d-flex flex-column rounded-bottom align-items-stretch pt-2">
        <Outlet />
      </div>
    </>
  );
}

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
