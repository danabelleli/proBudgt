import { useQuery } from "@tanstack/react-query";
import { getMonthlyGoal } from "../services/apiGoals";

export function useMonthlyGoal(month, year) {
  return useQuery({
    queryKey: ["goals", month, year],
    queryFn: () => getMonthlyGoal({ month, year }),
    enabled: !!month && !!year, // prevents running on initial undefined
  });
}
