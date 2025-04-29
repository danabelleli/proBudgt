import { Outlet, useLocation, useNavigate } from "react-router-dom";

import GoalProgress from "../ui/GoalProgress";
import IncomeTable from "../features/icome/IncomeTable";
import Overview from "../ui/Overview";
import Title from "../ui/Title";
import IncomeChart from "../features/icome/IncomeChart";
import GridRow from "../ui/GridRow";
import Button from "../ui/Button";
import { useIncomes } from "../hooks/useIncomes";

function Income() {
  const { incomes, status } = useIncomes();

  const location = useLocation();
  const navigate = useNavigate();
  const goal = 5000;
  const moneyMade = 2000;
  const isGoalSet = goal > 0;

  function handleAdd() {
    navigate("/income/addIncome");
  }

  if (status === "pending") return <Spinner />;

  return (
    <>
      {location.pathname === "/income" ? (
        <>
          <Overview page="income" />
          <GridRow>
            <Title as="h3">
              {isGoalSet ? "add income" : "add income & set income goal"}
            </Title>
            <div className="justify-self-end  space-x-4 ">
              {!isGoalSet && (
                <Button option="primary" size="large">
                  set
                </Button>
              )}
              <Button option="primary" size="large" onClick={handleAdd}>
                add
              </Button>
            </div>
          </GridRow>
          <GridRow>
            <Title as="h3">stats</Title>
            <IncomeChart />
          </GridRow>
          <GridRow>
            <Title as="h3">progress bar</Title>
            <GoalProgress goal={goal} moneyMade={moneyMade} />
          </GridRow>
          <GridRow>
            <Title as="h3">income breakdown</Title>
            <IncomeTable incomes={incomes} />
          </GridRow>
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
}

export default Income;
