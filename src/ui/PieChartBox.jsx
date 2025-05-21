import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import styled from "styled-components";
import { useCategories } from "../hooks/useCategories";

const Container = styled.div`
  // padding: 3rem 3rem;
  background-color: var(--color-white);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);

  display: flex;
  justify-content: center;
  align-items: center;
`;

function PieChartBox({ chartData }) {
  const { categories = [] } = useCategories();
  const pieChartData =
    chartData?.reduce((acc, curr) => {
      const { Category: category, Amount: amount } = curr;

      const categoryInfo = categories?.find((cat) => cat.Value === category);

      const existing = acc.find((item) => item.category === category);

      if (existing) {
        existing.value += amount;
      } else {
        acc.push({
          category,
          value: amount,
          color: categoryInfo?.Color || "#ccc",
        });
      }

      return acc;
    }, []) || [];

  function createPercentageTooltip(data) {
    return function PercentageTooltip({ active, payload }) {
      if (active && payload && payload.length > 0) {
        const currentItem = payload[0];
        const total = data.reduce((sum, item) => sum + item.value, 0);
        const percentage = total
          ? ((currentItem.value / total) * 100).toFixed(1)
          : "0.0";

        return (
          <div
            style={{
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              fontSize: "1.6rem",
            }}
          >
            <p>
              <strong>{currentItem.payload.category}</strong>
            </p>
            <p>{percentage}%</p>
          </div>
        );
      }

      return null;
    };
  }

  if (chartData.length === 0)
    return (
      <Container>
        <p>No data yet...</p>
      </Container>
    );

  return (
    <Container>
      <ResponsiveContainer height={250} width="100%">
        <PieChart>
          <Pie
            data={pieChartData}
            nameKey="category"
            dataKey="value"
            innerRadius={50}
          >
            {pieChartData.map((entry) => (
              <Cell
                fill={entry.color}
                stroke={entry.color}
                key={entry.category}
              />
            ))}
          </Pie>
          <Tooltip content={createPercentageTooltip(pieChartData)} />

          <Legend
            verticalAlign="middle"
            align="right"
            layout="vertical"
            width="37%"
          />
        </PieChart>
      </ResponsiveContainer>
    </Container>
  );
}

export default PieChartBox;
