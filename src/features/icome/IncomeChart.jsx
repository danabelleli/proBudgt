import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styled from "styled-components";

// const fakeData = [
//   { label: "1", additionalIncome: 100, fixedIncome: 1000 },
//   { label: "2", additionalIncome: 50, fixedIncome: 2000 },
//   { label: "3", additionalIncome: 500, fixedIncome: 0 },
//   { label: "4", additionalIncome: 250, fixedIncome: 1500 },
//   { label: "5", additionalIncome: 250, fixedIncome: 1500 },
//   { label: "6", additionalIncome: 250, fixedIncome: 1500 },
//   { label: "7", additionalIncome: 1000, fixedIncome: 1500 },
//   { label: "8", additionalIncome: 250, fixedIncome: 100 },
//   { label: "9", additionalIncome: 400, fixedIncome: 0 },
//   { label: "10", additionalIncome: 250, fixedIncome: 200 },
//   { label: "11", additionalIncome: 50, fixedIncome: 50 },
//   { label: "12", additionalIncome: 250, fixedIncome: 0 },
//   { label: "13", additionalIncome: 75, fixedIncome: 0 },
//   { label: "14", additionalIncome: 1000, fixedIncome: 1500 },
//   { label: "15", additionalIncome: 250, fixedIncome: 100 },
//   { label: "16", additionalIncome: 400, fixedIncome: 0 },
//   { label: "17", additionalIncome: 250, fixedIncome: 200 },
//   { label: "18", additionalIncome: 50, fixedIncome: 50 },
//   { label: "19", additionalIncome: 250, fixedIncome: 0 },
//   { label: "20", additionalIncome: 75, fixedIncome: 0 },
// ];

const colors = {
  Income: {
    stroke: "#505d3c",
    fill: "#e9f5db",
  },
};

const Container = styled.div`
  padding: 5rem 5rem;
  background-color: var(--color-white);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);

  display: flex;
  justify-content: center;
  align-items: center;
`;

function IncomeChart({ totalIncome }) {
  return (
    <Container>
      <ResponsiveContainer height={200} width="100%">
        <AreaChart data={totalIncome}>
          <XAxis dataKey="label" />
          <YAxis unit="$" />
          <CartesianGrid />
          <Tooltip />
          <Area
            dataKey="totalIncome"
            type="monotone"
            stroke={colors.Income.stroke}
            fill={colors.Income.fill}
            name="income"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Container>
  );
}

export default IncomeChart;
