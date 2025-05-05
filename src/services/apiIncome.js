import supabase from "./supabase";

export default async function getAllIncomes() {
  let { data, error } = await supabase.from("Incomes").select("*");

  if (error) {
    console.error(error);
    throw new Error("Income could not be loaded");
  }

  return data;
}

export async function getMonthlyIncomes({ month, year }) {
  const { data, error } = await supabase
    .from("Incomes")
    .select("*")
    .eq("Month", month)
    .eq("Year", year);

  if (error) {
    console.error(error);
    throw new Error("Income could not be loaded");
  }

  return data;
}

export async function getIncome(id) {
  const { data, error } = await supabase
    .from("Incomes")
    .select("*")
    .eq("Id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Income could not be loaded");
  }

  return data;
}

export async function addIncome(newIncomes) {
  const incomesArray = Array.isArray(newIncomes) ? newIncomes : [newIncomes];

  const { data, error } = await supabase
    .from("Incomes")
    .insert(incomesArray)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Income could not be added");
  }
  return data;
}

export async function updateIncome({ id, newData }) {
  const { data, error } = await supabase
    .from("Incomes")
    .update(newData)
    .eq("Id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Income could not be updated");
  }

  return data;
}

export async function deleteIncome(id) {
  const { error } = await supabase.from("Incomes").delete().eq("Id", id);
  if (error) {
    console.error(error);
    throw new Error("Income could not be deleted");
  }
}
