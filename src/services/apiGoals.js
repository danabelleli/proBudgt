import supabase from "./supabase";

export default async function getAllGoals() {
  let { data, error } = await supabase.from("Goals").select("*");

  if (error) {
    console.error(error);
    throw new Error("Goal could not be loaded");
  }

  return data;
}

export async function getMonthlyGoal({ month, year }) {
  const { data, error } = await supabase
    .from("Goals")
    .select("*")
    .eq("Month", month)
    .eq("Year", year)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Goal could not be loaded");
  }

  return data;
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
