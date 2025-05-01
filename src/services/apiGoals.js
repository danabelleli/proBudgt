import supabase from "./supabase";

export default async function getAllGoals() {
  let { data, error } = await supabase.from("Goals").select("*");

  if (error) {
    console.error(error);
    throw new Error("Goal could not be loaded");
  }

  return data;
}

export async function getMonthlyGoal({ month, year, category }) {
  const { data, error } = await supabase
    .from("Goals")
    .select("*")
    .eq("Month", month)
    .eq("Year", year)
    .eq("Category", category)
    .maybeSingle(); // <— prevents error when row doesn't exist

  if (error) {
    console.error(error);
    throw new Error("Goal could not be loaded");
  }

  return data; // will return `null` if no goal is found
}

export async function addGoal(newGoal) {
  const { data, error } = await supabase
    .from("Goals")
    .insert([newGoal])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Goal could not be inserted");
  }
  return data;
}
