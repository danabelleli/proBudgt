import { useQuery } from "@tanstack/react-query";
import getIncomes from "../services/apiIncome";

export function useIncomes() {
  const {
    status,
    data: incomes,
    isFetching,
  } = useQuery({
    queryKey: ["incomes"],
    queryFn: getIncomes,
  });

  return { status, incomes, isFetching };
}
