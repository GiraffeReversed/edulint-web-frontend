import { FeedbackLink } from "../editor/AnalysisBlockElems";
import { DescCard } from "../utils/DescCard";
import DescContainer from "../utils/DescContainer";

export default function Error({ status }) {
  return (
    <DescContainer id="error">
      <DescCard border="danger">
        <h5>An error ocurred</h5>
        <p>
          <>{status === 404 ? <>Page not found. Do you think it should be here? </> : <></>}<FeedbackLink variant="danger">Please report it.</FeedbackLink></>
        </p>
      </DescCard>
    </DescContainer>
  );
}