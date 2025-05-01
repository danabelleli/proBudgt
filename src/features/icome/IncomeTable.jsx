import Table from "../../ui/Table";
import IncomeRow from "./IncomeRow";

function IncomeTable({ incomes }) {
  return (
    <Table columns="6rem 1fr 10rem 2rem" height="40rem">
      <Table.Header>
        <div>date</div>
        <div>description</div>
        <div>amount</div>
        <div></div>
      </Table.Header>
      <Table.Body>
        {incomes.map((income) => (
          <IncomeRow income={income} key={income.Id} />
        ))}
      </Table.Body>
    </Table>
  );
}

export default IncomeTable;
