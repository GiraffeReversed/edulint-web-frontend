import { DescCard } from "./utils/DescCard";
import DescContainer from "./utils/DescContainer";
import { SecondaryLink as A } from "./utils/SecondaryLink";
import { Github } from "react-bootstrap-icons";

export default function About() {
  return (
    <DescContainer id="about">
      <DescCard>
        <h5>About the page</h5>
        <p>
          This page was built for computer science students at the <A href="https://www.fi.muni.cz/">Faculty of
            Informatics, Masaryk University</A> to serve as a simple linter to help them overcome the most common
          novice programmer's mistakes.
        </p>
        <p>The project is available to everybody, but no guarantees of uptime are provided.</p>
      </DescCard>

      <DescCard>
        <h5>Behind the page</h5>
        <p>
          The backend is powered by <A href="https://flask.palletsprojects.com">Flask</A>.
          The frontend is designed using <A href="https://getbootstrap.com/">Bootstrap</A>,
          with <A href="https://vinorodrigues.github.io/bootstrap-dark-5/"> bootstrap-dark-5</A> for the dark mode.
          The icons are <A href="https://icons.getbootstrap.com/">the Bootstrap Icons</A>.
          The editor is provided by <A href="https://codemirror.net/">CodeMirror</A>,
          the themes by <A href="https://github.com/FarhadG/code-mirror-themes">CodeMirror Themes</A>.
          The background image is taken from <A href="https://www.transparenttextures.com/">Transparent textures</A>. <A
            href="https://split.js.org/">Split.js</A> is used for window splitting.
          The favicon is from <A href="https://thenounproject.com/icon/script-book-3546546/">the Noun Project</A>,
          created by Iconika.
        </p>
        <p>
          The analysis uses <A href="https://flake8.pycqa.org/">flake8</A>
          and <A href="https://pylint.org/">pylint</A>,
          wrapped by <A href="https://edulint.rtfd.io">edulint</A>.
        </p>
        <p>This page was built by <A href="https://github.com/GiraffeReversed">Anna Řechtáčková</A>. <A
          href="https://github.com/GiraffeReversed/edulint">Linter's GitHub</A> <Github className="" />. <A
            href="https://github.com/GiraffeReversed/edulint-web">Web's GitHub</A> <Github />.
        </p>
        <p>The development of this project was sponsored by <A
          href="https://research.redhat.com/events/europe-rig-meeting-december-2022/">RedHat Research</A> during 2022 and first half of 2023..
        </p>
      </DescCard>
    </DescContainer>
  );
}
