import React from "react";
import { useCodeMirror } from "@uiw/react-codemirror";
import { python } from '@codemirror/lang-python';
import { gutter, GutterMarker, keymap, EditorView } from "@codemirror/view";
import { StateField, StateEffect, RangeSet } from "@codemirror/state";
import { indentUnit } from "@codemirror/language";

import { okaidia } from "@uiw/codemirror-theme-okaidia";
import { githubLight } from "@uiw/codemirror-theme-github";
import { ModeContext } from "../utils/Mode";

import ReactDOMServer from 'react-dom/server';

import { ArrowRight } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import CtrlShortcut from "../utils/CtrlShortcut";
import { SecondaryLink } from "../utils/SecondaryLink";

let EDITOR_LIGHT_THEME = githubLight;
let EDITOR_DARK_THEME = okaidia;

const problemArrowEffect = StateEffect.define({
  map: (val, mapping) => ({ pos: mapping.mapPos(val.pos) })
})

const problemArrowState = StateField.define({
  create() { return RangeSet.empty; },

  update(set, transaction) {
    set = set.map(transaction.changes);

    let poss = [];
    transaction.effects.forEach((e, i) => {
      if (e.is(problemArrowEffect)) {
        let v = new ProblemArrow(i).range(e.value.pos);
        poss.push(v);
      }
    });

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

class ProblemArrow extends GutterMarker {
  constructor(index) {
    super();
    this.index = index;
  }

  toDOM() {
    let span = document.createElement("span");
    let arrow = ReactDOMServer.renderToStaticMarkup(<ArrowRight />);
    span.innerHTML = arrow;
    return span;
  }
}

function getProblemRange(state, from, to) {
  let arrows = state.field(problemArrowState);

  let min = Infinity, max = -Infinity;
  arrows.between(from, to, (_from, _to, val) => {
    min = Math.min(min, val.index);
    max = Math.max(max, val.index);
  });

  return { min, max };
}

function problemsGutter(onProblemArrowClick) {
  return [
    problemArrowState,
    gutter({
      class: "cm-problems-gutter",
      markers: v => v.state.field(problemArrowState),
      initialSpacer: () => new ProblemArrow(0),
      domEventHandlers: {
        mousedown(view, line) {
          let activeRange = getProblemRange(view.state, line.from, line.from);
          onProblemArrowClick(activeRange);
          return true;
        }
      }
    }),
  ];
}

export function getSelectedRange(state) {
  let selection = state.selection.main;
  return getProblemRange(
    state,
    state.doc.lineAt(selection.from).from,
    state.doc.lineAt(selection.to).from
  );
}

export function onCodeSelect(update, setActiveProblemsRange) {
  let activeRange = getSelectedRange(update.state);
  setActiveProblemsRange(activeRange);
}

export function gotoLine(view, i) {
  let loc = undefined;
  view.state.field(problemArrowState).between(0, view.state.doc.length, (from, _to, val) => {
    if (val.index === i)
      loc = from;
  });

  if (loc) {
    view.dispatch({
      selection: { anchor: loc },
      effects: EditorView.scrollIntoView(loc, { yMargin: 100 })
    });
  } else
    toast.warning(<>The line with this defect was probably removed.</>)
}

export function useCodeMirrorCustom({ value, onChange, onProblemArrowClick, onCodeSelect }) {
  let editor = React.useRef();
  let [mode,] = React.useContext(ModeContext);

  let { view, setContainer } = useCodeMirror({
    extensions: [
      python(),
      indentUnit.of("    "),
      [...problemsGutter(onProblemArrowClick)],
      EditorView.updateListener.of(update => {
        if (update.selectionSet)
          onCodeSelect(update);
      }),
      keymap.of([
        {
          key: "Ctrl-s", run: () =>
            toast.info(<>
              <CtrlShortcut letter="S" /> does nothing on purpose.
              <SecondaryLink href="/faq#ctrl-s-captured">Here's why.</SecondaryLink>
            </>)
        },
      ])
    ],
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

  }, [setContainer]);

  return { view, editor };
}

export default function CodeMirrorWrapper({ view, editor, problems }) {

  React.useEffect(() => {
    if (view)
      setProblemArrows(view, problems);
  }, [view, problems]);

  return <div id="editor-wrapper" ref={editor} className="d-flex flex-fill" />;
}
