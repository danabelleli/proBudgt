import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import styled from "styled-components";

const Container = styled.div`
    padding: 3rem 3rem;
    background-color: var(--color-white);
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-md);

    display: flex;
    justify-content: center;
    align-items: center;
`;

const testData = [
    {
        category: "housing",
        value: 40,
        color: "#50ff62",
    },
    {
        category: "transportation",
        value: 10,
        color: "#50d0ff",
    },

    {
        category: "personal",
        value: 30,
        color: "#808080",
    },
    {
        category: "medical",
        value: 10,
        color: "#2f00ff",
    },
    {
        category: "education",
        value: 20,
        color: "#ffc0cb",
    },
];

function PieChartBox() {
    return (
        <Container>
            <ResponsiveContainer height={250} width="100%">
                <PieChart>
                    <Pie
                        data={testData}
                        nameKey="category"
                        dataKey="value"
                        innerRadius={55}
                    >
                        {testData.map((entry) => (
                            <Cell
                                fill={entry.color}
                                stroke={entry.color}
                                key={entry.category}
                            />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </Container>
    );
}

export default PieChartBox;
