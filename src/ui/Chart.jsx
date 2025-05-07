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
  Green: {
    Stroke: "#505d3c",
    Fill: "#e9f5db",
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

function Chart({ total, chartName }) {
  return (
    <Container>
      <ResponsiveContainer height={200} width="100%">
        <AreaChart data={total}>
          <XAxis dataKey="label" interval={3} />
          <YAxis unit="$" />
          <CartesianGrid />
          <Tooltip />
          <Area
            dataKey="total"
            type="monotone"
            stroke={colors.Green.Stroke}
            fill={colors.Green.Fill}
            name={chartName}
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Container>
  );
}

export default Chart;
