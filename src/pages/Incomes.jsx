import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMonthlyIncomes } from "../hooks/useMonthlyIncomes";
import { useMonthlyGoal } from "../hooks/useMonthlyGoal";
import { generateChartData } from "../utils/functions";

import GoalProgress from "../ui/GoalProgress";
import IncomeTable from "../features/icome/IncomeTable";
import Overview from "../ui/Overview";
import Title from "../ui/Title";
import Chart from "../ui/Chart";
import GridRow from "../ui/GridRow";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import SetGoalForm from "../ui/SetGoalForm";
import Modal from "../ui/Modal";

function Incomes() {
  const location = useLocation();
  const navigate = useNavigate();
  const now = new Date();
  const goalCategory = "incomes";

  const [selectedDate, setSelectedDate] = useState({
    month: now.getMonth() + 1, // JS months are 0-based (Jan = 0)
    year: now.getFullYear(),
  });

  const { data: incomes = [], status: incomeStatus } = useMonthlyIncomes(
    selectedDate.month,
    selectedDate.year
  );

  const totalIncome = incomes.reduce(
    (total, income) => total + Number(income.Amount || 0),
    0
  );

  const { data: monthlyGoal } = useMonthlyGoal(
    selectedDate.month,
    selectedDate.year,
    "incomes"
  );

  const chartData = generateChartData(incomes);

  const goal = monthlyGoal?.Goal;
  const isGoalSet = goal > 0;

  function handleAdd() {
    navigate("/incomes/addIncome");
  }

  if (incomeStatus === "pending") return <Spinner />;

  return (
    <>
      {location.pathname === "/incomes" ? (
        <>
          <Overview
            page="incomes"
            selectedMonth={selectedDate.month}
            selectedYear={selectedDate.year}
            onSelectDate={setSelectedDate}
          />
          <GridRow>
            <Title as="h3">
              {isGoalSet ? "add income" : "add an income & set a goal"}
            </Title>
            <div className="justify-self-end space-x-4">
              {!isGoalSet && (
                <Modal>
                  <Modal.Open opens="setGoal">
                    <Button option="primary" size="large">
                      set
                    </Button>
                  </Modal.Open>
                  <Modal.Window name="setGoal">
                    <SetGoalForm
                      selectedDate={selectedDate}
                      category={goalCategory}
                    />
                  </Modal.Window>
                </Modal>
              )}
              <Button option="primary" size="large" onClick={handleAdd}>
                add
              </Button>
            </div>
          </GridRow>
          <GridRow>
            <Title as="h3">stats</Title>
            <Chart total={chartData} chartName="incomes" />
          </GridRow>
          <GridRow>
            <Title as="h3">progress bar</Title>
            <GoalProgress goal={goal} moneyMade={totalIncome} />
          </GridRow>
          {incomes.length !== 0 && (
            <GridRow>
              <Title as="h3">income breakdown</Title>
              <IncomeTable incomes={incomes} />
            </GridRow>
          )}
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
}

export default Incomes;
