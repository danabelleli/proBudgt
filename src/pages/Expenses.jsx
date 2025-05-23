import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useMonthlyGoal } from "../hooks/useMonthlyGoal";
import { useMonthlyExpenses } from "../hooks/useMonthlyExpenses";
import { generateChartData } from "../utils/functions";

import Overview from "../ui/Overview";
import GridRow from "../ui/GridRow";
import Title from "../ui/Title";
import Modal from "../ui/Modal";
import SetGoalForm from "../ui/SetGoalForm";
import Button from "../ui/Button";
import ExpensesTable from "../features/expenses/ExpensesTable";
import GoalProgress from "../ui/GoalProgress";
import Spinner from "../ui/Spinner";
import Chart from "../ui/Chart";
import PieChart from "../ui/PieChartBox";
import PieChartBox from "../ui/PieChartBox";

function Expenses() {
  const location = useLocation();
  const navigate = useNavigate();
  const now = new Date();
  const goalCategory = "expenses";

  const [selectedDate, setSelectedDate] = useState({
    month: now.getMonth() + 1, // JS months are 0-based (Jan = 0)
    year: now.getFullYear(),
  });

  const { data: expenses = [], status: expensesStatus } = useMonthlyExpenses(
    selectedDate.month,
    selectedDate.year
  );

  const totalExpenses = expenses.reduce(
    (total, expense) => total + Number(expense.Amount || 0),
    0
  );

  const { data: monthlyGoal } = useMonthlyGoal(
    selectedDate.month,
    selectedDate.year,
    "expenses"
  );

  const chartData = generateChartData(expenses);

  const goal = monthlyGoal?.Goal;
  const isGoalSet = goal > 0;

  function handleAdd() {
    navigate("/expenses/addIncome");
  }

  if (expensesStatus === "pending") return <Spinner />;

  return (
    <>
      {location.pathname === "/expenses" ? (
        <>
          <Overview
            page="expenses"
            selectedMonth={selectedDate.month}
            selectedYear={selectedDate.year}
            onSelectDate={setSelectedDate}
          />
          <GridRow>
            <Title as="h3">
              {isGoalSet ? "add an expense" : "add an expense & set a goal"}
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
            <div className="grid grid-cols-2 gap-8">
              <Chart total={chartData} chartName="expenses" />
              <PieChartBox chartData={expenses} />
            </div>
          </GridRow>
          <GridRow>
            <Title as="h3">progress bar</Title>
            <GoalProgress goal={goal} moneyMade={totalExpenses} />
          </GridRow>
          {expenses.length !== 0 && (
            <GridRow>
              <Title as="h3">expenses breakdown</Title>
              <ExpensesTable expenses={expenses} />
            </GridRow>
          )}
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
}

export default Expenses;
