import { Outlet, useLocation, useNavigate } from "react-router-dom";

import GoalProgress from "../ui/GoalProgress";
import IncomeTable from "../features/icome/IncomeTable";
import Overview from "../ui/Overview";
import Title from "../ui/Title";
import IncomeChart from "../features/icome/IncomeChart";
import GridRow from "../ui/GridRow";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import { useIncomes } from "../hooks/useIncomes";
import { parseISO, getDate } from "date-fns"; // helper to parse dates
import SetGoalForm from "../ui/SetGoalForm";
import Modal from "../ui/Modal";

function Income() {
    const { incomes, status } = useIncomes();

    const totalIncome = incomes?.reduce(
        (total, income) => total + Number(income.Amount || 0),
        0
    );

    function generateChartData(incomes, monthDays = 31) {
        // Step 1: Initialize an array with all days of the month, income 0
        const dailyIncome = Array.from({ length: monthDays }, (_, i) => ({
            label: String(i + 1),
            totalIncome: 0,
        }));

        // Step 2: Add income to the correct day
        incomes?.forEach((income) => {
            if (!income.TransactionDate) return; // safety check

            const parsedDate = parseISO(income.TransactionDate); // parses '2025-04-28' into a Date
            const day = getDate(parsedDate); // returns day number (1-31)

            // Add the amount to the correct day
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
                    <Overview page="income" />
                    <GridRow>
                        <Title as="h3">
                            {isGoalSet
                                ? "add income"
                                : "add income & set income goal"}
                        </Title>
                        <div className="justify-self-end  space-x-4 ">
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
                            <Button
                                option="primary"
                                size="large"
                                onClick={handleAdd}
                            >
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
