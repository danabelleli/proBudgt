import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getIncome } from "../services/apiIncome";

export function useIncome() {
  const { Id } = useParams();

  const { data: income, status } = useQuery({
    queryKey: [`income-${Id}`],
    queryFn: () => getIncome(Id),
  });

  return { income, status };
}
