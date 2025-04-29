import { useQuery } from "@tanstack/react-query";
import { getMonthlyIncomes } from "../services/apiIncome";

export function useMonthlyIncomes(month, year) {
  return useQuery({
    queryKey: ["incomes", month, year],
    queryFn: () => getMonthlyIncomes({ month, year }),
    enabled: !!month && !!year, // prevents running on initial undefined
  });
}
