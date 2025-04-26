import styled from "styled-components";
import AdditionalIncome from "../features/icome/AdditionalIncome";
import FixedIncome from "../features/icome/FixedIncome";
import GoalProgress from "../ui/GoalProgress";
import IncomeTable from "../features/icome/IncomeTable";
import Overview from "../ui/Overview";
import Title from "../ui/Title";
import SetGoal from "../ui/SetGoal";

const GridRow = styled.div`
  display: grid;
  // grid-template-columns: 14rem 1fr;
  grid-template-columns: ${(props) => props.$columns || "14rem 1fr"};
  column-gap: 2rem;
`;

function Income() {
  const goal = 5000;
  const moneyMade = 2000;

  return (
    <>
      <Overview page="income" />
      <GridRow>
        <Title as="h3">goal progress</Title>
        <GoalProgress goal={goal} moneyMade={moneyMade} />
      </GridRow>
      <GridRow>
        <Title as="h3">income description</Title>
        <IncomeTable />
      </GridRow>
      <GridRow $columns="14rem 1fr 1fr 1fr">
        <Title as="h3">insert fixed, additional and goal income</Title>
        <FixedIncome />
        <AdditionalIncome />
        <SetGoal />
      </GridRow>
    </>
  );
}

export default Income;
