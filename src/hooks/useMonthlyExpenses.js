import { useQuery } from "@tanstack/react-query";
import getMonthlyExpenses from "../services/apiExpenses";

export function useMonthlyExpenses(month, year) {
  return useQuery({
    queryKey: ["expenses", month, year],
    queryFn: () => getMonthlyExpenses({ month, year }),
    enabled: !!month && !!year, // prevents running on initial undefined
  });
}
