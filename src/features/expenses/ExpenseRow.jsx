import { PencilIcon } from "@heroicons/react/24/outline";
import Table from "../../ui/Table";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
//import { personalCategories } from "../../utils/data";
import { useCategories } from "../../hooks/useCategories";

function ExpenseRow({ expense }) {
  const { categories } = useCategories();
  const { Id, Description, TransactionDate, Amount, Category } = expense;
  const dbDate = TransactionDate; // from database
  const formattedDate = format(parseISO(dbDate), "MM/dd");

  const category = categories?.find((category) => category.Value === Category);

  const formattedAmount = Amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <Table.Row>
      <p>{formattedDate}</p>
      <p>{Description}</p>
      <p>{category?.Label || Category}</p>
      <p>{`$ ${formattedAmount}`}</p>
      <Link to={`/expenses/${Id}`} state={expense}>
        <PencilIcon className="cursor-pointer" />
      </Link>
    </Table.Row>
  );
}

export default ExpenseRow;
