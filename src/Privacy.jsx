import { DescCard } from "./utils/DescCard";
import DescContainer from "./utils/DescContainer";
import { SecondaryLink as A } from "./utils/SecondaryLink";

export default function Privacy() {
  return (
    <DescContainer id="privacy">
      <section id="privacy-policy">
        <DescCard>
          <h5>Privacy policy</h5>
          <p>No one likes to read a privacy policy with the length of a novella, so we will keep it
            brief and to the point.</p>

          <p>We process and store some of your data, namely:</p>

          <ul>
            <li>the submitted codes (their analysis is the core functionality; we also store them for academic
              research and evaluation of new checks) </li>
            <li>IP address (used to detect the number of visitors; estimate country; prevent attacks and abuse; not
              stored)
            </li>
            <li>user agent (used to detect the number of visitors and types of devices; stored for a maximum of 180
              days)
            </li>
            <li>from which website you came to EduLint</li>
            <li>the sequence of actions you performed during your session</li>
          </ul>

          <p>We will not provide your codes to third parties. We use them internally for evaluation
            of new checks. We may also create aggregate statistics (for example, most common errors) that will
            (hopefully) be published as part of an academic research paper.</p>

          <p>The service is hosted in the EU and is provided by Anna Řechtáčková and her colleagues.
            Note that Cloudflare, Inc. is used as a proxy and may have access to the decrypted content while your
            data is in transit to us.</p>

          <p>We do not use cookies and only save data to localStorage if necessary for the website’s
            functionality.</p>

          <p>By submitting your code for evaluation, you acknowledge that you grant consent to the
            processing and storage of your data as outlined above.</p>

          <p>You have the right to withdraw the consent, request retrieval, correction, or removal
            of your data. Note that we do not store the information about who submitted which code; you will
            therefore need to provide the list of SHA-256 hashes. To exercise these rights or to send inquires,
            contact us at anna.rechtackova@mail.muni.cz.</p>

          <p>This version of the privacy policy was published on 2023-08-15 and relates to
            service provided on <A href="https://edulint.com/">edulint.com</A></p>
        </DescCard>
      </section>
    </DescContainer>
  );
}
