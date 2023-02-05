import React from "react";

export const ModeContext = React.createContext(null);

export function getMode() {
  let mode = window.localStorage.getItem("edulintDarkmode");
  if (mode)
    return mode;

  return document.getRootNode().children[0].className;
}

export function setModeToUI(mode) {
  document.getRootNode().children[0].className = mode;
  document.getElementsByName("color-scheme")[0].content = mode;
}

export function toggleDarkmode(current, setMode) {
  let next = current === "light" ? "dark" : "light";

  window.localStorage.setItem("edulintDarkmode", next);

  setMode(next);
}
