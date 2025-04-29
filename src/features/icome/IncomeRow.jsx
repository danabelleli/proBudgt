import { PencilIcon } from "@heroicons/react/24/outline";
import Table from "../../ui/Table";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";

function IncomeRow({ income }) {
  const { Id, Description, TransactionDate, Amount } = income;
  const dbDate = TransactionDate; // from database
  const formattedDate = format(parseISO(dbDate), "MM/dd");

  const formattedAmount = Amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <Table.Row>
      <p>{formattedDate}</p>
      <p>{Description}</p>
      <p>{`$ ${formattedAmount}`}</p>
      <Link to={`/income/${Id}`} state={income}>
        <PencilIcon className="cursor-pointer" />
      </Link>
    </Table.Row>
  );
}

export default IncomeRow;
