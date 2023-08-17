import { DescCard } from "../utils/DescCard";
import DescContainer from "../utils/DescContainer";
import { Link } from "react-router-dom";
import CtrlShortcut from "../utils/CtrlShortcut";

export default function FAQ() {
  return (
    <DescContainer id="faq">
      <section id="download-warning">
        <DescCard>
          <h5>Why does the browser warn me when I download my code?</h5>
          <p>The file you download always contains your own code, exactly as you see in the
            in-browser editor (check the <code>downloadFile</code> function in the page's source code, if you
            dare). The file should therefore be just as harmful as you yourself make it.</p>
          <p>If you keep the file, you can check its contents by opening it in a text editor – this
            should pose no security risk, even if the file contains potentially harmful code.</p>
          <p>The browser warns you against keeping the downloaded file, because it is an executable
            Python file. As such, <i>running</i> it could harm your computer. Nevertheless, simply saving the code is
            safe, but do not forget that double-tapping the file runs it, rather than opens it in a text editor.</p>
        </DescCard>
      </section>

      <section id="ctrl-s-captured">
        <DescCard>
          <h5>Why does <CtrlShortcut letter="S" /> do nothing in the editor?</h5>
          <p>A programmer may fall into habit of pressing <CtrlShortcut letter="S" /> quite often to avoid the mistake
            of running unsaved code. Nevertheless, had the page opened the dialog to save the page every time a programmer
            pressed the shortcut out of a habit, it would be tedious to edit the code directly in the browser.</p>
        </DescCard>
      </section>

      <section id="ctrl-s-captured">
        <DescCard>
          <h5>What is the privacy policy for this page?</h5>
          <p>You can find the current privacy policy <Link to={`/privacy`}>here</Link>.</p>
        </DescCard>
      </section>
    </DescContainer>
  );
}
