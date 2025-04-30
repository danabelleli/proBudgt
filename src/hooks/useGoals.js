import { useQuery } from "@tanstack/react-query";
import getAllGoals from "../services/apiGoals";

export function useGoals() {
  const {
    status,
    data: goals,
    isFetching,
  } = useQuery({
    queryKey: ["goals"],
    queryFn: getAllGoals,
  });

  return { status, goals, isFetching };
}
