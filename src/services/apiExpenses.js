import supabase from "./supabase";

export default async function getMonthlyExpenses({ month, year }) {
  const { data, error } = await supabase
    .from("Expenses")
    .select("*")
    .eq("Month", month)
    .eq("Year", year);

  if (error) {
    console.error(error);
    throw new Error("Expense could not be loaded");
  }

  return data;
}

export async function addExpense(newExpenses) {
  const expensesArray = Array.isArray(newExpenses)
    ? newExpenses
    : [newExpenses];

  const { data, error } = await supabase
    .from("Expenses")
    .insert(expensesArray)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Expense could not be loaded");
  }
  return data;
}

export async function updateExpense({ id, newData }) {
  const { data, error } = await supabase
    .from("Expenses")
    .update(newData)
    .eq("Id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Expense could not be updated");
  }

  return data;
}

export async function deleteExpense(id) {
  const { error } = await supabase.from("Expenses").delete().eq("Id", id);
  if (error) {
    console.error(error);
    throw new Error("Expense could not be deleted");
  }
}
