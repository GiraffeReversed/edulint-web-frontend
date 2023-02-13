import React from "react";
import { useCodeMirror } from "@uiw/react-codemirror";
import { python } from '@codemirror/lang-python';
import { gutter, GutterMarker } from "@codemirror/view";
import { StateField, StateEffect, RangeSet } from "@codemirror/state";

import { okaidia } from "@uiw/codemirror-theme-okaidia";
import { githubLight } from "@uiw/codemirror-theme-github";
import { ModeContext } from "../utils/Mode";

import ReactDOMServer from 'react-dom/server';

import { ArrowRight } from "react-bootstrap-icons";

let EDITOR_LIGHT_THEME = githubLight;
let EDITOR_DARK_THEME = okaidia;

const problemArrowEffect = StateEffect.define({
  map: (val, mapping) => ({ pos: mapping.mapPos(val.pos) })
})

const problemArrowState = StateField.define({
  create() { return RangeSet.empty; },

  update(set, transaction) {
    let poss = [];
    set = set.map(transaction.changes);
    for (let e of transaction.effects) {
      if (e.is(problemArrowEffect))
        poss.push(problemArrow.range(e.value.pos));
    }

    if (poss.length > 0)
      return RangeSet.of(poss);

    return set;
  }
})

function setProblemArrows(view, problems) {
  view.dispatch({
    effects: problems.map(problem => problemArrowEffect.of({ pos: view.state.doc.line(problem.line).from }))
  });
}

const problemArrow = new class extends GutterMarker {
  toDOM() {
    let span = document.createElement("span");
    let arrow = ReactDOMServer.renderToStaticMarkup(<ArrowRight />);
    span.innerHTML = arrow;
    return span;
  }
}

const problemsGutter = [
  problemArrowState,
  gutter({
    class: "cm-problems-gutter",
    markers: v => v.state.field(problemArrowState),
    initialSpacer: () => problemArrow,
    domEventHandlers: {
      mousedown(view, line) {
        console.log("mousedown");
        return true;
      }
    }
  }),
]

const extensions = [
  python(),
  [...problemsGutter],
];

export default function CodeMirrorWrapper({ value, onChange, problems }) {
  let [mode,] = React.useContext(ModeContext);
  const editor = React.useRef();

  const { setContainer, view } = useCodeMirror({
    extensions: extensions,
    value: value,
    theme: mode === "light" ? EDITOR_LIGHT_THEME : EDITOR_DARK_THEME,
    placeholder: "Enter your code here...",
    className: "d-flex flex-fill",
    onChange: onChange,
  });

  React.useEffect(() => {
    if (editor.current) {
      setContainer(editor.current);
    }

    // console.log(view);
    // if (view) {
    //   // view.dispatch({ changes: { from: 2, insert: "asdasdad" } });
    //   // view.dispatch({ selection: { ranges: { from: 2, to: 3 } } });
    //   console.log(state.doc.line(3));
    //   view.dispatch({ selection: { anchor: state.doc.line(3).to } });

    //   // view.dispatch({ selection: { anchor: state.doc.lineAt(2) } });
    //   // setView(view);
    // }
  }, [setContainer]);

  React.useEffect(() => {
    if (view)
      setProblemArrows(view, problems);
  }, [view, problems]);

  return <div ref={editor} className="d-flex flex-fill" />;
}
