import { PencilIcon } from "@heroicons/react/24/outline";
import Table from "../../ui/Table";

function IncomeRow({ data }) {
  const { description, date, amount } = data;

  return (
    <Table.Row>
      <p>{date}</p>
      <p>{description}</p>
      <p>{amount}</p>
      <PencilIcon className="cursor-pointer" />
    </Table.Row>
  );
}

export default IncomeRow;
