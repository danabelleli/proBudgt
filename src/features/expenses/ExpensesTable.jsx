import Table from "../../ui/Table";
import ExpenseRow from "./ExpenseRow";

function ExpensesTable({ expenses }) {
  return (
    <Table
      columns="6rem 1fr 20rem 10rem 2rem"
      columnsMobile="6rem 1fr 16rem 10rem 2rem"
      height="40rem"
    >
      <Table.Header>
        <div>date</div>
        <div>description</div>
        <div>category</div>
        <div>amount</div>
        <div></div>
      </Table.Header>
      <Table.Body>
        {expenses.map((expense) => (
          <ExpenseRow expense={expense} key={expense.Id} />
        ))}
      </Table.Body>
    </Table>
  );
}

export default ExpensesTable;
