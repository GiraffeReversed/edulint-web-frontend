import React from "react";
import Split from "react-split";

import CodeBlock from "./CodeBlock";
import ProblemsBlock from "./ProblemsBlock";

export default function AnalysisBlock(props) {
  return (
    <Split className="d-flex flex-row flex-fill" id="analysis-block"
      minSize={250} snapOffset={0} sizes={[60, 40]}
    >
      <CodeBlock />
      <ProblemsBlock />
    </Split>
  )
}
