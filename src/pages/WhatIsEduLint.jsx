import { DescCard } from "../utils/DescCard";
import { SecondaryLink as A } from "../utils/SecondaryLink";

export default function About() {
    return (<DescCard>
        <h5>What is EduLint?</h5>
        <p>
            EduLint provides basic code quality feedback to novice programmers. If you want, you can configure it to provide whatever feedback you think is relevant. It uses static analysis, no LLMs.

            You can read more about it in <A href="https://edulint.rtfd.io">the documentation</A>.
        </p>
    </DescCard>);
}