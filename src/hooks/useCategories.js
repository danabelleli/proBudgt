import { useQuery } from "@tanstack/react-query";
import getAllCategories from "../services/apiCategories";

export function useCategories() {
  const {
    status,
    data: categories,
    isFetching,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  return { status, categories, isFetching };
}
