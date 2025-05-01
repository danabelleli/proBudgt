import { useQuery } from "@tanstack/react-query";
import { getMonthlyGoal } from "../services/apiGoals";

export function useMonthlyGoal(month, year, category = "income") {
  return useQuery({
    queryKey: ["goals", month, year, category],
    queryFn: () => getMonthlyGoal({ month, year, category }),
    enabled: !!month && !!year && !!category, // prevents running on initial undefined
  });
}
