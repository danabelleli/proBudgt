import supabase from "./supabase";

export default async function getAllIncomes() {
  let { data, error } = await supabase.from("Income").select("*");

  if (error) {
    console.error(error);
    throw new Error("income could not be loaded");
  }

  return data;
}

export async function getMonthlyIncomes({ month, year }) {
  const { data, error } = await supabase
    .from("Income")
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
    .from("Income")
    .select("*")
    .eq("Id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Income could not be loaded");
  }

  return data;
}

export async function addIncome(newIncome) {
  const { data, error } = await supabase
    .from("Income")
    .insert([newIncome])
    .select();

  if (error) {
    console.error(error);
    throw new Error("income could not be loaded");
  }
  return data;
}

export async function updateIncome({ id, newData }) {
  const { data, error } = await supabase
    .from("Income")
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
  const { error } = await supabase.from("Income").delete().eq("Id", id);
  if (error) {
    console.error(error);
    throw new Error("income could not be deleted");
  }
}
