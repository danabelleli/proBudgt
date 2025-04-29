import styled from "styled-components";
import ProgressBar from "./ProgressBar";

const Container = styled.div`
  padding: 2.5rem 5rem;
  background-color: var(--color-white);
  border-radius: var(--border-radius-md);
  height: 16rem;
  //width: 50rem;
  box-shadow: var(--shadow-md);

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

function GoalProgress({ moneyMade = 0, goal = 0 }) {
  return (
    <Container>
      <ProgressBar moneyMade={moneyMade} goal={goal} />
    </Container>
  );
}

export default GoalProgress;
