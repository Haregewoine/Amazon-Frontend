// import React from 'react';




// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App'
// import './index.css'
// import './App.css'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// )
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { DataProvider } from "./Component/DataProvider/DataProvider";
import { initialState, reducer } from "./utility/reducer";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataProvider reducer={reducer} initialState={initialState}>
      <App />
    </DataProvider>
  </StrictMode>
);