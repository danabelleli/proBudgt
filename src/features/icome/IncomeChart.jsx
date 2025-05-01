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
          <XAxis dataKey="label" interval={0} />
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
