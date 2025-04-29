import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { parseISO, getDate } from "date-fns";
import { useState } from "react";
import { useMonthlyIncomes } from "../hooks/useMonthlyIncomes";

import GoalProgress from "../ui/GoalProgress";
import IncomeTable from "../features/icome/IncomeTable";
import Overview from "../ui/Overview";
import Title from "../ui/Title";
import IncomeChart from "../features/icome/IncomeChart";
import GridRow from "../ui/GridRow";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import SetGoalForm from "../ui/SetGoalForm";
import Modal from "../ui/Modal";

function Income() {
  const now = new Date();
  const [selectedDate, setSelectedDate] = useState({
    month: now.getMonth() + 1, // JS months are 0-based (Jan = 0)
    year: now.getFullYear(),
  });

  const { data: incomes = [], status } = useMonthlyIncomes(
    selectedDate.month,
    selectedDate.year
  );

  const totalIncome = incomes.reduce(
    (total, income) => total + Number(income.Amount || 0),
    0
  );

  function generateChartData(incomes, monthDays = 31) {
    const dailyIncome = Array.from({ length: monthDays }, (_, i) => ({
      label: String(i + 1),
      totalIncome: 0,
    }));

    incomes.forEach((income) => {
      if (!income.TransactionDate) return;
      const parsedDate = parseISO(income.TransactionDate);
      const day = getDate(parsedDate);
      dailyIncome[day - 1].totalIncome += Number(income.Amount || 0);
    });

    return dailyIncome;
  }

  const chartData = generateChartData(incomes);

  const location = useLocation();
  const navigate = useNavigate();
  const goal = 0;
  const moneyMade = totalIncome;
  const isGoalSet = goal > 0;

  function handleAdd() {
    navigate("/income/addIncome");
  }

  if (status === "pending") return <Spinner />;

  return (
    <>
      {location.pathname === "/income" ? (
        <>
          <Overview
            page="income"
            selectedMonth={selectedDate.month}
            selectedYear={selectedDate.year}
            onSelectDate={setSelectedDate}
          />
          <GridRow>
            <Title as="h3">
              {isGoalSet ? "add income" : "add income & set income goal"}
            </Title>
            <div className="justify-self-end space-x-4">
              {!isGoalSet && (
                <Modal>
                  <Modal.Open opens="setIncomeGoal">
                    <Button option="primary" size="large">
                      set
                    </Button>
                  </Modal.Open>
                  <Modal.Window name="setIncomeGoal">
                    <SetGoalForm />
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
            <IncomeChart totalIncome={chartData} />
          </GridRow>
          <GridRow>
            <Title as="h3">progress bar</Title>
            <GoalProgress goal={goal} moneyMade={moneyMade} />
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

export default Income;
