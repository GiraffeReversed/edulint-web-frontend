import React from "react";

export const ProblemClickSettingsContext = React.createContext(null);

export function getProblemClickSettings(names) {
  let raw = window.localStorage.getItem("edulintProblemClickSettings");
  let parsed = {}
  if (raw) {
    parsed = JSON.parse(raw);
  }

  return Object.fromEntries(names.map(name => [name, parsed[name] || false]));
}

export function permasetProblemClickSettings(problemClickSettings, setProblemClickSettings) {
  window.localStorage.setItem("edulintProblemClickSettings", JSON.stringify(problemClickSettings));
  setProblemClickSettings(problemClickSettings);
}
