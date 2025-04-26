import Title from "../../ui/Title";
import Table from "../../ui/Table";
import IncomeRow from "./IncomeRow";

const data = [
  {
    id: 1,
    date: "24/04/2024",
    description: "first paycheck",
    amount: "10,000",
  },
  {
    id: 2,
    date: "14/04/2024",
    description: "second paycheck",
    amount: "12,000",
  },
  { id: 3, date: "28/04/2024", description: "third paycheck", amount: "5,000" },
  { id: 4, date: "28/04/2024", description: "third paycheck", amount: "5,000" },
  { id: 5, date: "28/04/2024", description: "third paycheck", amount: "5,000" },
  { id: 6, date: "28/04/2024", description: "third paycheck", amount: "5,000" },
  { id: 7, date: "28/04/2024", description: "third paycheck", amount: "5,000" },
];

function IncomeTable() {
  return (
    <Table columns="10rem 1fr 8rem 2rem" height="40rem">
      <Table.Header>
        <div>date</div>
        <div>description</div>
        <div>amount</div>
        <div></div>
      </Table.Header>
      <Table.Body>
        {data.map((data) => (
          <IncomeRow data={data} key={data.id} />
        ))}
      </Table.Body>
    </Table>
  );
}

export default IncomeTable;
