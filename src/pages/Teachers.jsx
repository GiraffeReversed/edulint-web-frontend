import { DescCard } from "../utils/DescCard";
import DescContainer from "../utils/DescContainer";
import { SecondaryLink as A } from "../utils/SecondaryLink";
import { Link } from "react-router-dom";

export default function Teachers() {
  return (
    <DescContainer id="teachers">
      <section id="teachers-configuration">
        <DescCard>
          <h5>How to configure the linter?</h5>
          <p>The full documentation of the underlying Python package <code>edulint</code> can be found
            at <A href="https://edulint.readthedocs.io/en/latest/">edulint.rtfd.io</A>.
            It contains <A href="https://edulint.readthedocs.io/en/latest/#options">the full list of available
              options</A> with <A
                href="https://edulint.readthedocs.io/en/latest/#configuration-through-comments-in-the-code">a description
              of how to enable them in the code</A>.
          </p>
          <p>This tool is still a work in progress, so the list of available
            options might differ from the options available in the tool's version this web's server is running.</p>
        </DescCard>
      </section>

      <section id="teachers-run-locally">
        <DescCard>
          <h5>Can I run the linter locally?</h5>
          <p>Yes, the web interface only wraps the Python package <code>edulint</code>. For quickstart,
            see <A href="https://edulint.readthedocs.io/en/latest/#quick-start">the
              documentation</A>.</p>
        </DescCard>
      </section>

      <section id="teachers-inputs">
        <DescCard>
          <h5>Are there some interesting inputs I might try the tool on?</h5>
          <p>Yes. At the present moment, <Link to={`/editor/editor_example_umime`}>this code</Link> showcases {/* TODO: THIS LINK DOESN'T WORK https://github.com/GiraffeReversed/edulint-web/commit/cc7bcb0034d020207aff0150151f86010d31615a */}
            most of the tool's abilities.</p>

        </DescCard>
      </section>
    </DescContainer>
  );
}
